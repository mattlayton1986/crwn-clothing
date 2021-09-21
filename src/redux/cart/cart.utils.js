export const addItemToCart = (cartItems, cartItemToAdd) => {
  // Check if the item we want to add to cart already exists in the
  // user's cart.
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  )

  // If item already exists in cart
  if (existingCartItem) {
    return cartItems.map(cartItem => 
      // If the item in the cart array matches the item we want to add
      cartItem.id === cartItemToAdd.id 
      // increase it's quantity by 1
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      // Otherwise, it's a different item so just keep it in cart as is
      : cartItem
    )
  }

  // Otherwise, add the item to the cart with a quantity of 1
  return [...cartItems, {...cartItemToAdd, quantity: 1}]
}