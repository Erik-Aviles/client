const { createSlice } = require("@reduxjs/toolkit");

// --- Helpers ---
const loadCheckout = () => {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem("checkout");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const persistCheckout = (state) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("checkout", JSON.stringify(state));
  } catch {
    console.error("Error al guardar el estado de pago en localStorage");
  }
};
// --- Estado inicial ---
const initialState = loadCheckout() || {
  currentStep: 1,
  personalInfo: {},
  shippingInfo: {},
  paymentInfo: {},
  completed: false,
};

// --- Slice ---
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < 4) {
        state.currentStep += 1;
        persistCheckout(state);
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
        persistCheckout(state);
      }
    },
    goToStep: (state, action) => {
      const step = action.payload;
      if (step >= 1 && step <= 4) {
        state.currentStep = step;
        persistCheckout(state);
      }
    },
    setPersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
      persistCheckout(state);
    },
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      persistCheckout(state);
    },
    setPaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
      persistCheckout(state);
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
      persistCheckout(state);
    },

    resetCheckout: () => {
      const newState = {
        currentStep: 1,
        personalInfo: {},
        shippingInfo: {},
        paymentInfo: {},
      };
      persistCheckout(newState);
      return newState;
    },
  },
});

// --- Exportaciones ---
export const {
  nextStep,
  prevStep,
  goToStep,
  setPersonalInfo,
  setShippingInfo,
  setPaymentInfo,
  setCompleted,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
