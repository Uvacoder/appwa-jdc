import React, { FC } from 'react'

export interface Car {
  make: string
  model: string
  year: number | string
}

interface State {
  garage: Car[]
}

interface ProviderValue extends State {
  addCar: (data: Car) => void
  addCarTemp: () => void
  removeCar: (index: number) => void
  clearGarage: () => void
}

const initialState: State = {
  garage: [{ make: 'Tesla', model: 'Model 3', year: 2020 }],
}

type Action =
  | {
      type: 'ADD_CAR'
      data: Car
    }
  | {
      type: 'REMOVE_CAR'
      data: { index: number }
    }
  | {
      type: 'CLEAR_GARAGE'
    }

const GarageContext = React.createContext<ProviderValue | undefined>(undefined)

GarageContext.displayName = 'GarageContext'

function garageReducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD_CAR': {
      return {
        ...state,
        garage: [...state.garage, action.data],
      }
    }
    case 'REMOVE_CAR': {
      // TODO edit state.garage and remove item by index
      const newArr = state.garage
      return {
        ...state,
        garage: newArr,
      }
    }
    case 'CLEAR_GARAGE': {
      return {
        ...state,
        garage: [],
      }
    }
    default: {
      return { ...state }
    }
  }
}

const GarageProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(garageReducer, initialState)

  const addCar = (data: Car) => dispatch({ type: 'ADD_CAR', data })
  const addCarTemp = () =>
    dispatch({
      type: 'ADD_CAR',
      data: { make: 'Hello', model: 'World', year: 2021 },
    })
  const removeCar = (index: number) =>
    dispatch({ type: 'REMOVE_CAR', data: { index } })
  const clearGarage = () => dispatch({ type: 'CLEAR_GARAGE' })

  const value = {
    ...state,
    addCar,
    removeCar,
    clearGarage,
    addCarTemp,
  }

  return <GarageContext.Provider value={value} {...props} />
}

// hook to access garage context
const useGarage = (): ProviderValue => {
  const context = React.useContext(GarageContext)
  if (context === undefined) {
    throw new Error(`useGarage must be used within a GarageProvider`)
  }
  return context
}

const ManagedGarageContext: FC = ({ children }) => (
  <GarageProvider>{children}</GarageProvider>
)

export { GarageContext, ManagedGarageContext, useGarage, GarageProvider }
