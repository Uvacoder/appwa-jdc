import React from 'react'
import { Layout } from '@components/common'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import useCheckout from '@lib/hooks/useCheckout'
import CartItemsTotal from '@components/checkout/CartItemsTotal'
import { ManagedCheckoutContext } from '@lib/context/checkout-context'
import {
  BillingStepView,
  CustomerStepView,
  ShippingStepView,
} from '@components/checkout'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })

  return {
    props: {
      pages,
    },
    revalidate: 14400,
  }
}

export default function Checkout({
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <ManagedCheckoutContext>
      <div className="w-screen p-3">
        <h1 className="text-2xl">Checkout</h1>
        <div className="relative">
          <CustomerStepView />
          <ShippingStepView />
          <BillingStepView />
          {/* <PaymentStepView /> */}
        </div>
        <div>{/* <Cart /> */}</div>
      </div>
      <CartItemsTotal />
    </ManagedCheckoutContext>
  )
}

Checkout.Layout = Layout
