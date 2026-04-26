import HappyHourPageClient from "@/components/happy-hour-page-client";
import { getDrinksMenu, getHappyHourSpecials } from "@/lib/google-sheets";

export default async function HappyHourPage() {
  const [drinksMenu, happyHourSpecials] = await Promise.all([
    getDrinksMenu(),
    getHappyHourSpecials(),
  ]);

  return (
    <HappyHourPageClient
      drinksMenu={drinksMenu}
      happyHourSpecials={happyHourSpecials}
    />
  );
}
