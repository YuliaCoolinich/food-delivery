import { useReducer } from "react";
import CartContext from '../../../store/cartContext';
import cartReducer, { defaultCartState, ADD_TYPE, REMOVE_TYPE, EMPTY_TYPE } from "../../../store/cardReducer";


const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: (item) => {
      dispatchCartAction({ type: ADD_TYPE, item });
    },
    removeItem: (id) => {
      dispatchCartAction({ type: REMOVE_TYPE, id });
    },
    emptyCart: () => {
      dispatchCartAction( { type: EMPTY_TYPE });
    }
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
