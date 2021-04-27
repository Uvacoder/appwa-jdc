import type { GetStaticPathsContext, GetStaticPropsContext } from 'next'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { Avatar, Layout } from '@components/common'
import { Accordion, Container, LoadingDots } from '@components/ui'
import { useRouter } from 'next/router'
import {
  AccountView,
  AddressesView,
  OrderInfoView,
  OrdersView,
  ProfileContent,
  ProfileMenu,
} from '@components/profile'
import { missingLocaleInPages } from '@lib/usage-warns'
import getSlug from '@lib/get-slug'
import React, { useEffect } from 'react'
import { a, capitalize } from '@lib/helpers'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { pages },
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const pages = ['account', 'orders', 'pre-orders', 'addresses', 'reviews']
  const [invalidPaths, log] = missingLocaleInPages()
  const paths = pages
    .map((page) => page)
    .filter((url) => {
      if (!url || !locales) return url
      // If there are locales, only include the pages that include one of the available locales
      if (locales.includes(getSlug(url).split('/')[0])) return url

      invalidPaths.push(url)
    })
  log()

  return {
    paths,
    fallback: true,
  }
}

export default function Page() {
  const router = useRouter()
  const { page } = router.query

  const { data: customer, revalidate } = useCustomer()

  useEffect(() => {
    if (customer === null) router.push('/')
  }, [customer])

  return (
    <Container className="relative grid grid-cols-12 md:gap-4 md:pt-6 lg:gap-6 xl:gap-8 max-w-8xl">
      <div className="flex flex-col items-center col-span-full md:col-span-3 lg:col-start-1 lg:col-span-3 xl:col-span-3 xl:col-start-2 ">
        {customer ? (
          <>
            <Avatar twhw="h-24 w-24" disableHover />
            <h1 className="font-bold text-2xl">
              {customer.firstName} {customer.lastName}
            </h1>
            <span className="text-sm text-center">
              Customer since:{' '}
              <span className="whitespace-no-wrap">Feb. 22nd, 2021</span>
            </span>
            <Accordion
              title={capitalize(a(page))}
              className="w-full mt-3 px-0 md:hidden"
              height="lg"
            >
              <ProfileMenu />
            </Accordion>
            <div className="hidden md:block mt-4 bg-accents-1 w-full rounded-lg p-3 lg:p-5">
              <ProfileMenu />
            </div>
          </>
        ) : (
          <LoadingDots />
        )}
      </div>
      <ProfileContent
        title={capitalize(a(page))}
        className="col-span-full md:col-span-9 xl:col-span-7"
      >
        {customer ? (
          <>
            {a(page) === 'account' && (
              <AccountView customer={customer} revalidate={revalidate} />
            )}
            {a(page) === 'orders' &&
              (page.length === 1 ? (
                <OrdersView customerId={customer.entityId} />
              ) : (
                <OrderInfoView orderId={page[1]} customerId={page[0]} />
              ))}

            {a(page) === 'addresses' && (
              <AddressesView customerId={customer.entityId} />
            )}
          </>
        ) : (
          <LoadingDots />
        )}
      </ProfileContent>
    </Container>
  )
}

Page.Layout = Layout
