import React, { FC, useState } from 'react'
import cn from 'classnames'
import s from './Accordion.module.css'
import { ChevronUp } from '@components/icons'

interface Props {
  title: string
  className?: string
  isExpandedByDefault?: boolean
  height: 'sm' | 'md' | 'lg'
}

const Accordion: FC<Props> = ({
  title,
  className,
  isExpandedByDefault,
  height,
  children,
}) => {
  const [expanded, setExpanded] = useState(isExpandedByDefault || false)

  return (
    <div
      className={cn(s.root, className && className, {
        'h-auto': expanded,
        'h-15': height === 'lg' || !height,
        'h-12': height === 'md',
        'h-8': height === 'sm',
      })}
    >
      <button
        className={cn(
          s.sectionHeader,
          expanded ? 'border-accents-2' : 'border-accents-1'
        )}
        onClick={() => setExpanded(!expanded)}
      >
        <h3>{title}</h3>

        <ChevronUp
          className={cn('transform transition-transform duration-200', {
            'rotate-180': !expanded,
          })}
        />
      </button>
      <div className={s.childrenArea}>{children}</div>
    </div>
  )
}

export default Accordion
