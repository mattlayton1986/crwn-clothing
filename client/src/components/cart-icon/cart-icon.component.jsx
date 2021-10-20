import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { ReactComponent as Icon } from '../../assets/shopping-bag.svg'
import styled from 'styled-components'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

export const StyledCartIcon = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

StyledCartIcon.displayName = "StyledCartIcon";

export const ShoppingIcon = styled(Icon)`
  width: 24px;
  height: 24px;
`;

ShoppingIcon.displayName = "ShoppingIcon";

export const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;

ItemCount.displayName = "ItemCount";

const CartIcon = () => {
  const itemCount = useSelector( selectCartItemsCount ) 
  const dispatch = useDispatch()

  const handleCartIconClick = () => {
    dispatch(toggleCartHidden())
  }

  return (
    <StyledCartIcon onClick={handleCartIconClick}>
      <ShoppingIcon />
      <ItemCount>{itemCount}</ItemCount>
    </StyledCartIcon>
  )
}

export default CartIcon