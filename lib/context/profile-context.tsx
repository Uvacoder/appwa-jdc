import React, { FC, useMemo } from 'react'

export interface Profile {
  entityId?: number
  firstName: string | undefined
  lastName: string | undefined
  email?: string
  company?: string
  customerGroupId?: string
  notes?: string
  phone?: string
  addressCount?: string
  attributeCount?: string
}

interface State {
  profile: Profile | undefined
}

interface ProviderValue extends State {
  setProfile: (data: Profile | undefined) => void
  editProfile: (data: Profile) => void
}

const initialState: State = {
  profile: {
    firstName: '',
    lastName: '',
  },
}

type Action =
  | {
      type: 'SET_PROFILE'
      data: Profile | undefined
    }
  | {
      type: 'EDIT_PROFILE'
      data: Profile
    }

export const ProfileContext = React.createContext<ProviderValue | undefined>(
  undefined
)

ProfileContext.displayName = 'ProfileContext'

function profileReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_PROFILE':
    case 'EDIT_PROFILE': {
      if (action.data === undefined) return { ...state }
      return {
        ...state,
        profile: {
          ...action.data,
        },
      }
    }
    default: {
      return { ...state }
    }
  }
}

export const ProfileProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(profileReducer, initialState)

  const setProfile = (data: Profile | undefined) =>
    dispatch({ type: 'SET_PROFILE', data: data || undefined })
  const editProfile = (data: Profile) =>
    dispatch({ type: 'EDIT_PROFILE', data })

  const value = useMemo(
    (): ProviderValue => ({
      ...state,
      setProfile,
      editProfile,
    }),
    [state]
  )

  return <ProfileContext.Provider value={value} {...props} />
}

// hook to access profile context
export const useProfile = (): ProviderValue => {
  const context = React.useContext(ProfileContext)
  if (context === undefined) {
    throw new Error(`useProfile must be used within a ProfileProvider`)
  }
  return context
}

export const ManagedProfileContext: FC = ({ children }) => (
  <ProfileProvider>{children}</ProfileProvider>
)
