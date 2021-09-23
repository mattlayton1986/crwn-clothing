import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
  // Stripe requires price in cents
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_51JcjyII7LgodL0k4v6mhEYnjUSwYzUMXq0GoLFMP9P13YGBhNluIrBVtZ71ANwOIJONogcPAk6TVSGNsGcG9HrCG00hOwmIJTV'

  const onToken = token => {
    console.log(token)
    alert('Payment Successful')
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

