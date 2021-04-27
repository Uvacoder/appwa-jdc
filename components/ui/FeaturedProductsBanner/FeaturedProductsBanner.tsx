import React, { FC } from 'react'
import Container from '@components/ui/Container'
import s from './FeaturedProductsBanner.module.css'
import { BannerHeader } from '@components/common'
import usePrice from '@bigcommerce/storefront-data-hooks/use-price'
import Image from 'next/image'
import { getPriceDetails, getPriceDetailsForHook } from '@lib/price'
import Link from 'next/link'
import { formatMoney } from '@lib/accounting'
import { Price } from '@components/ui'
import { ProductCard } from '@components/product'
import cn from 'classnames'

interface CardProps {
  product: any
}

const FeaturedProductCard: FC<CardProps> = ({ product }) => {
  const { salePrice, basePrice } = getPriceDetails(product)

  return (
    <div className={s.productCard}>
      <Link href={`/product${product.path}`}>
        <a>
          <Image
            src={product.images.edges[0].node.urlOriginal}
            alt="test"
            width={200}
            height={180}
          />
          <div className={s.info}>
            <h3 className={s.title}>{product.name}</h3>
            <Price product={product} />
            <button
              className={s.addToCartBtn}
              onClick={() => console.log(product.name, 'added to cart')}
            >
              Add to Cart
            </button>
          </div>
        </a>
      </Link>
    </div>
  )
}

interface Props {
  products: any[]
}

const FeaturedProductsBanner: FC<Props> = ({ products }) => {
  let gridTemplateColumns = new Array(products.length).fill('200px').join(' ')

  return (
    <Container className={s.root} clean>
      <BannerHeader>Featured Products</BannerHeader>

      <div className={s.carouselContainer}>
        <div
          className={cn(s.carousel, `grid-cols-${products.length}`)}
          style={{ gridTemplateColumns }}
        >
          {products.map(({ node }) => (
            <ProductCard
              imgHeight={40}
              imgWidth={40}
              product={node}
              variation="vertical"
            />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default FeaturedProductsBanner
