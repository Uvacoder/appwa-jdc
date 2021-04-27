import React, { FC, useCallback, useState } from 'react'
import s from './ToggleSwitch.module.css'
import cn from 'classnames'
import { Heart, Moon, Sun } from '@components/icons'

interface Props {
  fn: (checked: boolean) => void
  defaultValue?: boolean
}

const ToggleSwitch: FC<Props> = ({ fn, defaultValue }) => {
  const [checked, setChecked] = useState(defaultValue || true)

  const handleToggle = useCallback(
    (value: boolean) => {
      setChecked(value)
      fn(value)
    },
    [fn, defaultValue]
  )

  return (
    <div className={s.root}>
      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleA"
            type="checkbox"
            className="hidden"
            checked={checked}
            onChange={(e) => handleToggle(e.target.checked)}
          />
          <div className={s.toggle__line}></div>
          <div
            className={cn(s.toggle__dot, {
              [s.checked]: !checked,
            })}
          >
            <Sun
              className={cn(s.icon, 'text-yellow-300', {
                'opacity-0': !checked,
              })}
            />
            <Moon
              className={cn(s.icon, 'text-indigo-500', {
                'opacity-0': checked,
              })}
            />
          </div>
        </div>
      </label>
    </div>
  )
}

export default ToggleSwitch

// ?? Develop toggle switch for dark mode
// ?? Add background, background-color transition time in global css
// ?? Add toggle switch to user nav and sidebar
