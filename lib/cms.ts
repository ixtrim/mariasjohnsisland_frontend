/**
 * Headless WordPress CMS integration.
 * Fetches page content and global options from the /wp-json/mjis/v1/ REST API
 * exposed by the mjis-headless MU plugin.
 *
 * All functions return an empty object on failure — components fall back to
 * their hardcoded default values so the site always renders correctly.
 */

const CMS_BASE = "https://marianewsite.mystagingwebsite.com/wp-json/mjis/v1";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CmsImage {
  url: string;
  alt: string;
  sizes: { medium: string; large: string; full: string };
}

export interface HeroFields {
  hero_title?: string;
  hero_subtitle?: string;
  hero_slogan?: string;
  hero_background_image?: CmsImage;
}

export interface HomePageFields extends HeroFields {
  welcome_title?: string;
  welcome_text_1?: string;
  welcome_text_2?: string;
}

export interface MenuPageFields extends HeroFields {
  intro_quote?: string;
  food_gallery?: CmsImage[];
}

export interface HappyHourFields extends HeroFields {
  happy_hour_days?: string;
  happy_hour_start?: string;
  happy_hour_end?: string;
  happy_hour_tagline?: string;
  drink_gallery?: CmsImage[];
}

export interface BusinessHour {
  day: string;
  hours: string;
}

export interface LocationFields extends HeroFields {
  address_line1?: string;
  address_line2?: string;
  phone?: string;
  business_hours?: BusinessHour[];
  google_maps_url?: string;
}

export interface GlobalOptionsFields {
  footer_tagline?: string;
  footer_address_1?: string;
  footer_address_2?: string;
  footer_phone?: string;
  footer_hours?: BusinessHour[];
  order_online_url?: string;
  gift_cards_url?: string;
  rewards_url?: string;
  facebook_url?: string;
  instagram_url?: string;
}

// ─── Internal fetch ───────────────────────────────────────────────────────────

async function fetchPage<T>(slug: string): Promise<T> {
  const res = await fetch(`${CMS_BASE}/page/${slug}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`CMS /page/${slug} → HTTP ${res.status}`);
  const json = await res.json();
  return (json.fields ?? {}) as T;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns the URL string from a CmsImage field, or the fallback path. */
export function heroImageUrl(img: CmsImage | undefined, fallback: string): string {
  return img?.url || fallback;
}

/** Converts a CMS gallery to { src, alt }[] for ImageGallery, with a fallback. */
export function toGalleryImages(
  images: CmsImage[] | undefined,
  fallback: { src: string; alt: string }[]
): { src: string; alt: string }[] {
  if (!images?.length) return fallback;
  return images.map((img) => ({ src: img.url, alt: img.alt || "" }));
}

// ─── Page fetchers ────────────────────────────────────────────────────────────

export async function getHomePageCms(): Promise<HomePageFields> {
  try {
    return await fetchPage<HomePageFields>("homepage");
  } catch {
    return {};
  }
}

export async function getMenuPageCms(): Promise<MenuPageFields> {
  try {
    return await fetchPage<MenuPageFields>("menu");
  } catch {
    return {};
  }
}

export async function getHappyHourCms(): Promise<HappyHourFields> {
  try {
    return await fetchPage<HappyHourFields>("happy-hour");
  } catch {
    return {};
  }
}

export async function getLocationCms(): Promise<LocationFields> {
  try {
    return await fetchPage<LocationFields>("location");
  } catch {
    return {};
  }
}

export async function getGlobalOptions(): Promise<GlobalOptionsFields> {
  try {
    const res = await fetch(`${CMS_BASE}/options`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`CMS /options → HTTP ${res.status}`);
    const json = await res.json();
    return (json.fields ?? {}) as GlobalOptionsFields;
  } catch {
    return {};
  }
}
