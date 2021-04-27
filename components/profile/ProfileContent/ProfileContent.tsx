import React, { FC } from 'react'
import s from './ProfileContent.module.css'
import cn from 'classnames'

interface Props {
  title?: string
  className?: string
}

const ProfileContent: FC<Props> = ({ title, className, children }) => {
  return (
    <div className={cn(s.root, className)}>
      {title && <h1 className={s.title}>{title}</h1>}
      {children}
    </div>
  )
}

export default ProfileContent
