import React from 'react'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'

const StyledCheckoutPage = styled.main`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;

  @media screen and (max-width: 800px) {
    width: 90%;
  }
`

const CheckoutHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;

  > div {
    text-transform: capitalize;
    width: 23%;

    &:last-child {
      width: 8%;
    }

    @media screen and (max-width: 800px) {
      width: 22%;
      &:last-child {
        width: 12%;
      }
    }
  }
`

const Total = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`

const TestWarning = styled.aside`
  text-align: center;
  margin: 40px auto;
  font-size: 24px;
  color: red;
`

const CheckoutPage = () => {
  const cartItems = useSelector( selectCartItems )
  const total = useSelector( selectCartTotal )

  return (
    <StyledCheckoutPage>
      <CheckoutHeader>
        <div>
          <span>Product</span>
        </div>
        <div>
          <span>Description</span>
        </div>
        <div>
          <span>Quantity</span>
        </div>
        <div>
          <span>Price</span>
        </div>
        <div>
          <span>Remove</span>
        </div>
      </CheckoutHeader>
      {
        cartItems.map(cartItem => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))
      }
      <Total>
        <span>TOTAL: ${total}</span>
      </Total>
      <TestWarning>
        <p>*Please use a test credit card from the link below for payments*</p>
        <a 
          href="https://stripe.com/docs/testing#cards" 
          target="_blank"
          rel="noreferrer"
        >
          https://stripe.com/docs/testing#cards
        </a>
      </TestWarning>
      <StripeCheckoutButton price={total} />
    </StyledCheckoutPage>
  )
}

export default CheckoutPage