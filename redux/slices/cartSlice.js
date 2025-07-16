const { createSlice } = require("@reduxjs/toolkit");

const initialState = [
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
];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, salePrice, price, brand, imageUrl, stock } =
        action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.qty += 1;
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
    },

    removeFromCart: (state, action) => {
      const cartId = action.payload;
      return state.filter((item) => item.id !== cartId);
    },

    incrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.qty += 1;
      }
    },

    decrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
      }
    },

    setQty: (state, action) => {
      const { id, qty } = action.payload;
      const cartItem = state.find((i) => i.id === id);
      if (!cartItem) return;

      const parsedQty = parseInt(qty, 10);
      if (isNaN(parsedQty) || parsedQty < 1 || !Number.isInteger(parsedQty)) {
        return;
      }
    },

    emptyCart: (state) => {
      state.length = 0;
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
