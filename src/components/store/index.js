import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui-slice";
import { shoppingCartSlice } from "./cart-slice";

export const store = configureStore({
    reducer: {cartSlice: shoppingCartSlice.reducer, uiSlice: uiSlice.reducer}
});