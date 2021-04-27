import { FC, ReactNode, useEffect, useState } from 'react'
import cn from 'classnames'
import s from './GarageDropdown.module.css'
import { Heart } from '@components/icons'
import ClickOutside from '@lib/click-outside'
import { useGarage } from '@lib/context/garage-context'

interface Props {
  className?: string
}

// use test data for now
const GarageDropdown: FC<Props> = ({ className }) => {
  const { garage, addCar, removeCar, clearGarage, addCarTemp } = useGarage()
  const [display, setDisplay] = useState(false)

  return (
    <div className={cn(s.root, className)}>
      <button
        className={s.iconBtn}
        onMouseDown={() => !display && setDisplay(true)}
        aria-label="toggle garage dropdown"
      >
        <Heart className={s.icon} />
      </button>

      {display && (
        <ClickOutside active={display} onClick={() => setDisplay(false)}>
          <div className={s.dropdown}>
            <h3 className={s.dropdownHeader}>Garage</h3>
            <ul className={s.carList}>
              {garage.length === 0 ? (
                <span>No vehicles added</span>
              ) : (
                garage.map((car, index) => (
                  <li key={index} className={s.car}>
                    <span>
                      {car.year} {car.make} {car.model}
                    </span>
                  </li>
                ))
              )}
            </ul>
            <div className={s.btnContainer}>
              <button
                className={s.addBtn}
                onClick={() => addCarTemp()}
                aria-label="add car to garage"
              >
                Add Car
              </button>
              <button
                className={s.clearGarageBtn}
                onClick={clearGarage}
                aria-label="remove all cars from garage"
              >
                Clear Garage
              </button>
            </div>
          </div>
        </ClickOutside>
      )}
    </div>
  )
}

export default GarageDropdown
