import React, { FC } from 'react'
import s from './CheckoutStep.module.css'
import cn from 'classnames'

interface Props {
  title: string
  step: number
  className?: string
}

const CheckoutStep: FC<Props> = ({ title, step, className, children }) => {
  return (
    <div className={cn(s.root, className && className)}>
      <h2 className={s.sectionTitle}>
        <span className={s.stepNum}>{step}</span>
        {title}
      </h2>
      <div>{children}</div>
    </div>
  )
}

export default CheckoutStep
