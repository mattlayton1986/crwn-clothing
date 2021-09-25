import React from 'react'
import { connect } from 'react-redux'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { ReactComponent as Icon } from '../../assets/shopping-bag.svg'
import { createStructuredSelector } from 'reselect'
import styled from 'styled-components'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'
// import './cart-icon.styles.scss'

const StyledCartIcon = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const ShoppingIcon = styled(Icon)`
  width: 24px;
  height: 24px;
`

const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <StyledCartIcon onClick={toggleCartHidden}>
    <ShoppingIcon />
    <ItemCount>{itemCount}</ItemCount>
  </StyledCartIcon>
)

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)