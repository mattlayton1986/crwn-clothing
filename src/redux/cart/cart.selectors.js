import { createSelector } from 'reselect'

// Input selectors
const selectCart = state => state.cart

// Output selectors
export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
)

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  // Gets total quantity of all items in cart added together
  (cartItems) => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  // Gets total price for all items in cart
  (cartItems) => cartItems.reduce(
    (acc, cartItem) => acc + (cartItem.quantity * cartItem.price)
    , 0)
)