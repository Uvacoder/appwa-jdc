import { getAllOrdersByCustomerId } from '@lib/customer'
import React, { FC, useEffect, useState } from 'react'
import { OrdersTableTow } from '..'
import s from './OrdersView.module.css'

const columnTitles = [
  'Order #',
  'Date Ordered',
  'Shipped to',
  'Order Total',
  'Items',
  'Status',
  'View',
]

interface Props {
  customerId: number | string
}

const OrdersView: FC<Props> = ({ customerId }) => {
  const [orders, setOrders] = useState([])
  const fetchOrders = async () => {
    const res = await getAllOrdersByCustomerId(customerId)
    setOrders(res)
  }

  useEffect(() => {
    if (customerId) fetchOrders()
  }, [customerId])

  return (
    <div className={s.root}>
      <table className={s.table}>
        <thead>
          <tr className={s.topRow}>
            {columnTitles.map((c) => (
              <th>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrdersTableTow data={order} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersView
