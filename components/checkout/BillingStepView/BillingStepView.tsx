import React, { ChangeEvent, FC, useState } from 'react'
import { AddressForm, CheckoutInput, CheckoutStep } from '@components/checkout'
import s from './BillingStepView.module.css'
import { useCheckout } from '@lib/context/checkout-context'

const BillingStepView: FC = () => {
  const {
    billingAddress,
    setShippingState,
    setBillingSameAsShipping,
  } = useCheckout()

  return (
    <CheckoutStep title="Billing" step={2} className={s.root}>
      <form id="billingForm">
        <input
          type="checkbox"
          checked={billingAddress.sameAsShipping}
          onChange={(e) => setBillingSameAsShipping(e.target.checked)}
        />
        <span>Use Same Address as Shipping</span>
        {!billingAddress.sameAsShipping && (
          <AddressForm data={billingAddress.data} onChange={setShippingState} />
        )}
      </form>
    </CheckoutStep>
  )
}

export default BillingStepView
