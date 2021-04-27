import React, { FC, useState } from 'react'
import s from './StepCounter.module.css'

const useCheckoutStep = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)

  const preventOverrage = (newStep: number): number => {
    if (newStep < 1 || newStep > 4) return currentStep
    return newStep
  }

  const incrementStepValue = () => currentStep + 1
  const decrementStepValue = () => currentStep - 1

  const nextStep = () => preventOverrage(incrementStepValue())
  const prevStep = () => preventOverrage(decrementStepValue())
  const setStep = (n: number) => preventOverrage(n)
}

const StepCounter: FC = () => {
  return (
    <div className={s.root}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default StepCounter
