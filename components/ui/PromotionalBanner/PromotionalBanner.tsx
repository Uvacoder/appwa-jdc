import { FC, MouseEvent } from 'react'
import s from './PromotionalBanner.module.css'
import cn from 'classnames'
import { Container } from '@components/ui'
import { allIsNullOrUndefined, isNullOrUndefined } from '@lib/value-check'
import Link from 'next/link'

interface Props {
  title?: string
  subtitle?: string
  paragraph?: string
  bgColor?: string
  textColor?: 'light' | 'dark'
  cta?: {
    text: string
    type: 'button' | 'link'
    url?: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  }
  img?: {
    url: string
    alt: string
  }
  addImgOverlay?: boolean
  reversed?: boolean
}

const PromotionalBanner: FC<Props> = ({
  title,
  subtitle,
  paragraph,
  cta,
  reversed,
  addImgOverlay,
  img,
  bgColor,
  textColor,
}) => {
  return (
    <Container
      className={cn(
        s.root,
        {
          'text-white': textColor === 'light',
          'text-black': textColor === 'dark',
        },
        bgColor
      )}
      addImgOverlay={addImgOverlay}
      img={img}
    >
      {!allIsNullOrUndefined([title, subtitle, paragraph, cta]) && (
        <div className={s.contentWrapper}>
          <div
            className={cn(
              s.contentContainer,
              reversed ? 'ml-auto items-end text-right' : 'mr-auto items-start'
            )}
          >
            {title && <h2 className={cn(s.title)}>{title}</h2>}
            {subtitle && <h3 className={cn(s.subtitle)}>{subtitle}</h3>}
            {paragraph && <p className={s.paragraph}>{paragraph}</p>}
            {!isNullOrUndefined(cta) &&
              (cta?.type === 'button' ? (
                <button className={s.callToAction} onClick={cta?.onClick}>
                  {cta?.text}
                </button>
              ) : (
                <Link href={cta?.url}>
                  <a className={s.callToAction}>Hello</a>
                </Link>
              ))}
          </div>
        </div>
      )}
    </Container>
  )
}

export default PromotionalBanner
