import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router'
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component'
import styled from 'styled-components'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
// import './cart-dropdown.styles.scss'

const StyledCartDropdown = styled.aside`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
  
  & > button {
    margin-top: auto;
  }
`

const CartItems = styled.ul`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 0;
  margin: 0;
  list-style-type: none;
  > span {
    font-size: 18px;
    margin: 50px auto;
  }
`

const CartDropdown = ({ history }) => {
  const cartItems = useSelector( selectCartItems )
  const dispatch = useDispatch()

  return (
    <StyledCartDropdown>
      <CartItems>
        {
          cartItems.length ?
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          )) :
          <span>Your cart is empty</span>
        }
      </CartItems>
      <CustomButton onClick={() => {
        history.push('/checkout')
        dispatch(toggleCartHidden())
      }}>
        GO TO CHECKOUT
      </CustomButton>
    </StyledCartDropdown>
  )
}

export default withRouter(CartDropdown)