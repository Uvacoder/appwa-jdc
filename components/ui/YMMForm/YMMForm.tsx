import { FC, FormEvent, ChangeEvent, useState } from 'react'
import cn from 'classnames'
import { Container } from '@components/ui'
import { ChevronUp, RightArrow } from '@components/icons'
import s from './YMMForm.module.css'
import { Car, useGarage } from '@lib/context/garage-context'

interface SelectorProps {
  options: (string | number)[]
  label: string
  className?: string
  labelProps: {
    htmlFor: string
    value: string | number
  }
  selectProps: {
    id: string
    form: string
    name: string
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  }
}

const YMMSelector: FC<SelectorProps> = ({
  options,
  label,
  labelProps,
  selectProps,
  className,
}) => {
  console.log(options)
  return (
    <div className={cn(s.select, className)}>
      <select {...selectProps}>
        <option>{label}</option>
        {options.map((option: string | number, i: number) => (
          <option key={i}>{option.toString()}</option>
        ))}
      </select>
      <span>
        <ChevronUp />
      </span>
    </div>
  )
}

const defaultState: Car = {
  year: 0,
  make: '',
  model: '',
}

const YMMForm: FC = () => {
  const { addCar } = useGarage()
  const [carData, setCarData] = useState<Car>(defaultState)

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setCarData({ ...carData, [name]: value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addCar(carData)
    setCarData(defaultState)
  }

  return (
    <form id="carSelector" className={s.root} onSubmit={handleSubmit}>
      <div className={s.selectGroup}>
        <YMMSelector
          className={s.year}
          options={[2018, 2019, 2020]}
          label="Year"
          labelProps={{ htmlFor: 'csYear', value: carData.year }}
          selectProps={{
            id: 'csYear',
            form: 'carSelector',
            name: 'year',
            onChange: handleChange,
          }}
        />
        <YMMSelector
          className={s.make}
          options={['Tesla', 'Chevrolet', 'Ford']}
          label="Make"
          labelProps={{ htmlFor: 'csMake', value: carData.make }}
          selectProps={{
            id: 'csMake',
            form: 'carSelector',
            name: 'make',
            onChange: handleChange,
          }}
        />
        <YMMSelector
          className={s.model}
          options={['X', 'Corvette', 'Mustang']}
          label="Model"
          labelProps={{ htmlFor: 'csModel', value: carData.model }}
          selectProps={{
            id: 'csModel',
            form: 'carSelector',
            name: 'model',
            onChange: handleChange,
          }}
        />
      </div>

      <button className={s.submitBtn} type="submit">
        Add Car
      </button>
    </form>
  )
}

export default YMMForm
