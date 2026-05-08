import MenuPageClient from "@/components/menu-page-client";
import { getFoodMenu, getDrinksMenu, getTequilaMenu } from "@/lib/google-sheets";
import { getMenuPageCms } from "@/lib/cms";

export default async function MenuPage() {
  const [foodMenu, drinksMenu, tequilaMenu, cms] = await Promise.all([
    getFoodMenu(),
    getDrinksMenu(),
    getTequilaMenu(),
    getMenuPageCms(),
  ]);

  return (
    <MenuPageClient
      foodMenu={foodMenu}
      drinksMenu={drinksMenu}
      tequilaMenu={tequilaMenu}
      cms={cms}
    />
  );
}
