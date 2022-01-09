import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import './checkoutpage.styles.scss';

const CheckoutPage = () => {
    const totalPrice = useSelector(selectCartTotal)

    return (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>PRODUCT</span>
            </div>
            <div className="header-block">
                <span>DESCRIPTION</span>
            </div>
            <div className="header-block">
                <span>QUANTITY</span>
            </div>
            <div className="header-block">
                <span>PRICE</span>
            </div>
            <div className="header-block">
                <span>REMOVE</span>
            </div>

        </div>
            {
                useSelector(selectCartItems).map((cartItem) =>
                    <CheckoutItem key={cartItem.id} cartItem={cartItem }/>)
        }
            <div className="total">
                <span>TOTAL: ${totalPrice}</span>
            </div>
            <div className="test-warning">
                *Please use the following test credit card for payment*
                <br />
                4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
            </div>
            <StripeCheckoutButton price={totalPrice}/>
    </div>
    )
}

export default CheckoutPage;