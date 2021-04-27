import { FC, useRef, useEffect } from 'react'
import Portal from '@reach/portal'
import s from './Modal.module.css'
import { Cross } from '@components/icons'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import ClickOutside from '@lib/click-outside'

interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
}

const Modal: FC<Props> = ({ children, open, onClose }) => {
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
          <ClickOutside active={open} onClick={onClose}>
            <div className={s.modal}>
              <div className="h-7 flex absolute top-5 right-5 items-center justify-end w-full">
                <button
                  onClick={() => onClose()}
                  aria-label="Close panel"
                  className="hover:text-gray-500 transition ease-in-out duration-150 focus:outline-none"
                >
                  <Cross className="h-7 w-7" />
                </button>
              </div>
              {children}
            </div>
          </ClickOutside>
        </div>
      ) : null}
    </Portal>
  )
}

export default Modal
