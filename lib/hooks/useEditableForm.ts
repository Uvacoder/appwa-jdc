import { ContextValue } from '@components/profile/EditableForm/EditableForm'
import { useNotifications } from '@lib/context/notifications-context'
import { ChangeEvent, FormEvent, useState } from 'react'

export const useEditableForm = (
  initialData: any,
  submitFn: (data: any, e: FormEvent) => any | Promise<any>,
  revalidate: () => Promise<boolean>
): ContextValue => {
  const [data, setData] = useState(initialData || {})
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleNotification } = useNotifications()

  const toggleEditing = () => setIsEditing(!isEditing)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const obj = { [e.target.id]: e.target.value }
    setData((d) => ({ ...d, ...obj }))
  }

  const resetData = () => setData(initialData)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      await submitFn(data, e)
      await revalidate()
      setData(initialData)
      setIsSubmitting(false)
      setIsEditing(false)
      handleNotification({
        variant: 'SUCCESS',
        text: 'Account info successfully updated',
      })
    } catch (error) {
      handleNotification({
        variant: 'FAIL',
        text: 'Something went wrong',
      })
      console.log(error)
    }
  }

  return {
    data,
    isEditing,
    setIsEditing,
    toggleEditing,
    isSubmitting,
    handleInputChange,
    resetData,
    handleSubmit,
  }
}
