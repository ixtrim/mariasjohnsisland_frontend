import { NextRequest, NextResponse } from "next/server";
import { foodMenu, drinksMenu, tequilaMenu } from "@/lib/menu-data";
import type { MenuSection } from "@/lib/menu-data";

function esc(value: string | undefined): string {
  if (!value) return "";
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function sectionToCSV(section: MenuSection): string {
  const header = [
    "category",
    "category_description",
    "item_name",
    "item_description",
    "price",
    "size1",
    "price1",
    "size2",
    "price2",
    "size3",
    "price3",
    "size4",
    "price4",
  ].join(",");

  const rows = [header];

  for (const category of section.categories) {
    for (const item of category.items) {
      const p = item.prices ?? [];
      rows.push(
        [
          esc(category.name),
          esc(category.description),
          esc(item.name),
          esc(item.description),
          esc(item.price),
          esc(p[0]?.size),
          esc(p[0]?.price),
          esc(p[1]?.size),
          esc(p[1]?.price),
          esc(p[2]?.size),
          esc(p[2]?.price),
          esc(p[3]?.size),
          esc(p[3]?.price),
        ].join(",")
      );
    }
  }

  return rows.join("\n");
}

const happyHourCSV = [
  "title,discount,icon",
  "House Margaritas,$1 OFF,Martini",
  "Wine,$1 OFF,Wine",
  "Draft Beer,$1 OFF,Beer",
  "Well Liquor,$1 OFF,Martini",
].join("\n");

export async function GET(request: NextRequest) {
  const sheet = request.nextUrl.searchParams.get("sheet") ?? "food";

  const sheets: Record<string, { csv: string; filename: string }> = {
    food: { csv: sectionToCSV(foodMenu), filename: "Food.csv" },
    drinks: { csv: sectionToCSV(drinksMenu), filename: "Drinks.csv" },
    tequila: { csv: sectionToCSV(tequilaMenu), filename: "Tequila.csv" },
    happyhour: { csv: happyHourCSV, filename: "HappyHour.csv" },
  };

  const target = sheets[sheet] ?? sheets.food;

  return new NextResponse(target.csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${target.filename}"`,
    },
  });
}
