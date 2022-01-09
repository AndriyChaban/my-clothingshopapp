import React from "react";
import './cart-dropdown.styles.scss';
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { useNavigate } from "react-router-dom";
import { triggerVisibility } from "../../redux/cart/cart.reducer";


const CartDropdown = () => {

    // const cartItems = useSelector((state)=>state.cart.cartItems)
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    

    return (
    <div className="cart-dropdown">
        <div className="cart-items">
                {cartItems.length ?
                 cartItems.map((cartItem) => (<CartItem key={cartItem.id} item={cartItem} />))
                 : (<span className="empty-message">Your cart is empty</span>)}
        </div>
            <CustomButton onClick={() => { navigate('/checkout'); dispatch(triggerVisibility()) }} inverted>GO TO CHECKOUT</CustomButton>
    </div>
)}

export default CartDropdown;