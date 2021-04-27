import { ToggleSwitch } from '@components/ui'
import React, { FC } from 'react'
import s from './ThemeToggle.module.css'
import { useTheme } from 'next-themes'

const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className={s.root}>
      <ToggleSwitch
        fn={(checked) => (!checked ? setTheme('dark') : setTheme('light'))}
        defaultValue={theme === 'light'}
      />
    </div>
  )
}

export default ThemeToggle
