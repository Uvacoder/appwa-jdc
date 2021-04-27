import Customer from 'types/customer'

export const getCustomerById = async (entityId: number | string) => {
  const response = await fetch(`/api/customer/${entityId}`)
  const result = await response.json()
  return result
}

export const editCustomer = async (data: Customer) => {
  const response = await fetch(`/api/customer/${data.entityId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, id: data.entityId }),
  })
  const result = await response.json()
  return result
}

export const getAllOrdersByCustomerId = async (customerId: number | string) => {
  try {
    const response = await fetch(`/api/customer/${customerId}/orders`)
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getOrderById = async (
  customerId: number | string,
  orderId: number | string
) => {
  try {
    const response = await fetch(
      `/api/customer/${customerId}/orders/${orderId}`
    )
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getAllAddressesByCustomerId = async (
  entityId: number | string
) => {
  try {
    const response = await fetch(`/api/addresses/${entityId}`)
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}
