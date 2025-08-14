import { companyData } from "@/utils/general/companyData";

const { createSlice } = require("@reduxjs/toolkit");

// --- Helpers ---
const loadCart = () => {
  if (typeof window === "undefined") return { items: [], totals: {} };
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { items: [], totals: {} };
  } catch {
    return { items: [], totals: {} };
  }
};

const persistCart = (state) => {
  if (typeof window === "undefined") return;
  const cartData = {
    items: state.items,
    totals: state.totals,
  };
  localStorage.setItem("cart", JSON.stringify(cartData));
};

const recalculateTotals = (state) => {
  const subtotal = state.items.reduce((acc, item) => {
    const price = item.salePrice ?? item.price;
    return acc + price * item.qty;
  }, 0);

  const discountAmount = (subtotal * (state.totals.coupon.value || 0)) / 100;

  const taxTotal = (subtotal * (state.totals.tax || 0)) / 100;
  const taxableBase = Math.max(0, subtotal - discountAmount);

  state.totals.subtotal = subtotal;
  state.totals.subtotalWithoutTax = subtotal - taxTotal;
  state.totals.discountAmount = discountAmount;
  state.totals.taxTotal = taxTotal;
  state.totals.taxableBase = taxableBase;
  state.totals.total = taxableBase + state.totals.shippingCost;
};

// --- Estado inicial ---
const initialProducts = loadCart();

const initialState = {
  items: initialProducts.items || [],
  totals: {
    subtotal: 0,
    tax: companyData?.tax || 0,
    coupon: { couponCode: "", value: 0 },
    shippingCost: 0,
    discountAmount: 0,
    subtotalWithoutTax: 0,
    taxTotal: 0,
    total: 0,
    ...initialProducts.totals,
  },
};

// --- Slice ---
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, salePrice, price, brand, imageUrl, stock, code } =
        action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.qty < stock) {
          existingItem.qty += 1;
        }
      } else {
        state.items.push({
          id,
          title,
          price,
          salePrice,
          qty: 1,
          brand,
          imageUrl,
          stock,
          code,
        });
      }

      recalculateTotals(state);
      persistCart(state);
    },

    removeFromCart: (state, action) => {
      const cartId = action.payload;
      state.items = state.items.filter((item) => item.id !== cartId);

      if (state.items.length === 0) {
        // Solo actualizamos el estado, nada de efectos secundarios
        state.items = [];
        state.totals = {
          subtotal: 0,
          tax: companyData?.tax || 0,
          coupon: { couponCode: "", value: 0 },
          shippingCost: 0,
          discountAmount: 0,
          subtotalWithoutTax: 0,
          taxTotal: 0,
          total: 0,
        };
      } else {
        recalculateTotals(state);
      }

      persistCart(state); // guardar estado actualizado en localStorage
    },

    incrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.items.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty < cartItem.stock) {
        cartItem.qty += 1;
        recalculateTotals(state);
        persistCart(state);
      }
    },

    decrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.items.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
        recalculateTotals(state);
        persistCart(state);
      }
    },

    setQty: (state, action) => {
      const { id, qty } = action.payload;
      const cartItem = state.items.find((i) => i.id === id);
      if (!cartItem) return;

      const parsedQty = parseInt(qty, 10);
      if (isNaN(parsedQty) || parsedQty < 1 || parsedQty > cartItem.stock)
        return;

      cartItem.qty = parsedQty;
      recalculateTotals(state);
      persistCart(state);
    },

    emptyCart: (state) => {
      state.items = [];
      state.totals = {
        subtotal: 0,
        tax: companyData?.tax || 0,
        coupon: { couponCode: "", value: 0 },
        shippingCost: 0,
        discountAmount: 0,
        subtotalWithoutTax: 0,
        taxTotal: 0,
        total: 0,
      };
      persistCart(state);
    },

    updateCartTotals: (state, action) => {
      state.totals = { ...state.totals, ...action.payload };
      recalculateTotals(state);
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
  updateCartTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
