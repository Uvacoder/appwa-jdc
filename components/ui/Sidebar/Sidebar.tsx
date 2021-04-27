import s from './Sidebar.module.css'
import Portal from '@reach/portal'
import { FC, useEffect, useRef } from 'react'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import cn from 'classnames'

interface Props {
  children: any
  open: boolean
  onClose: () => void
  alignment: 'left' | 'right'
}

const Sidebar: FC<Props> = ({ children, open = false, onClose, alignment }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [open])

  return (
    <Portal>
      {open ? (
        <div className={s.root} ref={ref}>
          <div className={s.wrapper}>
            <div className={s.overlay} onClick={onClose} />
            <section
              className={cn(s.section, {
                [s.left]: alignment === 'left',
                [s.right]: alignment === 'right',
              })}
            >
              <div className={s.outerContainer}>
                <div className={s.innerContainer}>{children}</div>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </Portal>
  )
}

export default Sidebar
