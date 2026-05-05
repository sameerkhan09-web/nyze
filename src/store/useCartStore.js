import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],

  addToCart: (product, qty = 1) => {
    const { cartItems } = get();
    const existItem = cartItems.find((x) => x.product === product._id);

    let newItems;
    if (existItem) {
      newItems = cartItems.map((x) =>
        x.product === product._id ? { ...product, product: product._id, qty } : x
      );
    } else {
      newItems = [...cartItems, { ...product, product: product._id, qty }];
    }

    localStorage.setItem('cartItems', JSON.stringify(newItems));
    set({ cartItems: newItems });
  },

  removeFromCart: (id) => {
    const { cartItems } = get();
    const newItems = cartItems.filter((x) => x.product !== id);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    set({ cartItems: newItems });
  },

  clearCart: () => {
    localStorage.removeItem('cartItems');
    set({ cartItems: [] });
  },

  getCartTotal: () => {
    const { cartItems } = get();
    return cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  },
}));

export default useCartStore;
