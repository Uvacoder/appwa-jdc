import { useEditableForm } from '@lib/hooks'
import React, {
  ChangeEvent,
  createContext,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
} from 'react'
import s from './EditableForm.module.css'

export interface ContextValue {
  data: any
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
  toggleEditing: () => void
  isSubmitting: boolean
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  resetData: () => void
  handleSubmit: (e: FormEvent) => void
}

export const EditableContext = createContext<ContextValue | undefined>(
  undefined
)

interface Props {
  id: string
  title?: string
  initialData: any
  onSubmitFn: (e: FormEvent) => any | Promise<any>
  revalidate: () => Promise<boolean>
  className?: string
}

// ? to be used with <EditableField> components as children

const EditableForm: FC<Props> = ({
  id,
  title,
  initialData,
  onSubmitFn,
  revalidate,
  className,
  children,
}) => {
  const editable = useEditableForm(initialData, onSubmitFn, revalidate)
  const { isEditing, handleSubmit } = editable

  return (
    <EditableContext.Provider value={editable}>
      {isEditing ? (
        <form className={className} id={`${id}-form`} onSubmit={handleSubmit}>
          {title && <legend className={s.title}>{title}</legend>}
          {children}
        </form>
      ) : (
        <div className={className} id={id}>
          {title && <h1 className={s.title}>{title}</h1>}
          {children}
        </div>
      )}
    </EditableContext.Provider>
  )
}

export default EditableForm
