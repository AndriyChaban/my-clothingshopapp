import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51KD8TbLUOearz2909N2ihgn7JrsqyeQh8OP3o4X7tGPm4j3sJDkOjcBsOtDQPO4Xb7qPRacWY7FJkZeU2tPpsDry00O33SIsEk';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment Successful')
        }).catch(error => {
            console.log('Payment Error', JSON.parse(error));
            alert('Issue with payment')
        })
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