import Customer from 'types/customer'

export interface Address {
  first_name: string
  last_name: string
  email: string
  company?: string
  address1: string
  address2?: string
  city: string
  state_or_province: string
  state_or_province_code: string
  country_code: string
  postal_code: string
  phone?: string
}

export interface CheckoutState {
  customer: Customer | {}
  shippingAddress: Address
  billingAddress: Address
  payment: {}
}
