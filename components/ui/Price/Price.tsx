import React, { FC } from 'react'
import s from './Price.module.css'
import cn from 'classnames'
import { getPriceDetails } from '@lib/price'
import { formatMoney } from '@lib/accounting'

interface Props {
  product: any
  className?: string
}

const Price: FC<Props> = ({ product, className }) => {
  const rootClassname = cn(className, s.root)
  const { salePrice, basePrice } = getPriceDetails(product)
  const formattedSalePrice = formatMoney(salePrice)
  const formattedBasePrice = formatMoney(basePrice)

  return (
    <span className={rootClassname}>
      {basePrice ? (
        salePrice ? (
          <>
            <span className={s.basePriceSale}>{formattedBasePrice}</span>{' '}
            <span className={s.mainPrice}>{formattedSalePrice}</span>
          </>
        ) : (
          <span className={s.mainPrice}>{formattedBasePrice}</span>
        )
      ) : (
        <>FREE</>
      )}
    </span>
  )
}

export default Price
