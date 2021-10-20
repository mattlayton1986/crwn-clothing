import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import styled from "styled-components";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

export const StyledCartDropdown = styled.aside`
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
`;

StyledCartDropdown.displayName = "StyledCartDropdown";

export const StyledCartDropdownButton = styled(CustomButton)`
  margin-top: auto;
`;

StyledCartDropdownButton.displayName = "StyledCartDropdownButton";

export const EmptyMessageContainer = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

// EmptyMessageContainer.displayName = "EmptyMessageContainer";

export const CartItems = styled.ul`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

CartItems.displayName = "CartItems";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <StyledCartDropdown>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        )}
      </CartItems>
      <StyledCartDropdownButton
        onClick={() => {
          history.push("/checkout");
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </StyledCartDropdownButton>
    </StyledCartDropdown>
  );
};

export default CartDropdown;
