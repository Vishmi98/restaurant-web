export type DishCardProps = {
    id: number;
    name: string;
    price: string;
    oldPrice?: string;
    image: string;
    description: string; // Made required for single page
    category: string;
    tags: string[];
    rating: number;
    reviews: number;
    calories: number;
    prepTime: string;
};


