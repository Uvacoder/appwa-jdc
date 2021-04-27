import { LoadingDots } from '@components/ui'
import { getOrderById } from '@lib/customer'
import React, { FC, useEffect, useState } from 'react'
import { InfoField } from '..'
import s from './OrderInfoView.module.css'

interface Props {
  orderId: string
  customerId: string
}

const OrderInfoView: FC<Props> = ({ orderId, customerId }) => {
  const [order, setOrder] = useState<any | undefined>()

  const getOrderData = async () => {
    const data = await getOrderById(customerId, orderId)
    setOrder(data)
  }

  useEffect(() => {
    if (orderId && customerId) getOrderData()
  }, [orderId])
  return order ? (
    <div className={s.root}>
      <InfoField label="Total" data={order.total_inc_tax} />
      <InfoField label="Products" data={order.total_inc_tax} />
    </div>
  ) : (
    <LoadingDots />
  )
}

export default OrderInfoView
