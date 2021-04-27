import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import type { FC } from 'react'
import s from './ProductCard.module.css'
import WishlistButton from '@components/wishlist/WishlistButton'

import usePrice from '@bigcommerce/storefront-data-hooks/use-price'
import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'
import { getPriceDetails } from '@lib/price'
import { Price } from '@components/ui'

interface Props {
  className?: string
  product: ProductNode
  imgWidth: number | string
  imgHeight: number | string
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  imgPriority?: boolean
  imgLoading?: 'eager' | 'lazy'
  imgSizes?: string
  size?: 'sm' | 'lg'
  variation?: 'horizontal' | 'vertical' | 'responsive'
}

const ProductCard: FC<Props> = ({
  className,
  product: p,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
  variation,
}) => {
  const src = p.images.edges?.[0]?.node?.urlOriginal!
  // const { salePrice, basePrice } = getPriceDetails(p)
  // const { price } = usePrice({
  //   amount: p.prices?.price?.value,
  //   baseAmount: p.prices?.retailPrice?.value,
  //   currencyCode: p.prices?.price?.currencyCode!,
  // })

  return (
    <Link href={`/product${p.path}`}>
      <a className={cn(s.root, className)}>
        <div
          className={cn(s.cardContent, {
            [s.horizontal]: variation === 'horizontal',
            [s.vertical]: variation === 'vertical',
            [s.responsive]: variation === 'responsive',
          })}
        >
          <WishlistButton
            className={s.wishlistButton}
            productId={p.entityId}
            variant={p.variants.edges?.[0]!}
          />
          <div className={s.imageContainer}>
            {src && (
              <Image
                quality="85"
                src={src}
                alt={p.name}
                width={imgWidth}
                sizes={imgSizes}
                height={imgHeight}
                layout={imgLayout}
                loading={imgLoading}
                priority={imgPriority}
              />
            )}
          </div>
          <div className={s.infoContainer}>
            <div className="sm:flex-grow sm:h-full sm:flex sm:justify-between sm:flex-col">
              <div className={s.productTitle}>
                <h3>{p.name}</h3>
              </div>
              <Price product={p} className={s.productPrice} />
            </div>
            <button className={s.cartButton}>Buy Now</button>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductCard
