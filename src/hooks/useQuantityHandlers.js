import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  decrementQty,
  incrementQty,
  removeFromCart,
  setQty,
} from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function useQuantityHandlers({ id, qty, stock = 1 }) {
  const dispatch = useDispatch();
  const [inputQty, setInputQty] = useState(qty);

  useEffect(() => {
    setInputQty(qty);
  }, [qty]);

  const handleCartDelete = () => {
    dispatch(removeFromCart(id));
    toast.success("Producto eliminado exitosamente")
  };

  const handleIncrementQty = () => {
    if (qty < stock) {
      dispatch(incrementQty(id));
    }
  };

  const handleDecrementQty = () => {
    dispatch(decrementQty(id));
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
