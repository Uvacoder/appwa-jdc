import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'
import { NewsletterForm } from '@components/common'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const LEGAL_PAGES = [
  'Terms of Use',
  'Shipping Returns',
  'FAQs',
  'Privacy Policy',
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages, legalPages } = usePages(pages)
  const rootClassName = cn(className, s.root)

  return (
    <footer className={rootClassName}>
      <NewsletterForm />

      <Container noZ>
        <div className={s.upperFooter}>
          <div className={cn(s.column, s.logoGrid)}>
            <Link href="/">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <span className="rounded-full border border-gray-700 mr-2">
                  <Logo />
                </span>
                <span>ACME Business</span>
              </a>
            </Link>
            <div className={s.social}>
              <a
                aria-label="Github Repository"
                href="https://github.com/vercel/commerce"
                className={s.link}
              >
                <Github />
              </a>
              <a
                aria-label="Github Repository"
                href="https://github.com/vercel/commerce"
                className={s.link}
              >
                <Github />
              </a>
              <a
                aria-label="Github Repository"
                href="https://github.com/vercel/commerce"
                className={s.link}
              >
                <Github />
              </a>
              <a
                aria-label="Github Repository"
                href="https://github.com/vercel/commerce"
                className={s.link}
              >
                <Github />
              </a>
              <a
                aria-label="Github Repository"
                href="https://github.com/vercel/commerce"
                className={s.link}
              >
                <Github />
              </a>
              <a
                aria-label="Github Repository"
                href="https://github.com/vercel/commerce"
                className={s.link}
              >
                <Github />
              </a>
              <I18nWidget />
            </div>
          </div>
          <div className={s.column}>
            <h3 className={s.columnHeader}>Site Pages</h3>
            <ul className={s.menuList}>
              <li className={s.menuListItem}>
                <Link href="/">
                  <a className={s.menuLink}>Home</a>
                </Link>
              </li>
              <li className={s.menuListItem}>
                <Link href="/">
                  <a className={s.menuLink}>Careers</a>
                </Link>
              </li>
              <li className={s.menuListItem}>
                <Link href="/blog">
                  <a className={s.menuLink}>Blog</a>
                </Link>
              </li>
              {sitePages.map((page) => (
                <li key={page.url} className={s.menuListItem}>
                  <Link href={page.url!}>
                    <a className={s.menuLink}>{page.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.column}>
            <h3 className={s.columnHeader}>Legal</h3>
            <ul className={s.menuList}>
              {LEGAL_PAGES.map((page) => (
                <li key={page} className={s.menuListItem}>
                  <Link href={page}>
                    <a className={s.menuLink}>{page}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.column}>
            <ul className={s.menuList}>
              <h3 className={s.columnHeader}>Categories</h3>
              {LEGAL_PAGES.map((page) => (
                <li key={page} className={s.menuListItem}>
                  <Link href={page}>
                    <a className={s.menuLink}>{page}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={cn(s.column, 'whitespace-no-wrap')}>
            <h3 className={s.columnHeader}>Contact Us</h3>
            <address>
              1111 E Main St,
              <br />
              Chicago, IL 60644
            </address>
            <a href="tel:555-555-5555">Phone: (555) 555-5555</a>
            <br />
            <a href="mail:hello@world.com">Email: hello@world.com</a>
          </div>
        </div>
        <div className={s.lowerFooter}>
          <div>
            <span>
              &copy; {new Date().getFullYear()} ACME, Inc. All rights reserved.
            </span>
          </div>
          <div className="flex items-center text-primary">
            <span className="text-primary">Crafted by</span>
            <a
              href="https://vercel.com"
              aria-label="Vercel.com Link"
              target="_blank"
              className="text-primary"
            >
              <Vercel
                className="inline-block h-6 ml-4 text-primary"
                alt="Vercel.com Logo"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []
  const legalPages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)

      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return

      if (isLegalPage(slug, locale)) {
        legalPages.push(page)
      } else {
        sitePages.push(page)
      }
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
    legalPages: legalPages.sort(bySortOrder),
  }
}

const isLegalPage = (slug: string, locale?: string) =>
  locale
    ? LEGAL_PAGES.some((p) => `${locale}/${p}` === slug)
    : LEGAL_PAGES.includes(slug)

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
