import React, { ChangeEvent, FC, useEffect, useMemo } from 'react'
import useCart from '@bigcommerce/storefront-data-hooks/cart/use-cart'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { Address } from 'types/checkout'
import Customer from 'types/customer'
import { createConsignment } from '@lib/checkout'

export const defaultAddressState: Address = {
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

interface State {
  customer: {
    isGuest: boolean
    email: string
    data: Customer | null
  }
  shippingAddress: Address
  billingAddress: {
    sameAsShipping: boolean
    data: Address
  }
  payment: any
  cart: any
  step: number
}

interface ProviderValue extends State {
  setGuestEmail: (s: string) => void
  setCustomer: (data: Customer) => void
  setShippingState: (e: ChangeEvent<HTMLInputElement>) => void
  setBillingSameAsShipping: (b: boolean) => void
  setBillingState: (e: ChangeEvent<HTMLInputElement>) => void
}

const initialState: State = {
  customer: { isGuest: true, data: null, email: '' },
  shippingAddress: defaultAddressState,
  billingAddress: { sameAsShipping: true, data: defaultAddressState },
  payment: {},
  cart: null,
  step: 1,
}

type Action =
  | {
      type: 'SET_CART'
      data: any
    }
  | {
      type: 'SET_GUEST_EMAIL'
      data: string
    }
  | {
      type: 'SET_LOGGED_IN_CUSTOMER'
      data: Customer
    }
  | {
      type: 'SET_SHIPPING_ADDRESS_FIELD'
      data: { id: string; value: string }
    }
  | { type: 'SET_BILLING_SAME_AS_SHIPPING_FALSE' }
  | { type: 'SET_BILLING_SAME_AS_SHIPPING_TRUE' }
  | {
      type: 'SET_BILLING_ADDRESS_FIELD'
      data: { id: string; value: string }
    }

export const CheckoutContext = React.createContext<ProviderValue | undefined>(
  undefined
)

CheckoutContext.displayName = 'CheckoutContext'

function checkoutReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_GUEST_EMAIL': {
      return {
        ...state,
        customer: {
          isGuest: true,
          data: null,
          email: action.data,
        },
      }
    }
    case 'SET_LOGGED_IN_CUSTOMER': {
      return {
        ...state,
        customer: {
          isGuest: false,
          data: action.data,
          email: action.data.email,
        },
      }
    }
    case 'SET_SHIPPING_ADDRESS_FIELD': {
      return {
        ...state,
        shippingAddress: {
          ...state.shippingAddress,
          [action.data.id]: action.data.value,
        },
      }
    }
    case 'SET_BILLING_SAME_AS_SHIPPING_FALSE': {
      return {
        ...state,
        billingAddress: {
          sameAsShipping: false,
          data: defaultAddressState,
        },
      }
    }
    case 'SET_BILLING_SAME_AS_SHIPPING_TRUE': {
      return {
        ...state,
        billingAddress: {
          sameAsShipping: true,
          data: state.shippingAddress,
        },
      }
    }
    case 'SET_BILLING_ADDRESS_FIELD': {
      return {
        ...state,
        billingAddress: {
          ...state.billingAddress,
          data: {
            ...state.billingAddress.data,
            [action.data.id]: action.data.value,
          },
        },
      }
    }
    default: {
      return { ...state }
    }
  }
}

export const CheckoutProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(checkoutReducer, initialState)
  const { data: cart } = useCart()
  const { data: customer } = useCustomer()

  const setGuestEmail = (s: string) =>
    dispatch({ type: 'SET_GUEST_EMAIL', data: s })
  const setCustomer = (data: Customer) =>
    dispatch({ type: 'SET_LOGGED_IN_CUSTOMER', data })
  const setShippingState = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_SHIPPING_ADDRESS_FIELD',
      data: { id: target.id, value: target.value },
    })
  }
  const setBillingSameAsShipping = (b: boolean) => {
    if (b) dispatch({ type: 'SET_BILLING_SAME_AS_SHIPPING_TRUE' })
    if (!b) dispatch({ type: 'SET_BILLING_SAME_AS_SHIPPING_FALSE' })
  }
  const setBillingState = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_BILLING_ADDRESS_FIELD',
      data: { id: target.id, value: target.value },
    })
  }

  // useEffect(() => {
  //   if (customer)
  //     dispatch({
  //       type: 'SET_LOGGED_IN_CUSTOMER',
  //       data: {
  //         ...customer,
  //         first_name: customer.firstName,
  //         last_name: customer.lastName,
  //       },
  //     })
  // }, [customer?.entityId])

  useEffect(() => {
    if (cart) {
      createConsignment(cart)
    }
  }, [cart?.id])

  const value = useMemo(
    (): ProviderValue => ({
      ...state,
      setGuestEmail,
      setCustomer,
      setShippingState,
      setBillingSameAsShipping,
      setBillingState,
    }),
    [state]
  )

  return <CheckoutContext.Provider value={value} {...props} />
}

// hook to access checkout context
export const useCheckout = (): ProviderValue => {
  const context = React.useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error(`useCheckout must be used within a CheckoutProvider`)
  }
  return context
}

export const ManagedCheckoutContext: FC = ({ children }) => (
  <CheckoutProvider>{children}</CheckoutProvider>
)
