export const addItemToCart = (cartItems, cartItemToAdd) => {
  // Look for the item we want to add; is it already in the cart?
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

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  // Get the item in the cart that we want to remove
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  )

  // If it's the last item in the cart, remove it from the cart altogether
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

  // Otherwise subtract one from the item's quantity in the cart
  return cartItems.map(cartItem => 
    cartItem.id === cartItemToRemove.id ? 
    { ...cartItem, quantity: cartItem.quantity - 1 } : 
    cartItem
  )
}