import React, { FC } from 'react'

type NOTIFICATION_VARIANT = 'SUCCESS' | 'WARN' | 'FAIL' | 'GENERAL'
type NotificationText = string

export interface Notification {
  variant: NOTIFICATION_VARIANT
  text: NotificationText
}

export interface HandleNotificationParam extends Notification {
  duration?: number
}

interface State {
  displayNotification: boolean
  notification: Notification | null
}

interface ProviderValue extends State {
  openNotification: (v: NOTIFICATION_VARIANT, t: NotificationText) => void
  clearNotification: () => void
  handleNotification: (o: HandleNotificationParam) => void
}

const initialState: State = {
  displayNotification: false,
  notification: null,
}

type Action =
  | {
      type: 'OPEN_NOTIFICATION'
      variant: NOTIFICATION_VARIANT
      text: NotificationText
    }
  | {
      type: 'CLOSE_NOTIFICATION'
    }

const NotificationsContext = React.createContext<ProviderValue | undefined>(
  undefined
)

NotificationsContext.displayName = 'NotificationsContext'

function notificationReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_NOTIFICATION': {
      return {
        ...state,
        displayNotification: true,
        notification: { variant: action.variant, text: action.text },
      }
    }
    case 'CLOSE_NOTIFICATION': {
      return {
        ...state,
        displayNotification: false,
        notification: null,
      }
    }
    default: {
      return { ...state }
    }
  }
}

const NotificationsProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(notificationReducer, initialState)

  const openNotification = (
    variant: NOTIFICATION_VARIANT,
    text: NotificationText
  ) => dispatch({ type: 'OPEN_NOTIFICATION', variant, text })
  const clearNotification = () => dispatch({ type: 'CLOSE_NOTIFICATION' })

  const handleNotification = ({
    variant,
    text,
    duration,
  }: HandleNotificationParam) => {
    openNotification(variant, text)
    setTimeout(clearNotification, duration || 4400)
  }

  const value: ProviderValue = {
    ...state,
    openNotification,
    clearNotification,
    handleNotification,
  }

  return <NotificationsContext.Provider value={value} {...props} />
}

// hook to access notification context
const useNotifications = (): ProviderValue => {
  const context = React.useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error(
      `useNotifications must be used within a NotificationsProvider`
    )
  }
  return context
}

const ManagedNotificationsContext: FC = ({ children }) => (
  <NotificationsProvider>{children}</NotificationsProvider>
)

export {
  NotificationsContext,
  ManagedNotificationsContext,
  useNotifications,
  NotificationsProvider,
}
