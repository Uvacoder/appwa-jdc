import { FC } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import useCart from '@bigcommerce/storefront-data-hooks/cart/use-cart'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { Heart, Bag, MagnifyingGlass, Hamburger } from '@components/icons'
import { useUI } from '@lib/context/ui-context'
import DropdownMenu from './DropdownMenu'
import s from './UserNav.module.css'
import { Avatar, ThemeToggle } from '@components/common'
import GarageDropdown from '../GarageDropdown'
import { useGarage } from '@lib/context/garage-context'

interface Props {
  className?: string
  toggleSearch?: () => void
}

const countItem = (count: number, item: any) => count + item.quantity
const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count)

const UserNav: FC<Props> = ({ className, toggleSearch }) => {
  const { data: cart } = useCart()
  const { data: customer } = useCustomer()

  const {
    toggleCartSidebar,
    closeCartSidebarIfPresent,
    openModal,
    openNavSidebar,
  } = useUI()
  const { garage } = useGarage()
  const cartItemsCount = Object.values(cart?.line_items ?? {}).reduce(
    countItems,
    0
  )

  return (
    <nav className={cn(s.root, className)}>
      <div>
        <ul className={s.list}>
          <li className={s.item}>
            <ThemeToggle />
          </li>
          <li
            className={cn(s.item, 'md:hidden')}
            onClick={() => toggleSearch()}
          >
            <MagnifyingGlass className="h-6 w-6" />
          </li>
          <li className={cn(s.item)} onClick={toggleCartSidebar}>
            <Bag />
            {cartItemsCount > 0 && (
              <span className={s.bagCount}>{cartItemsCount}</span>
            )}
          </li>
          <li className={cn(s.item, s.mobileHide)}>
            <Link href="/wishlist">
              <a onClick={closeCartSidebarIfPresent} aria-label="Wishlist">
                <Heart />
              </a>
            </Link>
          </li>
          <li className={cn(s.item, s.mobileHide)}>
            <GarageDropdown />
            {garage.length > 0 && (
              <span className={s.bagCount}>{garage.length}</span>
            )}
          </li>
          <li className={cn(s.item, s.menuBtn)}>
            <button onClick={openNavSidebar}>
              <Hamburger className="text-accents-7" />
            </button>
          </li>
          <li className={cn(s.item, s.mobileHide)}>
            {customer ? (
              <DropdownMenu />
            ) : (
              <button
                className={s.avatarButton}
                aria-label="Menu"
                onClick={() => openModal()}
              >
                <Avatar />
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default UserNav
