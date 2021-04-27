import cn from 'classnames'
import React, { FC } from 'react'
import Image from 'next/image'
import s from './Container.module.css'

interface Props {
  className?: string
  children?: any
  el?: HTMLElement
  clean?: boolean
  addImgOverlay?: boolean
  // reversed?: boolean
  // contentMaxWidth?:
  //   | 'max-w-0'
  //   | 'max-w-none'
  //   | 'max-w-xm'
  //   | 'max-w-sm'
  //   | 'max-w-md'
  //   | 'max-w-lg'
  //   | 'max-w-xl'
  //   | 'max-w-2xl'
  //   | 'max-w-3xl'
  //   | 'max-w-4xl'
  //   | 'max-w-5xl'
  //   | 'max-w-6xl'
  //   | 'max-w-7xl'
  img?: {
    url: string
    alt: string
  }
  noZ?: boolean
}

const Container: FC<Props> = ({
  addImgOverlay,
  children,
  className,
  // reversed,
  // contentMaxWidth,
  el = 'div',
  clean,
  img,
  noZ,
}) => {
  const rootClassName = cn({
    [s.root]: !clean,
  })

  const contentClassname = cn('relative', { 'z-30': !noZ })

  let Component: React.ComponentType<
    React.HTMLAttributes<HTMLDivElement>
  > = el as any

  return (
    <Component className={rootClassName}>
      {img && (
        <>
          {addImgOverlay && <div className={s.overlay} />}
          <Image
            src={img.url}
            alt={img.alt}
            layout="fill"
            objectFit="cover"
            className={s.img}
          />
        </>
      )}
      <div className={cn(contentClassname, className)}>{children}</div>
    </Component>
  )
}

export default Container
