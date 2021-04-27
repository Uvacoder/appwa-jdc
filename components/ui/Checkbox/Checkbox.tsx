import React, { FC, useCallback, useMemo, useState } from 'react'
import s from './Checkbox.module.css'
import cn from 'classnames'

interface Props {
  className?: string
  label: string
  defaultChecked?: boolean
  handleCheck: (newValue: boolean) => void
}

const Checkbox: FC<Props> = ({
  className,
  handleCheck,
  label,
  defaultChecked,
}) => {
  const [checked, setChecked] = useState(defaultChecked || false)
  const id = useMemo(() => label + '-filter', [label])
  const toggle = useCallback(
    (e) => {
      const { checked } = e.target
      setChecked(checked)
      handleCheck(checked)
    },
    [handleCheck]
  )

  return (
    <div
      className={cn(s.root, className, {
        'bg-brand-primary': checked,
        'border-brand-primary': checked,
      })}
    >
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={s.input}
        type="checkbox"
        checked={checked}
        onChange={toggle}
      />
      <div
        className={cn(s.checkmark, {
          'opacity-100': checked,
          'opacity-0': !checked,
        })}
      />
    </div>
  )
}

export default Checkbox
