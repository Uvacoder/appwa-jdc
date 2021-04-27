import React, { FC, useState } from 'react'
import { CheckoutInput, CheckoutStep } from '@components/checkout'
import useLogout from '@bigcommerce/storefront-data-hooks/use-logout'
import s from './CustomerStepView.module.css'
import { useUI } from '@lib/context/ui-context'
import { Button } from '@components/ui'
import { useCheckout } from '@lib/context/checkout-context'
import Customer from 'types/customer'

const CustomerStepView: FC = () => {
  const { customer, setCustomer, setGuestEmail } = useCheckout()
  const { setModalView, openModal } = useUI()
  const logout = useLogout()
  const { isGuest, data } = customer

  return (
    <CheckoutStep title="Customer" step={1} className={s.root}>
      {!customer.isGuest ? (
        <div>
          Checking out as{' '}
          <b>
            {data?.first_name} {data?.last_name}
          </b>
          <br />
          <span>
            Email: <b>{data?.email}</b>
          </span>
        </div>
      ) : (
        <form id="guestEmail" className={s.guestForm}>
          <CheckoutInput
            className="mr-2"
            identifier="email"
            label="Email"
            value={data?.email}
            type="text"
            onChange={(e) => setGuestEmail(e.target.value)}
          />

          <Button
            type="submit"
            variant="slim"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            <span className="whitespace-no-wrap">Continue as Guest</span>
          </Button>
        </form>
      )}

      <div className="mt-3">
        {customer ? (
          <span>
            Want to continue as guest?{' '}
            <button className="text-primary underline" onClick={() => logout()}>
              Log out
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{' '}
            <button
              className="text-primary underline"
              onClick={() => {
                setModalView('LOGIN_VIEW')
                openModal()
              }}
            >
              Sign in now
            </button>
          </span>
        )}
      </div>
    </CheckoutStep>
  )
}

export default CustomerStepView
