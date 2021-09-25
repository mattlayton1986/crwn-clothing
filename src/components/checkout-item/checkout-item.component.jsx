import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions'
// import './checkout-item.styles.scss'

const StyledCheckoutItem = styled.article`
  width: 100% ;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`

const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`

const TextContainer = styled.span`
  width: 23%;
`

const QuantityContainer = styled(TextContainer)`
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
`

const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
  transition: all .2s ease-in-out;
  opacity: 0.6;


  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
`

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem
  return (
    <StyledCheckoutItem>
      <ImageContainer>
        <img alt="item" src={imageUrl} />
      </ImageContainer>
      <TextContainer>{name}</TextContainer>
      <QuantityContainer>
        <div onClick={() => removeItem(cartItem)}>&#10094;</div>
        <span>{quantity}</span>
        <div onClick={() => addItem(cartItem)}>&#10095;</div>
      </QuantityContainer>
      <TextContainer>${price}</TextContainer>
      <RemoveButton onClick={() => clearItem(cartItem)}>❌</RemoveButton>
    </StyledCheckoutItem>
  )
}

const mapDispatchToProps = (dispatch) => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)