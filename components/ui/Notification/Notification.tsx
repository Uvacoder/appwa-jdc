import { useUI } from '@lib/context/ui-context'
import Portal from '@reach/portal'
import React, { FC } from 'react'
import cn from 'classnames'
import s from './Notification.module.css'
import { useNotifications } from '@lib/context/notifications-context'

const Notification: FC = () => {
  const { notification, displayNotification } = useNotifications()

  return (
    <Portal>
      {displayNotification ? (
        <div className={s.root}>
          <div
            className={cn(s.container, {
              [s.success]: notification.variant === 'SUCCESS',
              [s.fail]: notification.variant === 'FAIL',
              [s.warn]: notification.variant === 'WARN',
              [s.general]: notification.variant === 'GENERAL',
            })}
          >
            <p>{notification.text}</p>
          </div>
        </div>
      ) : null}
    </Portal>
  )
}

export default Notification
