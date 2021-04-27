import React, { FC } from 'react'
import s from './BannerHeader.module.css'

interface Props {
  el?: HTMLHeadingElement
}

const BannerHeader: FC<Props> = ({ el = 'h2', children }) => {
  let Component: React.ComponentType<React.HTMLAttributes<
    HTMLDivElement
  >> = el as any

  return <Component className={s.root}>{children}</Component>
}

export default BannerHeader
