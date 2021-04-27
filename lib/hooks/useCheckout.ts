import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Cart } from '@bigcommerce/storefront-data-hooks/api/cart'
import useCart from '@bigcommerce/storefront-data-hooks/cart/use-cart'
import { createConsignment } from '@lib/checkout'
import { Address, CheckoutState } from 'types/checkout'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'

export const defaultAddressState = {
  first_name: '',
  last_name: '',
  email: '',
  company: '',
  address1: '',
  address2: '',
  city: '',
  state_or_province: '',
  state_or_province_code: '',
  country_code: '',
  postal_code: '',
  phone: '',
}

const useCheckout = () => {
  const { data: cart } = useCart()
  const { data: customer } = useCustomer()
  const [step, setStep] = useState(1)
  const [state, setState] = useState<CheckoutState>({
    customer: customer || '',
    shippingAddress: defaultAddressState,
    billingAddress: defaultAddressState,
    payment: {},
  })

  useEffect(() => {
    if (customer) setState((s) => ({ ...s, customer }))
  }, [customer?.entityId])

  useEffect(() => {
    if (cart) {
      createConsignment(cart)
    }
  }, [cart?.id])

  const setGuestEmail = (e: string) => setState((s) => ({ ...s, customer: e }))
  const setShippingState = (e: ChangeEvent<HTMLInputElement>) =>
    setState((s) => ({
      ...s,
      shippingAddress: { ...s.shippingAddress, [e.target.id]: e.target.value },
    }))

  return { state, cart, customer, step, setGuestEmail, setShippingState }
}

export default useCheckout
