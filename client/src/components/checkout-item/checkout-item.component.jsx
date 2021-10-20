import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions'

export const StyledCheckoutItem = styled.article`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  @media screen and (max-width: 800px) {
    font-size: 18px;
  }
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const TextContainer = styled.span`
  width: 23%;

  @media screen and (max-width: 800px) {
    width: 22%;
  }
`;

export const QuantityContainer = styled(TextContainer)`
  display: flex;
  div {
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
  }
  span {
    margin: 0 10px;
  }
`;

QuantityContainer.displayName = "QuantityContainer";

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: 0.6;

  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
`;

RemoveButton.displayName = "RemoveButton";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem
  const dispatch = useDispatch()

  const removeCartItem = (cartItem) => {
    dispatch(removeItem(cartItem))
  }

  const addCartItem = (cartItem) => {
    dispatch(addItem(cartItem))
  }

  const clearCartItem = (cartItem) => {
    dispatch(clearItemFromCart(cartItem))
  }

  return (
    <StyledCheckoutItem>
      <ImageContainer>
        <img alt={name} src={imageUrl} />
      </ImageContainer>
      <TextContainer>{name}</TextContainer>
      <QuantityContainer>
        <div onClick={() => removeCartItem(cartItem)}>&#10094;</div>
        <span>{quantity}</span>
        <div onClick={() => addCartItem(cartItem)}>&#10095;</div>
      </QuantityContainer>
      <TextContainer>${price}</TextContainer>
      <RemoveButton onClick={() => clearCartItem(cartItem)}>❌</RemoveButton>
    </StyledCheckoutItem>
  )
}

export default CheckoutItem