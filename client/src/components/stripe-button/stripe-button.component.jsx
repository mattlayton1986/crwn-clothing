import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {
  // Stripe requires price in cents
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_51JcjyII7LgodL0k4v6mhEYnjUSwYzUMXq0GoLFMP9P13YGBhNluIrBVtZ71ANwOIJONogcPAk6TVSGNsGcG9HrCG00hOwmIJTV'

  const onToken = (token) => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then((response) => {
      alert('Payment successful')
    }).catch((error) => {
      console.error('Payment error: ', JSON.parse(error))
      alert('There was an issue with your payment. Please make sure you use the provided credit card number.')
    })
  }

  return (
    <StripeCheckout 
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton

