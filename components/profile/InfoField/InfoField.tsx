import Link from 'next/link'
import React, { FC } from 'react'
import s from './InfoField.module.css'

interface Props {
  label: string
  data: any
  editText?: string
  href?: string
}

const InfoField: FC<Props> = ({ label, data, editText, href }) => {
  return (
    <div className={s.root}>
      <h2 className={s.label}>{label}</h2>
      <p className={s.content}>
        {data}{' '}
        {editText && href ? (
          <Link href={href}>
            <a>
              <span>{editText}</span>
            </a>
          </Link>
        ) : (
          <span></span>
        )}
      </p>
    </div>
  )
}

export default InfoField
