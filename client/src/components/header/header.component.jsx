import React from 'react'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { signOutStart } from '../../redux/user/user.actions'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { ReactComponent as Logo } from '../../assets/crown.svg'

const StyledHeader = styled.header`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
  }
`

const LogoLink = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;

  @media screen and (max-width: 800px) {
    width: 50px;
    padding: 0;
  }
`

const OptionsContainer = styled.nav`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`

const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  appearance: none;
  border: none;
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
`

const Header = () => {
  const currentUser = useSelector( selectCurrentUser )
  const hidden = useSelector( selectCartHidden )
  const dispatch = useDispatch()

  const handleSignOut = () => {
    dispatch(signOutStart())
  }

  return (
    <StyledHeader>
      <LogoLink to="/">
        <Logo className="logo" />
      </LogoLink>
      <OptionsContainer>
        <OptionLink to="/shop">
          SHOP
        </OptionLink>
        <OptionLink to="/contact">
          CONTACT
        </OptionLink>
        {
          currentUser ? (
            <OptionLink as="button" onClick={handleSignOut}>
              SIGN OUT
            </OptionLink>
          ) : (
            <OptionLink 
              to='/login'
            >
              SIGN IN
            </OptionLink>
          )
        }
        <CartIcon />
      </OptionsContainer>
      {
        hidden ? null : <CartDropdown />
      }
    </StyledHeader>
  )
}

export default Header