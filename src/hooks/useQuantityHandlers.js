import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQty,
  incrementQty,
  removeFromCart,
  setQty,
} from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { resetCheckout } from "../../redux/slices/checkoutSlice";

export default function useQuantityHandlers({ id, qty, stock = 1 }) {
  const dispatch = useDispatch();
  const cartLength = useSelector((state) => state.cart.items.length);
  const [inputQty, setInputQty] = useState(qty);

  useEffect(() => {
    setInputQty(qty);
  }, [qty]);

  const handleCartDelete = () => {
    if (cartLength === 1) {
      toast.success("Sin productos en el carrito");
      dispatch(removeFromCart(id));
      dispatch(resetCheckout());
    } else {
      dispatch(removeFromCart(id));
      toast.success("Producto eliminado del carrito");
    }
  };

  const handleIncrementQty = () => {
    if (qty < stock) {
      dispatch(incrementQty(id));
    }
  };

  const handleDecrementQty = () => {
    dispatch(decrementQty(id));
    if (cartLength === 0) {
      dispatch(resetCheckout());
      toast.success("Sin productos en el carrito");
    }
  };

  const handleManualChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setInputQty("");
      return;
    }

    const parsed = parseInt(value, 10);
    if (
      !isNaN(parsed) &&
      parsed >= 0 &&
      parsed <= stock &&
      Number.isInteger(parsed)
    ) {
      setInputQty(parsed);
      dispatch(setQty({ id, qty: parsed }));
    }
  };

  const handleBlur = () => {
    if (inputQty === "") {
      setInputQty(qty);
    }
  };

  return {
    inputQty,
    handleCartDelete,
    handleIncrementQty,
    handleDecrementQty,
    handleManualChange,
    handleBlur,
  };
}
