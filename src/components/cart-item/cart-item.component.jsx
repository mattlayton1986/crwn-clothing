import React from 'react'
import styled from 'styled-components'
// import './cart-item.styles.scss'

const StyledCartItem = styled.li`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;
  img {
    width: 30%;
  }
`

const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;
  h3 {
    font-size: 16px;
    margin: 0;
  }
`

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <StyledCartItem>
    <img src={imageUrl} alt={name} />
    <ItemDetails>
      <h3>{name}</h3>
      <span>{quantity} x ${price}</span>
    </ItemDetails>
  </StyledCartItem>
)

export default CartItem