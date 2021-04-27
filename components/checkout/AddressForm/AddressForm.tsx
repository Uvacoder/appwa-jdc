import React, { ChangeEvent, FC } from 'react'
import { CheckoutInput } from '@components/checkout'
import s from './AddressForm.module.css'
import { Address } from 'types/checkout'

interface Props {
  data: Address
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const AddressForm: FC<Props> = ({ data, onChange }) => {
  const {
    first_name,
    last_name,
    address1,
    address2,
    company,
    city,
    state_or_province,
    postal_code,
    phone,
  } = data
  return (
    <div className={s.root}>
      <div className="grid grid-cols-2">
        <CheckoutInput
          identifier="first_name"
          label="First name"
          type="text"
          value={first_name}
          onChange={onChange}
          className="mr-3"
          required
        />
        <CheckoutInput
          identifier="last_name"
          label="Last name"
          type="text"
          value={last_name}
          onChange={onChange}
          required
        />
      </div>
      <CheckoutInput
        identifier="address1"
        label="Address 1"
        type="text"
        value={address1}
        onChange={onChange}
        required
      />
      <CheckoutInput
        identifier="address2"
        label="Address 2 (optional)"
        type="text"
        value={address2}
        onChange={onChange}
      />
      <CheckoutInput
        identifier="company"
        label="Company (optional)"
        type="text"
        value={company}
        onChange={onChange}
      />
      <div className="grid grid-cols-3">
        <CheckoutInput
          identifier="city"
          label="City"
          type="text"
          value={city}
          onChange={onChange}
          className="col-span-2"
          required
        />
        <CheckoutInput
          identifier="state_or_province"
          label="State"
          type="text"
          value={state_or_province}
          onChange={onChange}
          className="col-span-1 col-start-3 ml-3"
          required
        />
      </div>
      <div className="grid grid-cols-3">
        <CheckoutInput
          identifier="postal_code"
          label="Zip (optional)"
          type="text"
          value={postal_code}
          onChange={onChange}
          className="col-span-1 mr-3"
          required
        />
        <CheckoutInput
          identifier="phone"
          label="Phone (optional)"
          type="tel"
          value={phone}
          onChange={onChange}
          className="col-start-2 col-span-2"
        />
      </div>
    </div>
  )
}

export default AddressForm
