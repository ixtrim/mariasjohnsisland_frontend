export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  prices?: { size: string; price: string }[];
}

export interface MenuCategory {
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuSection {
  title: string;
  categories: MenuCategory[];
}

// Drinks Menu from the PDF
export const drinksMenu: MenuSection = {
  title: "Drinks",
  categories: [
    {
      name: "Signature Margaritas",
      items: [
        {
          name: "Texas Margarita",
          description: "Jose Cuervo Especial Gold Tequila, Gran Gala, sweet & sour and a splash of orange juice.",
          prices: [
            { size: "Small", price: "$8" },
            { size: "Grande", price: "$14" },
          ],
        },
        {
          name: "Guava Margarita",
          description: "Reposado Tequila, guava nectar, made from scratch margarita mix, salt rimmed glass.",
          price: "$10",
        },
        {
          name: "Jalapeño Infused Margarita",
          description: "Jalapeño infused tequila, fresh lime juice, orange juice and agave nectar. Served in a tajin salt rimmed glass.",
          price: "$10",
        },
        {
          name: "Jalapeño Cucumber Margarita",
          description: "1800 Cucumber & Jalapeño Tequila with agave mix.",
          price: "$10",
        },
        {
          name: "Tamarind Margarita",
          description: "Classic margarita with rich tamarind flavor.",
          price: "$10",
        },
      ],
    },
    {
      name: "Specialty Cocktails",
      items: [
        {
          name: "Paloma",
          description: "Tequila Reposado, fresh grapefruit juice, fresh lime juice, agave nectar and a pinch of salt, topped with soda. Served in a salt rimmed glass.",
          price: "$12",
        },
        {
          name: "Bloody Maria",
          description: "Tequila Reposado, lime juice and michelada mix.",
          price: "$12",
        },
        {
          name: "Mex-spresso Martini",
          description: "Mezcal, Averna, Ancho Reyes, Kahlúa and Espresso.",
          price: "$12",
        },
        {
          name: "Mexican Old Fashioned",
          description: "Añejo Tequila, Angostura bitters, agave nectar, orange zest.",
          price: "$14",
        },
        {
          name: "Hot & Dirty",
          description: "Tequila Reposado, lime juice, cointreau, olive brine.",
          price: "$14",
        },
        {
          name: "Mexican Mule",
          description: "Choice of Tequila or Mezcal, agave nectar, lime and ginger beer, with orange zest garnish.",
          price: "$12",
        },
        {
          name: "Oaxacan & Tonic",
          description: "Mezcal, tonic water and lime.",
          price: "$10",
        },
        {
          name: "Tito's Passion",
          description: "Tito's Handmade Vodka, passion fruit purée, coconut water.",
          price: "$10",
        },
      ],
    },
    {
      name: "Beer",
      items: [
        {
          name: "Michelada",
          description: "Modelo Especial, house made michelada mix (tomato clamato juice, lime, hot sauce, spices, and more). Served in a Tajin rimmed beer glass.",
          prices: [
            { size: "Small", price: "$9" },
            { size: "Large", price: "$16" },
          ],
        },
      ],
    },
    {
      name: "Imported Beer",
      description: "$5.00 each",
      items: [
        { name: "Corona" },
        { name: "Corona Light" },
        { name: "Coronita" },
        { name: "Dos Equis Amber" },
        { name: "Dos Equis Lager" },
        { name: "Modelo Especial" },
        { name: "Negra Modelo" },
        { name: "Pacifico" },
        { name: "Tecate (Can)" },
        { name: "Victoria" },
        { name: "Corona Non-Alcoholic" },
      ],
    },
    {
      name: "Domestic Beer",
      description: "$4.75 each. Ask your server for seasonal beers & seltzers.",
      items: [
        { name: "Budweiser" },
        { name: "Bud Light" },
        { name: "Michelob Ultra" },
        { name: "Miller Lite" },
        { name: "Coors Light" },
      ],
    },
    {
      name: "House Wines",
      description: "Glass $7 | Bottle $25",
      items: [
        { name: "Pinot Grigio" },
        { name: "Chardonnay" },
        { name: "Sauvignon Blanc" },
        { name: "Prosecco" },
        { name: "Cabernet Sauvignon" },
        { name: "Pinot Noir" },
        { name: "Merlot" },
      ],
    },
    {
      name: "Sangria",
      items: [
        {
          name: "White Sangria",
          description: "White wine, sangria syrup, mixed fruit and a splash of soda.",
          price: "$8",
        },
        {
          name: "Red Sangria",
          description: "Red wine, sangria syrup, mixed fruits and a splash of soda.",
          price: "$8",
        },
      ],
    },
  ],
};

export const tequilaMenu: MenuSection = {
  title: "Tequilas & Mezcales",
  categories: [
    {
      name: "Mezcales",
      items: [
        { name: "Del Maguey Vida" },
        { name: "Ilegal Joven" },
        { name: "400 Conejos" },
      ],
    },
    {
      name: "Tequila Blanco (Silver)",
      description: "The heart and passion of Mexico, only 5 states are authorized to produce it. Tequila can only be produced from the Blue Weber agave and 100% agave.",
      items: [
        { name: "7 Leguas" },
        { name: "Casa Amigos" },
        { name: "Clase Azul" },
        { name: "Don Julio" },
        { name: "El Jimador" },
        { name: "Espolon" },
        { name: "Fortaleza" },
        { name: "G4" },
        { name: "Herradura" },
        { name: "Luna Azul" },
        { name: "Milagro" },
        { name: "Corralejo" },
        { name: "Patrón" },
        { name: "Sauza Hornitos" },
        { name: "Lalo" },
        { name: "Tequila 8" },
      ],
    },
    {
      name: "Tequila Reposado",
      items: [
        { name: "7 Leguas" },
        { name: "Casa Amigos" },
        { name: "Clase Azul" },
        { name: "Don Julio" },
        { name: "El Jimador" },
        { name: "Espolon" },
        { name: "Fortaleza" },
        { name: "G4" },
        { name: "Herradura" },
        { name: "Tesoro" },
        { name: "Luna Azul" },
        { name: "Milagro" },
        { name: "Corralejo" },
        { name: "Patrón" },
        { name: "Sauza Hornitos" },
        { name: "Tequila 8" },
      ],
    },
    {
      name: "Tequila Añejo",
      items: [
        { name: "7 Leguas" },
        { name: "Casa Amigos" },
        { name: "Clase Azul" },
        { name: "Don Julio" },
        { name: "El Jimador" },
        { name: "Espolon" },
        { name: "Fortaleza" },
        { name: "G4" },
        { name: "Herradura" },
        { name: "Tesoro" },
        { name: "Luna Azul" },
        { name: "Milagro" },
        { name: "Corralejo" },
        { name: "Patrón" },
        { name: "Sauza Hornitos" },
        { name: "Tequila 8" },
      ],
    },
  ],
};

// Food Menu (based on typical Mexican restaurant offerings)
export const foodMenu: MenuSection = {
  title: "Food",
  categories: [
    {
      name: "Appetizers",
      items: [
        {
          name: "Guacamole",
          description: "Fresh avocados, tomatoes, onions, cilantro, jalapeño, lime. Served with warm tortilla chips.",
          price: "$12",
        },
        {
          name: "Queso Fundido",
          description: "Melted Oaxaca cheese with chorizo, served with warm tortillas.",
          price: "$14",
        },
        {
          name: "Nachos Supreme",
          description: "Crispy tortilla chips topped with beans, cheese, jalapeños, sour cream, guacamole, and pico de gallo. Add chicken or beef +$4.",
          price: "$15",
        },
        {
          name: "Ceviche",
          description: "Fresh fish marinated in lime juice with tomatoes, onions, cilantro, and avocado.",
          price: "$16",
        },
        {
          name: "Aguachile",
          description: "Shrimp marinated in lime and serrano peppers with cucumber and red onion.",
          price: "$18",
        },
      ],
    },
    {
      name: "Tacos",
      description: "Served with rice and beans. Three tacos per order.",
      items: [
        {
          name: "Tacos Al Pastor",
          description: "Marinated pork, pineapple, cilantro, onions on corn tortillas.",
          price: "$16",
        },
        {
          name: "Tacos de Carnitas",
          description: "Slow-cooked pulled pork with cilantro and onions.",
          price: "$16",
        },
        {
          name: "Tacos de Carne Asada",
          description: "Grilled steak with cilantro, onions, and salsa verde.",
          price: "$18",
        },
        {
          name: "Tacos de Pollo",
          description: "Grilled chicken with lettuce, tomato, and chipotle crema.",
          price: "$15",
        },
        {
          name: "Tacos de Pescado",
          description: "Beer-battered fish with cabbage slaw and chipotle mayo.",
          price: "$18",
        },
        {
          name: "Tacos de Camarón",
          description: "Grilled shrimp with mango salsa and avocado crema.",
          price: "$19",
        },
      ],
    },
    {
      name: "Enchiladas",
      description: "Three enchiladas served with rice and beans.",
      items: [
        {
          name: "Enchiladas Rojas",
          description: "Chicken or beef enchiladas with red sauce, topped with cheese and sour cream.",
          price: "$17",
        },
        {
          name: "Enchiladas Verdes",
          description: "Chicken enchiladas with tomatillo green sauce and queso fresco.",
          price: "$17",
        },
        {
          name: "Enchiladas Suizas",
          description: "Chicken enchiladas with creamy tomatillo sauce and melted cheese.",
          price: "$18",
        },
        {
          name: "Enchiladas de Mole",
          description: "Chicken enchiladas with authentic Oaxacan mole sauce.",
          price: "$19",
        },
      ],
    },
    {
      name: "Especialidades de la Casa",
      items: [
        {
          name: "Fajitas",
          description: "Sizzling grilled peppers and onions. Choice of chicken, steak, or shrimp. Served with rice, beans, tortillas, guacamole, and sour cream.",
          price: "$22",
        },
        {
          name: "Chile Relleno",
          description: "Roasted poblano pepper stuffed with cheese, dipped in egg batter, served with ranchero sauce, rice and beans.",
          price: "$18",
        },
        {
          name: "Mole Poblano",
          description: "Chicken breast topped with traditional Oaxacan mole sauce. Served with rice and beans.",
          price: "$20",
        },
        {
          name: "Carnitas",
          description: "Slow-cooked pork served with rice, beans, tortillas, and all the fixings.",
          price: "$19",
        },
        {
          name: "Cochinita Pibil",
          description: "Yucatan-style slow-roasted pork marinated in achiote. Served with pickled onions, rice and beans.",
          price: "$21",
        },
        {
          name: "Carne Asada",
          description: "Grilled ribeye steak served with rice, beans, guacamole, and tortillas.",
          price: "$26",
        },
      ],
    },
    {
      name: "Burritos",
      items: [
        {
          name: "Burrito California",
          description: "Large flour tortilla filled with your choice of meat, rice, beans, cheese, guacamole, and sour cream.",
          price: "$16",
        },
        {
          name: "Burrito Mojado",
          description: "Wet burrito smothered in red sauce and melted cheese.",
          price: "$18",
        },
      ],
    },
    {
      name: "Combinaciones",
      description: "Create your own combination plate. Served with rice and beans.",
      items: [
        {
          name: "Two Item Combo",
          description: "Choose any two: taco, enchilada, tamale, chile relleno, or tostada.",
          price: "$16",
        },
        {
          name: "Three Item Combo",
          description: "Choose any three: taco, enchilada, tamale, chile relleno, or tostada.",
          price: "$19",
        },
      ],
    },
  ],
};
