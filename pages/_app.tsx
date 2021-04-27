import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import { FC } from 'react'
import type { AppProps } from 'next/app'

import { Head } from '@components/common'
import { ManagedUIContext } from '@lib/context/ui-context'
import { ManagedProfileContext } from '@lib/context/profile-context'
import { ManagedGarageContext } from '@lib/context/garage-context'
import { ManagedNotificationsContext } from '@lib/context/notifications-context'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <Head />
      <ManagedUIContext>
        <ManagedNotificationsContext>
          <ManagedGarageContext>
            <ManagedProfileContext>
              <Layout pageProps={pageProps}>
                <Component {...pageProps} />
              </Layout>
            </ManagedProfileContext>
          </ManagedGarageContext>
        </ManagedNotificationsContext>
      </ManagedUIContext>
    </>
  )
}
