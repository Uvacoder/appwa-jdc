import { FC, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import s from './ProductView.module.css'
import { useUI } from '@lib/context/ui-context'
import { Swatch, ProductSlider, Rating, Reviews } from '@components/product'
import { Button, Container, Price } from '@components/ui'
import usePrice from '@bigcommerce/storefront-data-hooks/use-price'
import useAddItem from '@bigcommerce/storefront-data-hooks/cart/use-add-item'
import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-product'
import {
  getCurrentVariant,
  getProductOptions,
  SelectedOptions,
} from '../helpers'
import WishlistButton from '@components/wishlist/WishlistButton'
import { useNotifications } from '@lib/context/notifications-context'
import useCart from '@bigcommerce/storefront-data-hooks/cart/use-cart'

interface Props {
  className?: string
  children?: any
  product: ProductNode
}

const ProductView: FC<Props> = ({ product }) => {
  const addItem = useAddItem()
  const { data } = useCart()
  console.log(data)
  const { price } = usePrice({
    amount: product.prices?.price?.value,
    baseAmount: product.prices?.retailPrice?.value,
    currencyCode: product.prices?.price?.currencyCode!,
  })
  const { openCartSidebar } = useUI()
  const { handleNotification } = useNotifications()
  const options = getProductOptions(product)
  const [loading, setLoading] = useState(false)
  const [choices, setChoices] = useState<SelectedOptions>({
    size: null,
    color: null,
  })
  const variant =
    getCurrentVariant(product, choices) || product.variants.edges?.[0]

  // openCartSidebar()

  const addToCart = async () => {
    setLoading(true)
    try {
      console.log({ product })
      console.log('hi1')
      await addItem({
        productId: product.entityId,
        variantId: product.variants.edges?.[0]?.node.entityId!,
      })
      console.log('hi2')
      openCartSidebar()
      setLoading(false)
    } catch (err) {
      handleNotification({
        variant: 'FAIL',
        text: "Item couldn't be added to cart. Please try again.",
      })
      setLoading(false)
    }
  }

  return (
    <Container className="max-w-none w-full" clean>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images.edges?.[0]?.node.urlOriginal!,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />

      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.nameBox, 'lg:hidden')}>
          <h1 className={s.name}>{product.name}</h1>
          <Rating rating={3.5} />
          <Price product={product} className={s.price} />
        </div>

        <div className={cn(s.productDisplay, 'fit')}>
          <div className={s.sliderContainer}>
            <ProductSlider>
              {product.images.edges?.map(
                (image, i) =>
                  image && (
                    <div
                      key={image?.node.urlOriginal}
                      className={s.imageContainer}
                    >
                      <Image
                        className={s.img}
                        src={image?.node.urlOriginal!}
                        alt={image?.node.altText || 'Product Image'}
                        width={1050}
                        height={1050}
                        priority={i === 0}
                        quality="85"
                      />
                    </div>
                  )
              )}
            </ProductSlider>
          </div>
        </div>

        <div className={s.sidebar}>
          <section>
            <div className={cn(s.nameBox, 'hidden lg:block')}>
              <h1 className={s.name}>{product.name}</h1>
              <Rating rating={3.5} />
              <Price product={product} className={s.price} />
              <button onClick={() => openCartSidebar()}>click me</button>
            </div>

            {options?.map((opt: any) => (
              <div className="pb-3" key={opt.displayName}>
                <h2 className={s.sectionTitle}>{opt.displayName}</h2>
                <div className="flex flex-row flex-no-wrap w-auto">
                  {opt.values.map((v: any, i: number) => {
                    const active = (choices as any)[opt.displayName]

                    return (
                      <Swatch
                        key={`${v.entityId}-${i}`}
                        active={v.label === active}
                        variant={opt.displayName}
                        colors={v.hexColors ? v.hexColors : []}
                        label={v.label}
                        onClick={() => {
                          setChoices((choices) => {
                            return {
                              ...choices,
                              [opt.displayName]: v.label,
                            }
                          })
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            ))}

            <div>
              <Button
                aria-label="Add to Cart"
                type="button"
                className={s.button}
                onClick={addToCart}
                loading={loading}
                disabled={!variant}
              >
                Add to Cart
              </Button>
            </div>

            <div>
              <h2 className={s.sectionTitle}>Description</h2>
              <div
                className={s.description}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </section>
        </div>

        <Reviews />

        <div></div>

        <WishlistButton
          className={s.wishlistButton}
          productId={product.entityId}
          variant={product.variants.edges?.[0]!}
        />
      </div>
    </Container>
  )
}

export default ProductView
