/**
 * Generates Google Sheets-ready CSV files from the menu data.
 * Run with: node scripts/generate-menu-sheets.mjs
 * Output files go to: menu-exports/
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "menu-exports");

mkdirSync(outDir, { recursive: true });

// ─────────────────────────────────────────────
// CSV helpers
// ─────────────────────────────────────────────

function esc(v) {
  if (v == null || v === "") return "";
  const s = String(v);
  return s.includes(",") || s.includes('"') || s.includes("\n")
    ? `"${s.replace(/"/g, '""')}"`
    : s;
}

function row(...cells) {
  return cells.map(esc).join(",");
}

const MENU_HEADER = row(
  "category", "category_description",
  "item_name", "item_description", "price",
  "size1", "price1", "size2", "price2",
  "size3", "price3", "size4", "price4"
);

function sectionToCSV(section) {
  const lines = [MENU_HEADER];
  for (const cat of section.categories) {
    for (const item of cat.items) {
      const p = item.prices ?? [];
      lines.push(row(
        cat.name, cat.description ?? "",
        item.name, item.description ?? "", item.price ?? "",
        p[0]?.size ?? "", p[0]?.price ?? "",
        p[1]?.size ?? "", p[1]?.price ?? "",
        p[2]?.size ?? "", p[2]?.price ?? "",
        p[3]?.size ?? "", p[3]?.price ?? ""
      ));
    }
  }
  return lines.join("\n");
}

// ─────────────────────────────────────────────
// FOOD MENU
// ─────────────────────────────────────────────

const foodMenu = {
  title: "Food",
  categories: [
    {
      name: "Lunch Time",
      items: [
        { name: "Make Your Own Lunch Combo", description: "Choose One: Tostada | Burrito | Chile Poblano | Enchilada | Hard Taco | Quesadilla | Chalupa. *Chile Poblano stuffed with cheese only. Protein Options: Ground beef, shredded beef birria, shredded chicken tinga, beans or cheese.", price: "$8" },
        { name: "Burrito Grande", description: "Flour tortilla filled with grilled chicken, beef, rice and beans. Topped with cheese and ranchero sauce.", price: "$10.50" },
        { name: "Special Rice", description: "Rice topped with your choice of protein, grilled bell peppers and our delicious cheese sauce.", prices: [{ size: "Chicken", price: "$8.50" }, { size: "Pastor", price: "$8.50" }, { size: "Steak", price: "$9.50" }, { size: "Shrimp", price: "$10.50" }] },
        { name: "Fajita Quesadilla", description: "Flour tortilla with cheese, choice of protein, grilled onions and bell peppers. Served with rice.", prices: [{ size: "Steak", price: "$9.50" }, { size: "Chicken", price: "$8.50" }, { size: "Shrimp", price: "$10.50" }] },
        { name: "Chimichanga", description: "Fried or soft tortilla, shredded beef or chicken tinga, and cheese sauce. Side of rice or beans and crema salad.", price: "$9.50" },
        { name: "Chilaquiles", description: "Fried tortilla strips cooked with salsa verde or salsa rojo, garnished with red onions, cilantro, crema, Cotija cheese and avocado on a bed of beans.", prices: [{ size: "Fried Eggs*", price: "$14" }, { size: "Grilled Chicken", price: "$16" }, { size: "Steak", price: "$17" }] },
        { name: "Lunch Fajita*", description: "Choice of protein with grilled onions and bell peppers. Served with rice and beans.", prices: [{ size: "Chicken", price: "$11" }, { size: "Steak", price: "$12" }, { size: "Shrimp", price: "$13" }] },
        { name: "Maria's Bowl*", description: "Served with black beans, grilled corn, pico de gallo, pickled onions, crema, Cotija cheese, guacamole and rice.", prices: [{ size: "Grilled Chicken", price: "$10.50" }, { size: "Steak", price: "$11.50" }] },
        { name: "Huevos Al Gusto", description: "Divorciados, Rancheros, A La Mexicana or Con Chorizo. Served with rice, beans and tortillas.", price: "$11.50" },
        { name: "Notice", description: "*Cooked to order. Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your risk of foodborne illness, especially if you have certain medical conditions." },
      ],
    },
    {
      name: "Appetizers",
      items: [
        { name: "Calamari", description: "Delicious fried calamari topped with chipotle cream sauce, pico de gallo and tajin chili powder.", price: "$14" },
        { name: "Maria's Sampler", description: "Chicken taquitos, cheese quesadilla, nachos, lettuce, tomato, sour cream, jalapeños, cheese dip and salsa.", price: "$15" },
        { name: "Tradicional Ceviche", description: "Tilapia fish cooked with lime juice, pico de gallo, topped with avocado sliced and served with crackers.", prices: [{ size: "Fish", price: "$15" }, { size: "Shrimp", price: "$17" }] },
        { name: "Loaded Fries", description: "Fries, choice of meat, pico de gallo, melted cheese and jalapeños.", prices: [{ size: "Chicken", price: "$13" }, { size: "Chorizo", price: "$13" }, { size: "Steak", price: "$14" }] },
        { name: "Toros Rellenos", description: "Flour tortillas on a bed of lettuce stuffed with a mixture of crab, shrimp, creamy cheese and veggies, rolled and fried until crispy served with chipotle cheese for dipping.", price: "$15" },
        { name: "Chicken Wings", description: "Mild, Hot, Habanero and Lemon Pepper.", prices: [{ size: "6 pcs.", price: "$9" }, { size: "12 pcs.", price: "$16" }] },
        { name: "Corn Ribs", description: "Blistered corn ribs slathered in a creamy Mexican mayo blend, topped with crumbled Cotija cheese, Tajin and cilantro.", price: "$8" },
      ],
    },
    {
      name: "Dips",
      items: [
        { name: "Cheese Dip", price: "$6" },
        { name: "Bean Dip", price: "$8" },
        { name: "Guacamole Dip", price: "$7" },
        { name: "Texas Dip", description: "A rich blend of shrimp, steak, chicken and pico de gallo topped with cheese dip.", price: "$15" },
        { name: "Trio Dip", description: "Bean dip, queso dip and guacamole dip.", price: "$15" },
        { name: "Queso Fundido", description: "Bowl of cheese dip with your choice of ground beef or chorizo Mexican sausage.", price: "$10.50" },
        { name: "Salsa Dip", description: "Habanero, verde or tomatillo.", prices: [{ size: "2 oz", price: "$2" }, { size: "4 oz", price: "$4" }, { size: "8 oz", price: "$7" }, { size: "16 oz", price: "$12" }] },
      ],
    },
    {
      name: "Nachos",
      description: "All nachos include cheese.",
      items: [
        { name: "Classic Nachos", description: "Choice of one topping: refried beans, black beans, shredded chicken, ground beef or shredded beef.", price: "$11" },
        { name: "Fajita Nachos", description: "Grilled steak, chicken or shrimp cooked with bell peppers and onions.", prices: [{ size: "Chicken", price: "$14" }, { size: "Steak", price: "$15" }, { size: "Shrimp", price: "$16" }] },
        { name: "Maria's Special Nachos", description: "Choice of one topping: refried beans, black beans, shredded chicken, ground beef or shredded beef. With lettuce, tomato, sour cream and jalapeños.", price: "$14" },
      ],
    },
    {
      name: "Ensaladas",
      items: [
        { name: "Taco Salad", description: "Beef or chicken with beans, cheese, lettuce, sour cream and tomato. Add Grilled Chicken +$3", price: "$11" },
        { name: "Cancun Salad", description: "Shrimp salad with salad mix, zucchini, mushrooms, squash, pico de gallo, cheese, onions, tomatoes and your choice of dressing.", price: "$15" },
        { name: "Maria's Chicken Salad", description: "Salad mix, tomatoes, onions, bell peppers and cheese, topped with strips of chicken.", price: "$13" },
        { name: "Avocado Salad", description: "Salad mix, avocado slices, tomatoes, cheese, cucumbers and red onions and your choice of dressing. Add Grilled Chicken +$3 | Add Skirt Steak +$4 | Add Grilled Shrimp +$6", price: "$11" },
        { name: "Dressing Options", description: "Ranch | Balsamic Vinaigrette | Cilantro Lime Vinaigrette | Cilantro Lime Ranch" },
      ],
    },
    {
      name: "Enchiladas",
      items: [
        { name: "Enchiladas", description: "Ground or shredded beef, shredded chicken, beans, spinach, mushroom or cheese.", prices: [{ size: "(1)", price: "$5" }, { size: "(3)", price: "$14" }] },
        { name: "Trio Enchiladas", description: "Three chicken enchiladas topped with three different sauces: green sauce, mole sauce and ranchero sauce, topped with cheese, sour cream, onions and cilantro. Served with rice.", price: "$16" },
        { name: "Enchiladas Rancheras", description: "Five enchiladas. Ground beef, shredded chicken, shredded beef, beans and cheese, topped with lettuce, sour cream, cheese and pico de gallo.", price: "$18" },
        { name: "Enchiladas Poblanas", description: "Three shredded chicken enchiladas, topped with mole sauce, cheese and onions. Served with rice and salad.", price: "$16" },
        { name: "Enchiladas Verdes", description: "Three shredded chicken enchiladas topped with green sauce, served with rice and salad.", price: "$16" },
        { name: "Enchiladas Santa Fe", description: "Three corn tortillas stuffed with grilled chicken and spinach topped with poblano sauce and sour cream, served with rice.", price: "$18" },
        { name: "Enchiladas Vallarta", description: "Three enchiladas stuffed with shrimp, crabmeat, onion and tomatoes topped with crab creamy sauce. Served with rice.", price: "$19" },
      ],
    },
    {
      name: "Burritos",
      items: [
        { name: "Burrito", description: "Choice of one filling: ground or shredded beef, chicken, beans, spinach, mushroom or cheese.", prices: [{ size: "(1)", price: "$6" }, { size: "(2)", price: "$11" }] },
        { name: "Burritos Deluxe", description: "One chicken and bean burrito, and one beef and bean burrito topped with lettuce, sour cream and tomato.", price: "$13" },
        { name: "Cheese Steak Burritos", description: "Two rolled flour tortillas filled with steak and beans. Topped with cheese dip and pico de gallo.", price: "$15" },
        { name: "Burritos Mexicanos", description: "Two burritos with your choice of one meat, cooked with onions and bell peppers. Topped with cheese dip, lettuce, sour cream and tomato.", prices: [{ size: "Chicken", price: "$15" }, { size: "Steak", price: "$16" }, { size: "Shrimp", price: "$17" }] },
        { name: "Mucho Grande Burrito", description: "Your choice of meat with grilled mushrooms, onions and tomatoes rolled in a big flour tortilla, topped with cheese dip, ranchero sauce, lettuce, pico de gallo and tomatoes.", prices: [{ size: "Chicken", price: "$14" }, { size: "Steak", price: "$15" }, { size: "Shrimp", price: "$16" }] },
        { name: "Maria's Burrito", description: "Choice of protein, stuffed with rice, black beans, pico de gallo and cheese sauce, topped with salsa verde, pickled onions, Cotija cheese and crema.", prices: [{ size: "Chicken", price: "$15" }, { size: "Steak", price: "$16" }, { size: "Carnitas", price: "$15" }, { size: "Pastor", price: "$15" }] },
        { name: "Macho Burrito", description: "Grilled chicken, poblano peppers, onion, cheese, black beans and rice topped with sweet agave nectar chipotle salsa.", prices: [{ size: "Chicken", price: "$15" }, { size: "Steak", price: "$16" }] },
      ],
    },
    {
      name: "Fajitas",
      description: "All fajitas are grilled to perfection with onions and bell peppers served with rice, and your choice of black or refried beans, lettuce, sour cream, shredded cheese and tortillas. Add guacamole for mkts.",
      items: [
        { name: "Chicken Fajitas", price: "$16.00" },
        { name: "Steak Fajitas", price: "$17.00" },
        { name: "Shrimp Fajitas", price: "$18.00" },
        { name: "Trio Fajitas", description: "Chicken, steak and shrimp.", price: "$20.00" },
        { name: "Maria's Fajitas", description: "Chicken, steak, shrimp, pork and Mexican sausage.", price: "$22.00" },
        { name: "Veggie Fajitas", description: "Onions, green and red bell peppers, mushrooms, zucchini, squash, broccoli, cauliflower and spinach.", price: "$14" },
      ],
    },
    {
      name: "Carnes",
      items: [
        { name: "Steak Ranchero", description: "Grilled rib-eye steak cooked with onions and bell peppers. Served with rice, refried or black beans, and salad.", price: "$18.50" },
        { name: "Steak Mexicano", description: "Chopped rib-eye cooked with onions, tomatoes and jalapeño peppers. Served with rice and your choice of refried or black beans.", price: "$18.50" },
        { name: "Steak Jalisco", description: "Rib-eye steak cooked with mushrooms and onions, topped with cheese dip and ranchero sauce. Served with rice and beans.", price: "$18.50" },
        { name: "Carne Asada", description: "Grilled skirt steak topped with green onions. Served with refried or black beans and guacamole salad.", price: "$18.50" },
        { name: "Carnitas", description: "Pork chunks served with rice, refried or black beans, and guacamole salad.", price: "$17" },
        { name: "Chile Verde", description: "Pork carnitas cooked in green sauce. Served with rice and refried or black beans.", price: "$17" },
        { name: "Chile Colorado", description: "Chopped steak cooked in red sauce. Served with rice and refried or black beans.", price: "$18" },
      ],
    },
    {
      name: "Quesadillas",
      items: [
        { name: "Cheese Quesadilla", price: "$5.50" },
        { name: "Fajitas Quesadilla", description: "10 inch flour tortilla stuffed with your choice of meat cooked with bell peppers and onions. Served with rice and salad.", prices: [{ size: "Chicken", price: "$15" }, { size: "Steak", price: "$16" }, { size: "Shrimp", price: "$17" }] },
        { name: "Quesadilla Rellena", description: "Choice of one topping: ground beef, shredded chicken, shredded beef or pork. Served with your choice of rice, refried or black beans.", price: "$11.50" },
      ],
    },
    {
      name: "Tacos",
      items: [
        { name: "Classic Tacos", description: "Choice of hard or soft tortilla, ground beef or shredded chicken, lettuce and cheese.", prices: [{ size: "(1)", price: "$3.25" }, { size: "(3)", price: "$8.75" }] },
        { name: "Street Tacos", description: "Choice of grilled chicken, steak, pastor, chorizo or carnitas. Served with onions, cilantro and lime.", prices: [{ size: "(1)", price: "$5" }, { size: "(3)", price: "$14" }] },
        { name: "Fish Tacos", description: "Flour tortilla, choice of fried or grilled tilapia, topped with red cabbage, pico de gallo and chipotle cream sauce.", prices: [{ size: "(1)", price: "$5.50" }, { size: "(3)", price: "$15.50" }] },
        { name: "Shrimp Tacos", description: "Flour tortilla, grilled shrimp, topped with red cabbage, pico de gallo and chipotle cream sauce.", prices: [{ size: "(1)", price: "$5.75" }, { size: "(3)", price: "$16.25" }] },
      ],
    },
    {
      name: "Pollo",
      description: "Groups of 8 or more: one check please.",
      items: [
        { name: "Chicken Tortilla Soup", description: "Tender chicken breast, rice, pico de gallo, avocado and tortilla strips in a rich chicken broth.", price: "$8.50" },
        { name: "Arroz Con Pollo", description: "Grilled chicken strips topped with cheese dip and ranchero sauce. Served with rice and salad.", price: "$16" },
        { name: "Pollo Asado", description: "Grilled chicken breast topped with cheese dip and ranchero sauce. Served with rice, salad and pico de gallo.", price: "$16" },
        { name: "Maria's Chicken Special", description: "Grilled chicken breast with steam broccoli, squash, zucchini and cheese dip. Served with rice and your choice of refried or black beans.", price: "$17" },
        { name: "Pollo Ranchero", description: "Grilled chicken breast topped with grilled mushrooms, onions and cheese dip. Served with rice and choice of refried or black beans.", price: "$17" },
        { name: "Pollo a la Crema", description: "Grilled chicken strips cooked with bell pepper and topped with our special creamy sauce. Served with rice, salad and pico de gallo.", price: "$16" },
        { name: "Pollo Fundido", description: "Two flour fried tortilla with shredded chicken topped with cheese ranchero sauce. Served with rice, refried or black beans and salad.", price: "$15" },
      ],
    },
    {
      name: "Mariscos",
      items: [
        { name: "Mojarra Frita", description: "A whole tilapia fish fried to perfection. Served with rice salad.", price: "$18" },
        { name: "Add for Mojarra Frita", description: "Diabla shrimp or mojo de ajo shrimp.", price: "$8.00" },
        { name: "Camarones Al Mojo", description: "Grilled shrimp cooked with our garlic creamy sauce served with rice and salad.", price: "$17.50" },
        { name: "Camarones Mexicanos", description: "Shrimp cooked with jalapeños peppers, onions, tomatoes, rice and beans, refried or black beans.", price: "$18" },
        { name: "Playa del Carmen", description: "Grilled tilapia and shrimp, topped with our creamy crab seafood sauce, served with rice and salad.", price: "$19" },
        { name: "Camarones a la Diabla", description: "Grilled shrimp cooked with our Diabla sauce served with rice and salad.", price: "$17.50" },
        { name: "Maria's Shrimp Special", description: "Grilled shrimp in butter pico de gallo and creamy ranchero sauce. Served with rice and salad.", price: "$18" },
        { name: "Coctel de Camaron", description: "Boiled shrimp mix with pico de gallo, avocado and special tomato sauce.", price: "$17.50" },
        { name: "Seafood Chimichanga", description: "Large rolled flour tortilla, fried or soft, filled with shrimp and crabmeat, covered with crab creamy sauce, served with rice and salad.", price: "$18" },
        { name: "Spicy Plate", description: "Items marked spicy on the menu: Steak Mexicano, Chile Colorado, Camarones a la Diabla." },
        { name: "Notice", description: "Cooked to order. Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your risk of foodborne illness." },
      ],
    },
    {
      name: "Especiales",
      items: [
        { name: "Maria's Bowl", description: "A bowl filled with rice, lettuce, roasted corn, black beans, guacamole, and your choice of meat, topped with pico de gallo, sour cream and shredded cheese.", prices: [{ size: "Veggie", price: "$13" }, { size: "Chicken", price: "$14" }, { size: "Steak", price: "$15" }, { size: "Shrimp", price: "$16" }] },
        { name: "Fried Chimichanga", description: "Two flour tortilla fried or soft filled with shredded beef or chicken topped with cheese dip, ranchero sauce and your choice of refried or black beans and salad.", price: "$15" },
        { name: "Flautas", description: "Shredded chicken tinga 2, and shredded beef 2, topped with salsa verde, crema, pickled onions, queso Cotija, rice and beans.", price: "$15" },
        { name: "Special Rice", description: "A bed of rice cooked with bell pepper, topped with cheese dip and choice of meat.", prices: [{ size: "Chicken", price: "$16" }, { size: "Steak", price: "$17" }, { size: "Shrimp", price: "$18" }] },
        { name: "Carne & Camaron", description: "Grilled rib-eye steak with shrimp, onions and mushrooms. Served with rice, and your choice of refried beans or black beans.", price: "$21" },
        { name: "Quesabiria", description: "Two grilled corn tortillas stuffed with cheese and our famous tender beef brisket cooked in Mexican spices, served with a side of its own beef broth, lime, cilantro, onions, and salsa.", price: "$16" },
        { name: "Pizzabirria", description: "Two flour tortillas stuffed with cheese and our famous Adobo marinated shredded beef cooked in birria sauce, cilantro and onions. Served with beef consomé for dipping and tomatillo sauce.", price: "$18" },
        { name: "Ramen Soup Birria", description: "Birria consomé, ramen noodle, chunks of tender birria, topped with onions, cilantro and cheese quesadilla for dipping.", price: "$15" },
        { name: "Pollo Con Camarón", description: "Grilled chicken breast and shrimp cooked with pico de gallo. Served with rice and mixed vegetables.", price: "$17" },
        { name: "Pollo Con Chorizo", description: "Grilled chicken strips with Mexican sausage. Topped with cheese dip and served with chicken enchilada and rice.", price: "$16" },
        { name: "Molcajete Cielo, Mar y Tierra", description: "For two people. Chargrilled carne asada, Mexican sausage, chicken, and cactus, topped with an order of camarones al mojo, mozzarella cheese, green tomatillo sauce, cambray onions, avocado slices, chiles toreados fried green jalapeños peppers, tortillas and slices of queso fresco. Served with rice, refried or black beans and salad.", price: "$40" },
      ],
    },
    {
      name: "Create Your Own Combo",
      items: [
        { name: "Combo Dinner", description: "Served with two items, rice and your choice of black or refried beans. *Chile Poblano stuffed with cheese only. Choose From: Burrito | Enchilada | Taco | Chalupa | Tostada | Quesadilla | Tostaguac | Chile Poblano (Cheese Only). Fillings: Ground or Shredded Beef | Birria | Shredded Chicken Tinga | Beans and Cheese.", price: "$13.75" },
        { name: "Veggie Dinner", description: "*Chile Poblano stuffed with cheese only. Choose From: Burrito | Enchilada | Taco | Chalupa | Quesadilla | Chile Poblano (Cheese Only). Fillings: Beans | Cheese | Mushrooms | Spinach.", price: "$12.75" },
      ],
    },
    {
      name: "Desserts",
      items: [
        { name: "Sopapilla with Ice Cream", description: "Fried flour tortilla, honey, butter and cinnamon.", price: "$6.50" },
        { name: "Flan", description: "Homemade Mexican custard.", price: "$7.50" },
        { name: "Churros with Ice Cream", description: "Fried twisted dough with sugar, cinnamon, honey, chocolate sauce and whipped cream.", price: "$8.50" },
        { name: "Fried Ice Cream", description: "Scoop of vanilla ice cream deep-fried. Topped with honey, chocolate sauce and whipped cream.", price: "$7.50" },
      ],
    },
    {
      name: "Sodas",
      items: [
        { name: "Sodas", description: "Coke | Diet Coke | Coke Zero | Sprite | Mr Pibb | Orange Fanta | Ginger Ale | Lemonade | Iced Tea | Milk | OJ", price: "$3" },
        { name: "Specialty Drinks", description: "Horchata | Jamaica | Jarritos", price: "$4" },
      ],
    },
    {
      name: "Kids",
      description: "Includes children 10 and under with the option to pick one main item and one side. $8",
      items: [
        { name: "Kids Main Items", description: "Cheeseburger | Chicken Nuggets | Cheese Nachos | Mac & Cheese | Pizza | Taco | Cheese Quesadilla | Burrito | Enchilada" },
        { name: "Kids Sides", description: "Rice | Beans | Fries | Broccoli | Side of Fruit" },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// DRINKS MENU
// ─────────────────────────────────────────────

const drinksMenu = {
  title: "Drinks",
  categories: [
    {
      name: "Margaritas",
      description: "Made from scratch. Make it with mezcal for an extra $2.00.",
      items: [
        { name: "House Fresca", description: "Tequila Blanco, made from scratch margarita mix, shaken and served in a salt-rimmed glass.", prices: [{ size: "Small", price: "$7" }, { size: "Grande", price: "$12" }] },
        { name: "Texas Margarita", description: "Jose Cuervo Especial Gold Tequila, Gran Gala, sweet & sour, and a splash of orange juice.", prices: [{ size: "Small", price: "$8" }, { size: "Grande", price: "$14" }] },
        { name: "Guava Margarita", description: "Reposado Tequila, guava nectar, made from scratch margarita mix, served in a salt-rimmed glass.", price: "$10" },
        { name: "Jalapeño Infused", description: "Jalapeño-infused tequila, fresh lime juice, orange juice, and agave nectar. Served in a tajin salt-rimmed glass.", price: "$10" },
        { name: "Berry Basil", description: "Tequila Blanco, fresh margarita mix, muddled berries, basil, and agave nectar.", price: "$10" },
        { name: "Mercadito", description: "Jalapeño-infused tequila, fresh margarita mix, muddled mint, cucumber, served in a tajin-rimmed glass.", price: "$10" },
        { name: "Pineapple Habanero", description: "Habanero-infused tequila, pineapple juice, and fresh margarita mix. Served in a tajin salt-rimmed glass.", price: "$12" },
        { name: "La Skinny", description: "Tequila Blanco, fresh lime, and agave nectar, shaken.", price: "$10" },
        { name: "Tamarindo", description: "Tequila Blanco, fresh margarita mix, tamarind purée, served in a tajin salt-rimmed glass.", price: "$10" },
        { name: "Jalapeño Cucumber Margarita", description: "1800 Cucumber & Jalapeño Tequila with agave mix.", price: "$10" },
      ],
    },
    {
      name: "Frozen Margaritas",
      items: [
        { name: "Frozen Margaritas", description: "Flavor options: Mango | Strawberry | Guava | Lime | Piña Colada | Peach | Watermelon | Tamarind.", prices: [{ size: "Small", price: "$8" }, { size: "Grande", price: "$13" }] },
      ],
    },
    {
      name: "Margarita Flights",
      items: [
        { name: "Margarita Flights", description: "Flavor options: Mango | Strawberry | Guava | Lime | Piña Colada | Peach | Watermelon.", prices: [{ size: "4 Flavor", price: "$18" }] },
        { name: "Margarona", description: "Coronita beer and frozen margarita, served in a salt-rimmed glass.", price: "$15" },
        { name: "Cantarito", description: "Tequila Reposado, lime juice, pineapple juice, grapefruit juice, agave, and grapefruit soda.", price: "$14" },
      ],
    },
    {
      name: "Mimosas",
      items: [
        { name: "Classic Mimosa", description: "Champagne and fresh squeezed orange juice.", prices: [{ size: "Glass", price: "$6" }, { size: "Carafe", price: "$14" }] },
        { name: "Guava Mimosa", description: "Champagne, guava purée, and fresh squeezed orange juice.", prices: [{ size: "Glass", price: "$7" }, { size: "Carafe", price: "$16" }] },
        { name: "Peach Mimosa", description: "Champagne and peach purée.", prices: [{ size: "Glass", price: "$7" }, { size: "Carafe", price: "$16" }] },
      ],
    },
    {
      name: "Draft Beer",
      items: [
        { name: "Import Beer", description: "Modelo Especial, Pacifico, Dos Equis Amber, and Michelob.", prices: [{ size: "Pint", price: "$6" }, { size: "Tall", price: "$9" }] },
        { name: "Domestic Beer", description: "Ultra, Miller Lite, and Coors Light.", prices: [{ size: "Pint", price: "$5" }, { size: "Tall", price: "$8" }] },
      ],
    },
    {
      name: "Imported Beer",
      description: "$5.00",
      items: [
        { name: "Corona" }, { name: "Corona Light" }, { name: "Coronita" },
        { name: "Dos Equis Amber" }, { name: "Dos Equis Lager" }, { name: "Modelo Especial" },
        { name: "Negra Modelo" }, { name: "Pacifico" }, { name: "Tecate (Can)" },
        { name: "Victoria" }, { name: "Corona Non-Alcoholic" },
      ],
    },
    {
      name: "Domestic Beer",
      description: "Ask your server for seasonal beers and seltzers. $4.75",
      items: [
        { name: "Budweiser" }, { name: "Bud Light" }, { name: "Michelob Ultra" },
        { name: "Miller Light" }, { name: "Coors Light" },
        { name: "Michelada", description: "Modelo Especial with house-made michelada mix (tomato clamato juice, lime, hot sauce, spices, and more). Served in a tajin-rimmed beer mug.", prices: [{ size: "Small", price: "$11" }, { size: "Tall", price: "$16" }] },
      ],
    },
    {
      name: "Specialty Cocktails",
      items: [
        { name: "Paloma", description: "Tequila Reposado, fresh grapefruit juice, fresh lime juice, agave nectar, and a pinch of salt, topped with soda. Served in a salt-rimmed glass.", price: "$12" },
        { name: "Mexican Old Fashioned", description: "Añejo Tequila, Angostura bitters, agave nectar, and orange zest.", price: "$14" },
        { name: "Mexican Mule", description: "Choice of Tequila or Mezcal, agave nectar, lime, and ginger beer, with orange zest garnish.", price: "$11" },
        { name: "Tito's Passion", description: "Tito's Handmade Vodka, passion fruit purée, and coconut water.", price: "$10" },
        { name: "Bloody Maria", description: "Reposado Tequila, lime juice, and michelada mix.", price: "$12" },
        { name: "Mex-spresso Martini", description: "Mezcal, Averna, Ancho Reyes, Kahlúa, and espresso.", price: "$12" },
        { name: "Hot & Dirty", description: "Tequila Reposado, lime juice, Cointreau, and olive brine.", price: "$14" },
        { name: "Oaxacan & Tonic", description: "Mezcal, tonic water, and lime.", price: "$10" },
      ],
    },
    {
      name: "House Wines",
      description: "$7",
      items: [
        { name: "Pinot Grigio" }, { name: "Chardonnay" }, { name: "Sauvignon Blanc" },
        { name: "Prosecco" }, { name: "Cabernet Sauvignon" }, { name: "Pinot Noir" }, { name: "Merlot" },
      ],
    },
    {
      name: "Sangria",
      items: [
        { name: "White Sangria", description: "White wine and sangria syrup with mixed fruit and a splash of soda.", price: "$8" },
        { name: "Red Sangria", description: "Red wine and sangria syrup with mixed fruits and a splash of soda.", price: "$8" },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// TEQUILA MENU
// ─────────────────────────────────────────────

const tequilaMenu = {
  title: "Tequilas & Mezcales",
  categories: [
    {
      name: "Mezcales",
      items: [{ name: "Del Maguey Vida" }, { name: "Ilegal Joven" }, { name: "400 Conejos" }],
    },
    {
      name: "Blanco Silver",
      description: "The heart and passion of Mexico, only 5 states are authorized to produce it. Tequila can only be produced from the Blue Webber agave and 100% agave.",
      items: [
        { name: "7 Leguas" }, { name: "Casa Amigos" }, { name: "Clase Azul" }, { name: "Don Julio" },
        { name: "El Jimador" }, { name: "Espolon" }, { name: "Fortaleza" }, { name: "G4" },
        { name: "Herradura" }, { name: "Luna Azul" }, { name: "Milagro" }, { name: "Corralejo" },
        { name: "Patrón" }, { name: "Sauza" }, { name: "Hornitos" }, { name: "Lalo" }, { name: "Tequila 8" },
      ],
    },
    {
      name: "Tequila Reposado",
      items: [
        { name: "7 Leguas" }, { name: "Casa Amigos" }, { name: "Clase Azul" }, { name: "Don Julio" },
        { name: "El Jimador" }, { name: "Espolon" }, { name: "Fortaleza" }, { name: "G4" },
        { name: "Herradura" }, { name: "Tesoro" }, { name: "Luna Azul" }, { name: "Milagro" },
        { name: "Corralejo" }, { name: "Patrón" }, { name: "Sauza Hornitos" }, { name: "Tequila 8" },
      ],
    },
    {
      name: "Tequila Añejo",
      items: [
        { name: "7 Leguas" }, { name: "Casa Amigos" }, { name: "Clase Azul" }, { name: "Don Julio" },
        { name: "El Jimador" }, { name: "Espolon" }, { name: "Fortaleza" }, { name: "G4" },
        { name: "Herradura" }, { name: "Tesoro" }, { name: "Luna Azul" }, { name: "Milagro" },
        { name: "Corralejo" }, { name: "Patrón" }, { name: "Sauza Hornitos" }, { name: "Tequila 8" },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// HAPPY HOUR
// ─────────────────────────────────────────────

const happyHourCSV = [
  "title,discount,icon",
  "House Margaritas,$1 OFF,Martini",
  "Wine,$1 OFF,Wine",
  "Draft Beer,$1 OFF,Beer",
  "Well Liquor,$1 OFF,Martini",
].join("\n");

// ─────────────────────────────────────────────
// WRITE FILES
// ─────────────────────────────────────────────

const files = [
  { name: "Food.csv",      content: sectionToCSV(foodMenu) },
  { name: "Drinks.csv",    content: sectionToCSV(drinksMenu) },
  { name: "Tequila.csv",   content: sectionToCSV(tequilaMenu) },
  { name: "HappyHour.csv", content: happyHourCSV },
];

for (const file of files) {
  const path = join(outDir, file.name);
  writeFileSync(path, "﻿" + file.content, "utf-8"); // BOM for Excel UTF-8 compatibility
  console.log(`✓ ${file.name}  (${file.content.split("\n").length - 1} rows)`);
}

console.log(`\nFiles saved to: menu-exports/`);
console.log(`\nHow to import into Google Sheets:`);
console.log(`  1. Create a new Google Spreadsheet`);
console.log(`  2. For each file: rename a tab to match the filename (without .csv)`);
console.log(`     Tabs needed: Food | Drinks | Tequila | HappyHour`);
console.log(`  3. File → Import → Upload the CSV → "Insert into current sheet"`);
console.log(`  4. Repeat for each of the 4 files`);
