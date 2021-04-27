import cn from 'classnames'
import { FC } from 'react'
import s from './Swatch.module.css'
import { Check } from '@components/icons'
import Button, { ButtonProps } from '@components/ui/Button'
import { createCssGradientString, isDark } from '@lib/colors'

interface Props {
  active?: boolean
  children?: any
  className?: string
  label?: string
  variant?: 'size' | 'color' | string
  colors?: string[]
}

const Swatch: FC<Props & ButtonProps> = ({
  className,
  colors = [],
  label,
  variant = 'size',
  active,
  ...props
}) => {
  variant = variant?.toLowerCase()
  label = label?.toLowerCase()
  const rootClassName = cn(
    s.root,
    {
      [s.active]: active,
      [s.size]: variant === 'size',
      [s.color]: variant === 'color',
      [s.dark]: colors ? isDark(colors[0]) : false,
    },
    className
  )

  if (variant === 'color' && colors.length === 0) return null

  return (
    <Button
      className={rootClassName}
      style={variant === 'color' ? createCssGradientString(colors) : {}}
      aria-label="Variant Swatch"
      {...props}
    >
      {variant === 'color' && active && (
        <span>
          <Check />
        </span>
      )}
      {variant === 'size' ? label : null}
    </Button>
  )
}

export default Swatch
