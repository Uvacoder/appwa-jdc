import React, { ChangeEvent, FC, useState } from 'react'
import { AddressForm, CheckoutInput, CheckoutStep } from '@components/checkout'
import s from './ShippingStepView.module.css'
import { useCheckout } from '@lib/context/checkout-context'

const ShippingStepView: FC = () => {
  const { shippingAddress, setShippingState } = useCheckout()

  return (
    <CheckoutStep title="Shipping" step={2} className={s.root}>
      <form id="shippingForm">
        <AddressForm data={shippingAddress} onChange={setShippingState} />
        <div>Shipping</div>
      </form>
    </CheckoutStep>
  )
}

export default ShippingStepView
