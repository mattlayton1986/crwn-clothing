import { createSelector } from 'reselect'

// Input selectors
const selectCart = state => state.cart

// Output selectors
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
)