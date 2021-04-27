import Link from '@components/ui/Link'
import React, { FC, useMemo } from 'react'
import s from './ProfileMenu.module.css'
import cn from 'classnames'
import useLogout from '@bigcommerce/storefront-data-hooks/use-logout'

interface Props {
  className?: string
}

const ProfileMenu: FC<Props> = ({ className }) => {
  const logout = useLogout()

  return (
    <ul className={cn(s.root, className)}>
      <li className={s.item}>
        <Link href="/profile/account">
          <a className={s.link}>Account</a>
        </Link>
      </li>
      <li className={s.item}>
        <Link href="/profile/orders">
          <a className={s.link}>Orders</a>
        </Link>
      </li>
      <li className={s.item}>
        <Link href="/profile/pre-orders">
          <a className={s.link}>Pre-orders</a>
        </Link>
      </li>
      <li className={s.item}>
        <Link href="/profile/addresses">
          <a className={s.link}>Addresses</a>
        </Link>
      </li>
      <li className={s.item}>
        <Link href="/profile/reviews">
          <a className={s.link}>Reviews</a>
        </Link>
      </li>
      <li className={s.item}>
        <button className={s.link} onClick={logout}>
          Log out
        </button>
      </li>
    </ul>
  )
}

export default ProfileMenu
