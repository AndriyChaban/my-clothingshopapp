import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const selectCartItems = createSelector(
    [(state)=>state.cart],
    (cart) => cart.cartItems
    );

export const selectCartVisible = createSelector(
    [(state) => state.cart],
    (cart) => cart.visible
);

export const SelectCartItemsCount = () => {
    return (<div>
        {useSelector((state) => selectCartItems(state).reduce((accumulatedQuantity, cartItem) => (accumulatedQuantity + cartItem.quantity), 0))}
    </div>)
}

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => (cartItems.reduce((accumulatedQuantity, cartItem) => (accumulatedQuantity + cartItem.quantity * cartItem.price), 0)))

