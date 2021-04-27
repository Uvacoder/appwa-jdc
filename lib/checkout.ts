import { Cart } from '@bigcommerce/storefront-data-hooks/api/cart'
import fetch from 'node-fetch'

export const createConsignment = async (cart: Cart) => {
  try {
    const response = await fetch(`/api/checkout/${cart.id}/consigment`, {
      method: 'POST',
      body: JSON.stringify(cart),
    })
    const result = await response.json()
    return result
  } catch (error) {}
}
