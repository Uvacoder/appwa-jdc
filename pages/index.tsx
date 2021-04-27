import rangeMap from '@lib/range-map'
import { Layout } from '@components/common'
import { Hero, CategoryBanner, FeaturedProductsBanner } from '@components/ui'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllProducts from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'
import getSiteInfo from '@bigcommerce/storefront-data-hooks/api/operations/get-site-info'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import PromotionalBanner from '@components/ui/PromotionalBanner'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  // Get Featured Products
  const { products: featuredProducts } = await getAllProducts({
    variables: { field: 'featuredProducts', first: 6 },
    config,
    preview,
  })

  // Get Best Selling Products
  const { products: bestSellingProducts } = await getAllProducts({
    variables: { field: 'bestSellingProducts', first: 6 },
    config,
    preview,
  })

  // Get Best Newest Products
  const { products: newestProducts } = await getAllProducts({
    variables: { field: 'newestProducts', first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  // These are the products that are going to be displayed in the landing.
  // We prefer to do the computation at buildtime/servertime
  const { featured, bestSelling } = (() => {
    // Create a copy of products that we can mutate
    const products = [...newestProducts]
    // If the lists of featured and best selling products don't have enough
    // products, then fill them with products from the products list, this
    // is useful for new commerce sites that don't have a lot of products
    return {
      featured: rangeMap(6, (i) => featuredProducts[i] ?? products.shift())
        .filter(nonNullable)
        .sort((a, b) => a.node.prices.price.value - b.node.prices.price.value)
        .reverse(),
      bestSelling: rangeMap(
        6,
        (i) => bestSellingProducts[i] ?? products.shift()
      ).filter(nonNullable),
    }
  })()

  return {
    props: {
      featured,
      bestSelling,
      newestProducts,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

const nonNullable = (v: any) => v

export default function Home({
  featured,
  bestSelling,
  brands,
  categories,
  newestProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Hero
        headline="Release Details: The Yeezy BOOST 350 V2 ‘Natural'"
        description="
        The Yeezy BOOST 350 V2 lineup continues to grow. We recently had the
        ‘Carbon’ iteration, and now release details have been locked in for
        this ‘Natural’ joint. Revealed by Yeezy Mafia earlier this year, the
        shoe was originally called ‘Abez’, which translated to ‘Tin’ in
        Hebrew. It’s now undergone a name change, and will be referred to as
        ‘Natural’."
      />

      <CategoryBanner categories={categories} brands={brands} />

      <FeaturedProductsBanner products={featured} />

      <PromotionalBanner
        title="Really Cool Product"
        subtitle="It'll change your life!"
        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis nulla et aliquam dictum. Phasellus ac venenatis turpis"
        img={{
          url: '/images/white-car.jpg',
          alt: 'white car door',
        }}
        cta={{
          text: 'Log something cool',
          type: 'button',
          onClick: () => console.log('something cool'),
        }}
        textColor="light"
        addImgOverlay
      />

      <PromotionalBanner
        title="Really Cool Product"
        subtitle="It'll change your life!"
        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis nulla et aliquam dictum. Phasellus ac venenatis turpis"
        cta={{
          text: 'See Blog',
          type: 'link',
          url: '/blog',
        }}
        img={{
          url: '/images/car-interior.jpg',
          alt: 'cool car image',
        }}
        textColor="light"
        addImgOverlay
        reversed
      />

      {/* <HomeAllProductsGrid
        categories={categories}
        brands={brands}
        newestProducts={newestProducts}
      /> */}
    </>
  )
}

Home.Layout = Layout
