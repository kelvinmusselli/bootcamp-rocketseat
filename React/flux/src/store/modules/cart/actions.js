export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    // product,
    // n vai mais receber todo produto pq quem fará isso sera a middleware do redux-sagas
    id,
  };
}

export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}

export function updateAmount(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT',
    id,
    amount,
  };
}
