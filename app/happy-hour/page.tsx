import HappyHourPageClient from "@/components/happy-hour-page-client";
import { getDrinksMenu, getHappyHourSpecials } from "@/lib/google-sheets";
import { getHappyHourCms } from "@/lib/cms";

export default async function HappyHourPage() {
  const [drinksMenu, happyHourSpecials, cms] = await Promise.all([
    getDrinksMenu(),
    getHappyHourSpecials(),
    getHappyHourCms(),
  ]);

  return (
    <HappyHourPageClient
      drinksMenu={drinksMenu}
      happyHourSpecials={happyHourSpecials}
      cms={cms}
    />
  );
}
