import React, { ChangeEvent, FC } from 'react'
import cn from 'classnames'
import s from './CheckoutInput.module.css'

interface Props {
  identifier: string
  label?: string
  value: string | number
  type: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  className?: string
}

const CheckoutInput: FC<Props> = ({
  identifier,
  label,
  value,
  onChange,
  required,
  className,
}) => {
  return (
    <div className={cn(s.root, className && className)}>
      {label && (
        <label htmlFor={identifier} className="hidden">
          {label}
        </label>
      )}
      <input
        type="text"
        id={identifier}
        value={value}
        placeholder={label || ''}
        onChange={onChange}
        required={required || false}
      />
    </div>
  )
}

export default CheckoutInput
