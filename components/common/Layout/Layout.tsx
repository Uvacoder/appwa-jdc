import cn from 'classnames'
import dynamic from 'next/dynamic'
import s from './Layout.module.css'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { useUI } from '@lib/context/ui-context'
import {
  Navbar,
  Footer,
  AnnouncementBar,
  UserNavSidebarView,
} from '@components/common'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import {
  Sidebar,
  Button,
  Modal,
  LoadingDots,
  Notification,
} from '@components/ui'
import { CartSidebarView } from '@components/cart'

import { CommerceProvider } from '@bigcommerce/storefront-data-hooks'
import type { Page } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: () => <Loading />,
}

const LoginView = dynamic(
  () => import('@components/auth/LoginView'),
  dynamicProps
)
const SignUpView = dynamic(
  () => import('@components/auth/SignUpView'),
  dynamicProps
)
const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  dynamicProps
)
const FeatureBar = dynamic(
  () => import('@components/common/FeatureBar'),
  dynamicProps
)

interface Props {
  pageProps: {
    pages?: Page[]
  }
}

const Layout: FC<Props> = ({ children, pageProps }) => {
  const {
    displayCartSidebar,
    displayModal,
    closeCartSidebar,
    closeModal,
    modalView,
    displayAnnouncementBar,
    closeAnnouncementBar,
    displayNavSidebar,
    closeNavSidebar,
  } = useUI()
  const { data } = useCustomer()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = 'en-US' } = useRouter()

  React.useEffect(() => {
    if (data !== undefined) {
      // setProfile({ firstName: data?.firstName, lastName: data?.lastName })
    }
  }, [data])

  return (
    <CommerceProvider locale={locale}>
      <div className={cn(s.root)}>
        <AnnouncementBar
          text="This is just some announcment text!!!"
          hide={!displayAnnouncementBar}
          action={closeAnnouncementBar}
        />

        <Navbar pages={pageProps.pages} />

        <main className="fit">{children}</main>

        <Footer pages={pageProps.pages} />

        <Sidebar
          open={displayCartSidebar}
          onClose={closeCartSidebar}
          alignment="right"
        >
          <CartSidebarView />
        </Sidebar>

        <Sidebar
          open={displayNavSidebar}
          onClose={closeNavSidebar}
          alignment="left"
        >
          <UserNavSidebarView pages={pageProps.pages} />
        </Sidebar>

        <Modal open={displayModal} onClose={closeModal}>
          {modalView === 'LOGIN_VIEW' && <LoginView />}
          {modalView === 'SIGNUP_VIEW' && <SignUpView />}
          {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
        </Modal>

        <Notification />

        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={acceptedCookies}
          action={
            <Button className="mx-5" onClick={() => onAcceptCookies()}>
              Accept cookies
            </Button>
          }
        />
      </div>
    </CommerceProvider>
  )
}

export default Layout
