import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51KD8TbLUOearz2909N2ihgn7JrsqyeQh8OP3o4X7tGPm4j3sJDkOjcBsOtDQPO4Xb7qPRacWY7FJkZeU2tPpsDry00O33SIsEk';

    const onToken = token => {
        console.log(token);
        alert('Payment successful')
    }

        return (<StripeCheckout
            label='Pay Now'
            name='MY Clothing App'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total price is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />)
    }



export default StripeCheckoutButton