const { createSlice } = require("@reduxjs/toolkit");

// --- Helpers ---
const loadCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const persistCart = (state) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify([...state]));
};

// --- Estado inicial ---
const initialState = loadCart();
/* const initialState = [
  {
    id: 2,
    title: "Otro producto",
    brand: "Marca ABC",
    salePrice: 40.0,
    price: 40.0,
    qty: 4,
    imageUrl: "",
    slug: "colas-feas",
    stock: 6,
  },
]; */

// --- Slice ---
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, salePrice, price, brand, imageUrl, stock } =
        action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.qty < stock) {
          existingItem.qty += 1;
        }
      } else {
        state.push({
          id,
          title,
          price,
          salePrice,
          qty: 1,
          brand,
          imageUrl,
          stock,
        });
      }

      persistCart(state);
    },

    removeFromCart: (state, action) => {
      const cartId = action.payload;
      const newState = state.filter((item) => item.id !== cartId);
      persistCart(newState);
      return newState;
    },

    incrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty < cartItem.stock) {
        cartItem.qty += 1;
        persistCart(state);
      }
    },

    decrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
        persistCart(state);
      }
    },

    setQty: (state, action) => {
      const { id, qty } = action.payload;
      const cartItem = state.find((i) => i.id === id);
      if (!cartItem) return;

      const parsedQty = parseInt(qty, 10);
      if (isNaN(parsedQty) || parsedQty < 1 || parsedQty > cartItem.stock)
        return;

      cartItem.qty = parsedQty;
      persistCart(state);
    },

    emptyCart: (state) => {
      state.length = 0;
      persistCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  setQty,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
