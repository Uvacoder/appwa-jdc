import cn from 'classnames'
import { FC, useState, useMemo, useRef, useEffect } from 'react'
import { getRandomPairOfColors } from '@lib/colors'
import s from './Avatar.module.css'

interface Props {
  // tailwind height / width. e.g. "h-8 w-8"
  twhw?: string
  disableHover?: boolean
  children?: any
}

const Avatar: FC<Props> = ({ twhw, disableHover, children }) => {
  const [bg] = useState(useMemo(() => getRandomPairOfColors, []))
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.backgroundImage = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`
    }
  }, [bg])

  return (
    <div
      ref={ref}
      className={cn(s.root, twhw ? twhw : 'h-8 w-8', !disableHover && s.hover)}
    >
      {children ? children : null}
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  )
}

export default Avatar
