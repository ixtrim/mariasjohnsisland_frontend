import {
  foodMenu as fallbackFood,
  drinksMenu as fallbackDrinks,
  tequilaMenu as fallbackTequila,
  type MenuSection,
  type MenuItem,
} from "./menu-data";

// Direct CSV URLs from the published Google Spreadsheet
const SHEET_URLS = {
  food:      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSiX66Vcg2kM4Ypx7O1kMrlWzV8tlMJtkjjXzkrh_ri-15NCYIrEFQtf2K0MiTschXQKyTyrO8p5FdR/pub?gid=657983036&single=true&output=csv",
  drinks:    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSiX66Vcg2kM4Ypx7O1kMrlWzV8tlMJtkjjXzkrh_ri-15NCYIrEFQtf2K0MiTschXQKyTyrO8p5FdR/pub?gid=1455478058&single=true&output=csv",
  tequila:   "https://docs.google.com/spreadsheets/d/e/2PACX-1vSiX66Vcg2kM4Ypx7O1kMrlWzV8tlMJtkjjXzkrh_ri-15NCYIrEFQtf2K0MiTschXQKyTyrO8p5FdR/pub?gid=545256609&single=true&output=csv",
  happyhour: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSiX66Vcg2kM4Ypx7O1kMrlWzV8tlMJtkjjXzkrh_ri-15NCYIrEFQtf2K0MiTschXQKyTyrO8p5FdR/pub?gid=953676363&single=true&output=csv",
} as const;

// ─── CSV parser ───────────────────────────────────────────────────────────────

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if (char === "\n" && !inQuotes) {
      row.push(field);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      field = "";
    } else if (char === "\r" && !inQuotes) {
      // skip carriage returns
    } else {
      field += char;
    }
  }

  // flush last row
  if (field || row.length > 0) {
    row.push(field);
    if (row.some(Boolean)) rows.push(row);
  }

  return rows;
}

async function fetchCSV(key: keyof typeof SHEET_URLS): Promise<string[][]> {
  const res = await fetch(SHEET_URLS[key], {
    next: { revalidate: 3600 }, // re-fetch from Google Sheets at most once per hour
  });
  if (!res.ok) throw new Error(`Google Sheets fetch failed (${res.status}) for: ${key}`);
  return parseCSV(await res.text());
}

// ─── Row → MenuSection ────────────────────────────────────────────────────────

function rowsToMenuSection(rows: string[][], title: string): MenuSection {
  const dataRows = rows.slice(1); // skip header row
  const categoryMap = new Map<string, { description?: string; items: MenuItem[] }>();
  const categoryOrder: string[] = [];

  for (const row of dataRows) {
    const [cat, catDesc, name, desc, price, s1, p1, s2, p2, s3, p3, s4, p4] = row;
    if (!cat || !name) continue;

    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, { description: catDesc || undefined, items: [] });
      categoryOrder.push(cat);
    }

    const item: MenuItem = { name };
    if (desc)  item.description = desc;

    const multiPrices: { size: string; price: string }[] = [];
    if (s1 && p1) multiPrices.push({ size: s1, price: p1 });
    if (s2 && p2) multiPrices.push({ size: s2, price: p2 });
    if (s3 && p3) multiPrices.push({ size: s3, price: p3 });
    if (s4 && p4) multiPrices.push({ size: s4, price: p4 });

    if (multiPrices.length > 0) item.prices = multiPrices;
    else if (price)              item.price = price;

    categoryMap.get(cat)!.items.push(item);
  }

  return {
    title,
    categories: categoryOrder.map((name) => ({ name, ...categoryMap.get(name)! })),
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getFoodMenu(): Promise<MenuSection> {
  try {
    return rowsToMenuSection(await fetchCSV("food"), "Food");
  } catch (err) {
    console.error("[menu] Failed to fetch Food sheet, using static fallback:", err);
    return fallbackFood;
  }
}

export async function getDrinksMenu(): Promise<MenuSection> {
  try {
    return rowsToMenuSection(await fetchCSV("drinks"), "Drinks");
  } catch (err) {
    console.error("[menu] Failed to fetch Drinks sheet, using static fallback:", err);
    return fallbackDrinks;
  }
}

export async function getTequilaMenu(): Promise<MenuSection> {
  try {
    return rowsToMenuSection(await fetchCSV("tequila"), "Tequilas & Mezcales");
  } catch (err) {
    console.error("[menu] Failed to fetch Tequila sheet, using static fallback:", err);
    return fallbackTequila;
  }
}

export interface HappyHourSpecial {
  title: string;
  discount: string;
  icon: string;
}

const defaultHappyHourSpecials: HappyHourSpecial[] = [
  { title: "House Margaritas", discount: "$1 OFF", icon: "Martini" },
  { title: "Wine",             discount: "$1 OFF", icon: "Wine"    },
  { title: "Draft Beer",       discount: "$1 OFF", icon: "Beer"    },
  { title: "Well Liquor",      discount: "$1 OFF", icon: "Martini" },
];

export async function getHappyHourSpecials(): Promise<HappyHourSpecial[]> {
  try {
    const rows = await fetchCSV("happyhour");
    const specials = rows
      .slice(1)
      .filter((row) => row[0] && row[1])
      .map((row) => ({ title: row[0], discount: row[1], icon: row[2] || "Martini" }));
    return specials.length > 0 ? specials : defaultHappyHourSpecials;
  } catch (err) {
    console.error("[menu] Failed to fetch HappyHour sheet, using static fallback:", err);
    return defaultHappyHourSpecials;
  }
}
