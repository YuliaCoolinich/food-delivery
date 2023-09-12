export const defaultCartState = {
  items: [],
  totalAmount: 0,
};

export const ADD_TYPE = "ADD";
export const REMOVE_TYPE = "REMOVE";
export const EMPTY_TYPE = "EMPTY";

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TYPE: {
      const updatedAmount =
        state.totalAmount + action.item.amount * action.item.price;

      const foundedIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[foundedIndex];

      let updatedItems;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[foundedIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: Number(Number(updatedAmount.toFixed(4))),
      };
    }
    case REMOVE_TYPE: {
      const foundedIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const foundedItem = state.items[foundedIndex];
      if (foundedItem) {
        const updatedAmount = state.totalAmount - foundedItem.price;
        const updatedItems =
          foundedItem.amount === 1
            ? state.items.filter((item) => item.id !== action.id)
            : state.items.map((item) => item.id === action.id ? { ...item, amount: item.amount - 1 } : item);
        return {
          items: updatedItems,
          totalAmount: Number(Number(updatedAmount.toFixed(4))),
        };
      }
      return state;
    }
    case EMPTY_TYPE:
      return defaultCartState;
    default:
      return defaultCartState;
  }
};

export default cartReducer;
