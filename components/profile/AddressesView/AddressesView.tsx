import React, { FC } from 'react'
import s from './AddressesView.module.css'

interface Props {
  customerId: string | number
}

const AddressesView: FC<Props> = ({ customerId }) => {
  return <div className={s.root}>Addresses for ID: {customerId}</div>
}

export default AddressesView
