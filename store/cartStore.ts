import { create } from 'zustand';

interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface CartState {
    cart: CartItem[];
    cartCount: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string | number) => void;
    clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
    cart: [],
    cartCount: 0,

    addToCart: (item) => set((state) => {
        const existingItem = state.cart.find((i) => i.id === item.id);
        let newCart;

        if (existingItem) {
            newCart = state.cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
        } else {
            newCart = [...state.cart, { ...item, quantity: 1 }];
        }

        return {
            cart: newCart,
            cartCount: newCart.reduce((total, i) => total + i.quantity, 0),
        };
    }),

    removeFromCart: (id) => set((state) => {
        const newCart = state.cart.filter((i) => i.id !== id);
        return {
            cart: newCart,
            cartCount: newCart.reduce((total, i) => total + i.quantity, 0),
        };
    }),

    clearCart: () => set({ cart: [], cartCount: 0 }),
}));

export default useCartStore;