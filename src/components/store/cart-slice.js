import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialState = {
  shoppingCart: [],
  totalQuantity: 0,
  changed: false,
};

// const shoppingCartItem = {
//     id: "",
//     title: "",
//     count: 0,
//     totalAmount: 0,
//     perCountAmount: 0
// }

export const shoppingCartSlice = createSlice({
  name: "shoppingCartStore",
  initialState,
  reducers: {
    setInitialState(state, { payload: cartData }) {
      state.shoppingCart = cartData.shoppingCart;
      state.totalQuantity = cartData.totalQuantity;
    },
    addToCart(state, { payload }) {
      state.totalQuantity++;
      state.changed = true;
      const existingItem = state.shoppingCart.find(
        (item) => item.id === payload.id
      );
      if (existingItem) {
        console.log("existingItem", existingItem);
        existingItem.count++;
        existingItem.totalAmount = existingItem.totalAmount + payload.amount;
        return;
      }
      state.shoppingCart.push({
        id: payload.id,
        title: payload.title,
        count: 1,
        totalAmount: payload.amount,
        perCountAmount: payload.amount,
      });
    },
    increaseItem(state, { payload: id }) {
      state.changed = true;
      const existingItem = state.shoppingCart.find((item) => item.id === id);
      state.totalQuantity++;
      existingItem.count++;
      existingItem.totalAmount =
        existingItem.totalAmount + existingItem.perCountAmount;
    },
    decreaseItem(state, { payload: id }) {
      state.changed = true;
      const existingItem = state.shoppingCart.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.count === 1) {
        state.shoppingCart = state.shoppingCart.filter(
          (item) => item.id !== id
        );
        return;
      }
      existingItem.count--;
      existingItem.totalAmount =
        existingItem.totalAmount - existingItem.perCountAmount;
    },
  },
});

export const shoppingCartActions = shoppingCartSlice.actions;
