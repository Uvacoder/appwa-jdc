import React, { FC, useMemo } from 'react'
import { ThemeProvider } from 'next-themes'

export interface State {
  displayCartSidebar: boolean
  displayNavSidebar: boolean
  displayDropdown: boolean
  displayModal: boolean
  displayToast: boolean
  modalView: string
  toastText: string
  displayAnnouncementBar: boolean
}

interface ProviderValue extends State {
  openCartSidebar: () => void
  closeCartSidebar: () => void
  toggleCartSidebar: () => void
  closeCartSidebarIfPresent: () => void
  openNavSidebar: () => void
  closeNavSidebar: () => void
  toggleNavSidebar: () => void
  closeNavSidebarIfPresent: () => void
  openDropdown: () => void
  closeDropdown: () => void
  openModal: () => void
  closeModal: () => void
  setModalView: (view: MODAL_VIEWS) => void
  openToast: () => void
  closeToast: () => void
  closeAnnouncementBar: () => void
}

const initialState: State = {
  displayCartSidebar: false,
  displayNavSidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: 'LOGIN_VIEW',
  displayToast: false,
  toastText: '',
  displayAnnouncementBar: true,
}

type Action =
  | {
      type: 'OPEN_CART_SIDEBAR'
    }
  | {
      type: 'CLOSE_CART_SIDEBAR'
    }
  | {
      type: 'OPEN_NAV_SIDEBAR'
    }
  | {
      type: 'CLOSE_NAV_SIDEBAR'
    }
  | {
      type: 'OPEN_TOAST'
    }
  | {
      type: 'CLOSE_TOAST'
    }
  | {
      type: 'SET_TOAST_TEXT'
      text: ToastText
    }
  | {
      type: 'OPEN_DROPDOWN'
    }
  | {
      type: 'CLOSE_DROPDOWN'
    }
  | {
      type: 'OPEN_MODAL'
    }
  | {
      type: 'CLOSE_MODAL'
    }
  | {
      type: 'SET_MODAL_VIEW'
      view: MODAL_VIEWS
    }
  | {
      type: 'CLOSE_ANNOUNCEMENT_BAR'
    }

type MODAL_VIEWS = 'SIGNUP_VIEW' | 'LOGIN_VIEW' | 'FORGOT_VIEW'
type ToastText = string

export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_CART_SIDEBAR': {
      return {
        ...state,
        displayCartSidebar: true,
      }
    }
    case 'CLOSE_CART_SIDEBAR': {
      return {
        ...state,
        displayCartSidebar: false,
      }
    }
    case 'OPEN_NAV_SIDEBAR': {
      return {
        ...state,
        displayNavSidebar: true,
      }
    }
    case 'CLOSE_NAV_SIDEBAR': {
      return {
        ...state,
        displayNavSidebar: false,
      }
    }
    case 'OPEN_DROPDOWN': {
      return {
        ...state,
        displayDropdown: true,
      }
    }
    case 'CLOSE_DROPDOWN': {
      return {
        ...state,
        displayDropdown: false,
      }
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      }
    }
    case 'OPEN_TOAST': {
      return {
        ...state,
        displayToast: true,
      }
    }
    case 'CLOSE_TOAST': {
      return {
        ...state,
        displayToast: false,
      }
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      }
    }
    case 'SET_TOAST_TEXT': {
      return {
        ...state,
        toastText: action.text,
      }
    }
    case 'CLOSE_ANNOUNCEMENT_BAR': {
      return {
        ...state,
        displayAnnouncementBar: false,
      }
    }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  // cart sidebar
  const openCartSidebar = () => dispatch({ type: 'OPEN_CART_SIDEBAR' })
  const closeCartSidebar = () => dispatch({ type: 'CLOSE_CART_SIDEBAR' })
  const toggleCartSidebar = () =>
    state.displayCartSidebar
      ? dispatch({ type: 'CLOSE_CART_SIDEBAR' })
      : dispatch({ type: 'OPEN_CART_SIDEBAR' })
  const closeCartSidebarIfPresent = () =>
    state.displayCartSidebar && dispatch({ type: 'CLOSE_CART_SIDEBAR' })

  // nav sidebar
  const openNavSidebar = () => dispatch({ type: 'OPEN_NAV_SIDEBAR' })
  const closeNavSidebar = () => dispatch({ type: 'CLOSE_NAV_SIDEBAR' })
  const toggleNavSidebar = () =>
    state.displayNavSidebar
      ? dispatch({ type: 'CLOSE_NAV_SIDEBAR' })
      : dispatch({ type: 'OPEN_NAV_SIDEBAR' })
  const closeNavSidebarIfPresent = () =>
    state.displayNavSidebar && dispatch({ type: 'CLOSE_NAV_SIDEBAR' })

  const openDropdown = () => dispatch({ type: 'OPEN_DROPDOWN' })
  const closeDropdown = () => dispatch({ type: 'CLOSE_DROPDOWN' })

  const openModal = () => dispatch({ type: 'OPEN_MODAL' })
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' })

  const openToast = () => dispatch({ type: 'OPEN_TOAST' })
  const closeToast = () => dispatch({ type: 'CLOSE_TOAST' })

  const closeAnnouncementBar = () =>
    dispatch({ type: 'CLOSE_ANNOUNCEMENT_BAR' })

  const setModalView = (view: MODAL_VIEWS) =>
    dispatch({ type: 'SET_MODAL_VIEW', view })

  const value = useMemo(
    (): ProviderValue => ({
      ...state,
      openCartSidebar,
      closeCartSidebar,
      toggleCartSidebar,
      closeCartSidebarIfPresent,
      openNavSidebar,
      closeNavSidebar,
      toggleNavSidebar,
      closeNavSidebarIfPresent,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      openToast,
      closeToast,
      closeAnnouncementBar,
    }),
    [state]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = (): ProviderValue => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext: FC = ({ children }) => (
  <UIProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </UIProvider>
)
