import usePrice from '@bigcommerce/storefront-data-hooks/use-price'
import Link from 'next/link'
import React, { FC } from 'react'
import s from './OrdersTableRow.module.css'

interface Props {
  data: any
}

const OrdersTableRow: FC<Props> = ({ data }) => {
  const {
    id,
    date_created,
    billing_address,
    total_inc_tax,
    items_total,
    status,
    currency_code,
  } = data

  const { price } = usePrice({
    amount: total_inc_tax,
    currencyCode: currency_code,
  })

  return (
    <tr className={s.root}>
      <td>{id}</td>
      <td>{date_created}</td>
      <td>
        {billing_address.first_name} {billing_address.last_name}
      </td>
      <td>{price}</td>
      <td>{items_total} items</td>
      <td>{status}</td>
      <td>
        <Link href={`/profile/orders/${data.id}`}>
          <a>View Order Details</a>
        </Link>
      </td>
    </tr>
  )
}

export default OrdersTableRow
