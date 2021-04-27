import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import cn from 'classnames'
import throttle from 'lodash.throttle'
import type { Page } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import ClickOutside from '@lib/click-outside'

interface Props {
  pages: Page[]
}

const Navbar: FC<Props> = ({ pages }) => {
  const [displaySearch, setDisplaySearch] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  const toggleSearch = () => setDisplaySearch(!displaySearch)

  const handleScroll = () => {
    const offset = 0
    const { scrollTop } = document.documentElement
    const scrolled = scrollTop > offset
    setHasScrolled(scrolled)
  }

  useEffect(() => {
    document.addEventListener('scroll', throttle(handleScroll, 200))
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div className={cn(s.root, { 'shadow-magical': hasScrolled })}>
      <Container>
        <div className={s.contentWrapper}>
          <div className={s.logoContainer}>
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
                <h1 className={s.logoText}>ACME</h1>
              </a>
            </Link>
          </div>

          <div className="flex-1 justify-center hidden md:flex md:mx-8 max-w-2xl">
            <Searchbar />
          </div>

          <UserNav toggleSearch={toggleSearch} />
        </div>
      </Container>

      <ClickOutside active={displaySearch} onClick={toggleSearch}>
        <div
          className={cn(s.mobileSearchContainer, {
            'opacity-0': !displaySearch,
            'top-0': !displaySearch,
            'pointer-events-none': !displaySearch,
          })}
        >
          <Searchbar
            id="mobile-search"
            displaySearch={displaySearch}
            isMobile
          />
        </div>
      </ClickOutside>

      {/* <div className={s.navContainer}>
        <nav ref={navEl} className={cn(s.nav, 'hidden')}>
          <Link href="/search">
            <a className={s.link}>All Products</a>
          </Link>
          {pages.map((page) => (
            <Link href={page.url || page.name}>
              <a className={s.link}>{page.name}</a>
            </Link>
          ))}
        </nav>
      </div> */}
    </div>
  )
}

export default Navbar
