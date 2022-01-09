import { createSlice } from '@reduxjs/toolkit';
import { addItemToCart, removeItemFromCart, deleteCartItem } from './cart.utils';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        visible: false,
        cartItems: [],
    },
    reducers: {
        triggerVisibility: (state) => {
                state.visible = !state.visible;
            },
        addItem: (state, action) => {
            state.cartItems = addItemToCart(state.cartItems, action.payload);
        },
        removeItem: (state, action) => {
            state.cartItems = removeItemFromCart(state.cartItems, action.payload);
        },
        deleteItem: (state, action) => {
            state.cartItems = deleteCartItem(state.cartItems, action.payload); 
        },
        clearCart: (state) => { state.cartItems = [] }
        },
    },
)

export const {triggerVisibility, addItem, removeItem, deleteItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer