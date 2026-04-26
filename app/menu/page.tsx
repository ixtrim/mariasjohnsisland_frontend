import MenuPageClient from "@/components/menu-page-client";
import { getFoodMenu, getDrinksMenu, getTequilaMenu } from "@/lib/google-sheets";

export default async function MenuPage() {
  const [foodMenu, drinksMenu, tequilaMenu] = await Promise.all([
    getFoodMenu(),
    getDrinksMenu(),
    getTequilaMenu(),
  ]);

  return (
    <MenuPageClient
      foodMenu={foodMenu}
      drinksMenu={drinksMenu}
      tequilaMenu={tequilaMenu}
    />
  );
}
