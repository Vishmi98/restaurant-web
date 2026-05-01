import { DishCardProps } from "@/modules/home/home.types";

export const GOOGLE_MAP_KEY = "AIzaSyDKxii_HXUqbiIO1mQfOzUGuLyWll0GiR4"

export const JWT_SECRET = "eregr5trertw56rrgfhtyrt5tfasrgt235346346ffgsdfgdfsg4dfefsdrwef"

export const HERO_IMAGES = ["/banner-1.jpg", "/banner-2.jpg", "/banner-3.jpg"];

export const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Our Story", href: "#our-story" },
    { label: "Menu", href: "/menu" },
    { label: "Contact", href: "#contact" },
];

export const DISHES: DishCardProps[] = [
    {
        id: 1,
        name: "Chicken & Vegetable Fry",
        price: "$15.00",
        image: "/shop-4.png",
        category: "Main Course",
        tags: ["Healthy", "High Protein"],
        rating: 4.8,
        reviews: 124,
        calories: 450,
        prepTime: "20-25 min",
        description: "A vibrant stir-fry featuring tender strips of marinated chicken breast, crisp seasonal vegetables, and a savory ginger-soy glaze. Served piping hot with a garnish of sesame seeds."
    },
    {
        id: 2,
        name: "Strawberry Jam Toast",
        price: "$11.01",
        image: "/shop-1.png",
        category: "Breakfast",
        tags: ["Sweet", "Vegetarian"],
        rating: 4.5,
        reviews: 89,
        calories: 320,
        prepTime: "10 min",
        description: "Artisan sourdough bread toasted to a perfect golden brown, spread with organic house-made strawberry preserves and topped with a light dusting of powdered sugar."
    },
    {
        id: 3,
        name: "Penne Pasta with Meatball",
        price: "$30.00",
        image: "/shop-2.png",
        category: "Pasta",
        tags: ["Classic", "Italian"],
        rating: 4.9,
        reviews: 210,
        calories: 780,
        prepTime: "15-20 min",
        description: "Classic Italian penne pasta tossed in a rich, slow-simmered marinara sauce. Served with three jumbo hand-rolled beef meatballs and freshly grated Parmesan cheese."
    },
    {
        id: 4,
        name: "Fried Egg Sandwiches",
        price: "$18.00",
        oldPrice: "$20.00",
        image: "/shop-3.png",
        category: "Brunch",
        tags: ["Popular", "Breakfast"],
        rating: 4.7,
        reviews: 156,
        calories: 520,
        prepTime: "12 min",
        description: "Two farm-fresh eggs fried over-easy, nestled between layers of crispy bacon and sharp cheddar cheese on a toasted buttery brioche bun."
    },
];

export const FEEDBACKS = [
    {
        id: 1,
        name: "John Fernando",
        job: "Food Blogger",
        message:
            "The food was absolutely amazing from the first bite to the last. Every dish had authentic Sri Lankan flavor, fresh ingredients, and perfect presentation. The staff were kind, attentive, and made the whole evening memorable.",
        image: "/7.png",
    },
    {
        id: 2,
        name: "Sarah Williams",
        job: "Travel Vlogger",
        message:
            "Beautiful ambiance, warm hospitality, and truly delicious meals. I loved how each plate was prepared with care and creativity. It was one of the most enjoyable dining experiences I have had during my travels.",
        image: "/8.jpg",
    },
    {
        id: 3,
        name: "David Perera",
        job: "Chef",
        message:
            "A perfect balance of traditional taste and modern style. The spices were rich, the portions generous, and the quality outstanding. You can feel the passion and skill behind every dish served here.",
        image: "/9.jpg",
    },
];

export const DUMMY_CART = [
    {
        id: 1,
        name: "Gourmet Beef Burger",
        price: 18.00,
        image: "/shop-1.png", // Replace with your dish image paths
        quantity: 1,
        category: "Main Course"
    },
    {
        id: 2,
        name: "Fresh Mediterranean Salad",
        price: 12.50,
        image: "/shop-2.png",
        quantity: 2,
        category: "Starter"
    }
];