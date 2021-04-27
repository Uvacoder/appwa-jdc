import React, { FC } from 'react'
import s from './CartItemsTotal.module.css'

interface Props {
  line_items?: any[]
  total?: number
}

const CartItemsTotal: FC<Props> = ({ line_items, total }) => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div>
          <h2>2 Items</h2>
          <p>This item, and more...</p>
        </div>
        <div>
          <span>$35.14</span>
        </div>
      </div>
    </div>
  )
}

export default CartItemsTotal
