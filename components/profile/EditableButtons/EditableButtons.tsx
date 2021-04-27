import React, { FC, useContext } from 'react'
import s from './EditableButtons.module.css'
import cn from 'classnames'
import { Button } from '@components/ui'
import { EditableContext } from '../EditableForm/EditableForm'

interface Props {
  editText?: string
  cancelText?: string
  submitText?: string
}

const EditableButtons: FC<Props> = ({ editText, cancelText, submitText }) => {
  const { isEditing, setIsEditing, isSubmitting } = useContext(EditableContext)
  return (
    <div className={cn(s.root, { 'justify-end': isEditing })}>
      {isEditing ? (
        <>
          <button className="p-2 mr-5" onClick={() => setIsEditing(false)}>
            {cancelText || 'Cancel'}
          </button>
          <Button variant="slim" type="submit" loading={isSubmitting}>
            {submitText || 'Save'}
          </Button>
        </>
      ) : (
        <Button variant="slim" onClick={() => setIsEditing(true)}>
          {editText || 'Edit'}
        </Button>
      )}
    </div>
  )
}

export default EditableButtons
