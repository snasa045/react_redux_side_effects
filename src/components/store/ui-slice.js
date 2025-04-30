import { createSlice } from "@reduxjs/toolkit";


export const uiSlice = createSlice({
    name: 'ui',
    initialState: {toggleMyCart: false, notification: null},
    reducers: {
        toggleMyCart(state){
            state.toggleMyCart = !state.toggleMyCart;
        },
        showNotification(state, {payload}){
            state.notification = {
                status: payload.status,
                title: payload.title,
                message: payload.message
            }
        }
    }
})

export const uiActions = uiSlice.actions;