import React, { FC } from 'react'
import cn from 'classnames'
import { useGarage } from '@lib/context/garage-context'
import Link from 'next/link'
import { Avatar, GarageDropdown, ThemeToggle } from '@components/common'
import s from './UserNavSidebarView.module.css'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { UserNav } from '@components/common'
import { Button, ToggleSwitch } from '@components/ui'
import { Bag, Cross, Check, Heart } from '@components/icons'
import { useUI } from '@lib/context/ui-context'

interface Props {
  pages: any[] | undefined
}

const UserNavSidebarView: FC<Props> = ({ pages }) => {
  const { closeNavSidebar } = useUI()
  const { garage } = useGarage()

  const handleClose = () => closeNavSidebar()

  return (
    <div className={cn(s.root)}>
      <header className="px-4 pt-6 pb-0 sm:px-6">
        <div className="flex items-start justify-between space-x-3">
          <div className="h-7 flex items-center">
            <button
              onClick={handleClose}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150"
            >
              <Cross className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-grow overflow-scroll">
        <div className={s.section}>
          <h2>Customer</h2>
          <ul>
            <li className={s.item}>
              <Link href="/wishlist">
                <a>My Orders</a>
              </Link>
            </li>
            <li className={s.item}>
              <Link href="/cart">
                <a>My Profile</a>
              </Link>
            </li>
            <li className={s.item}>
              <Link href="/cart">
                <a>My Cart</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={s.section}>
          <h2>Garage</h2>
          <ul>
            {garage.map((car) => (
              <li className={s.item}>
                <Link href={'/search' + '?carId=26038'}>
                  <a>
                    {car.year} {car.make} {car.model}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.section}>
          <h2>Pages</h2>
          <ul>
            {pages?.map((page) => (
              <li className={s.item}>
                <Link href={page.url}>
                  <a>{page.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.section}>
          <h2>Categories</h2>
          <ul>
            {pages?.map((page) => (
              <li className={s.item}>
                <Link href={page.url}>
                  <a>{page.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={cn(s.section, 'bg-accents-1 z-50 mb-4 border-t')}>
        <ul>
          <li className={s.item}>
            <Link href="/">
              <a>Logout</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserNavSidebarView
