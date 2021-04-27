import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import s from './EditableField.module.css'
import cn from 'classnames'
import { EditableContext } from '../EditableForm/EditableForm'

interface Props {
  label: string
  data: any
  emptyText?: string
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  disableEditable?: boolean
}

const EditableField: FC<Props> = ({
  label,
  data,
  emptyText,
  placeholder,
  onChange,
}) => {
  const { isEditing, toggleEditing, handleInputChange } = useContext(
    EditableContext
  )
  const [shouldFocus, setShouldFocus] = useState(false)
  const key = useMemo(() => Object.keys(data)[0], [])
  const value = useMemo(() => Object.values(data)[0], [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)
    if (onChange) onChange(e)
  }

  return isEditing ? (
    <div className={s.root}>
      <label className={s.label}>{label}</label>
      <input
        id={key}
        autoFocus={shouldFocus}
        className={cn(s.content, s.input)}
        type="text"
        placeholder={placeholder || ''}
        defaultValue={value.toString()}
        onChange={handleChange}
      />
    </div>
  ) : (
    <div className={s.root}>
      <h2 className={s.label}>{label}</h2>
      <p className={s.content}>
        {value || emptyText || 'empty'}{' '}
        {!data && (
          <span
            onClick={() => {
              setShouldFocus(true)
              toggleEditing()
            }}
          >
            add {label.toLowerCase()}
          </span>
        )}
      </p>
    </div>
  )
}

export default EditableField
