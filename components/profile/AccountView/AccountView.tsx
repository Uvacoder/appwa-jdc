import React, { FC, useCallback } from 'react'
import {
  EditableField,
  EditableForm,
  EditableButtons,
} from '@components/profile'
import s from './AccountView.module.css'
import { Customer, editCustomer, getCustomerById } from '@lib/customer'
import { LoadingDots } from '@components/ui'
import { useUI } from '@lib/context/ui-context'

interface Props {
  customer: any
  revalidate: () => Promise<boolean>
}

const AccountView: FC<Props> = ({ customer, revalidate }) => {
  const handleSubmit = useCallback(async (updatedData) => {
    const { data } = await editCustomer(updatedData)
    return data[0]
  }, [])

  if (customer) {
    const {
      firstName: first_name, // change field name for BC API compliance
      lastName: last_name, // change field name for BC API compliance
      email,
      phone,
      company,
    } = customer

    return (
      <EditableForm
        id="profile"
        className={s.root}
        initialData={customer}
        onSubmitFn={handleSubmit}
        revalidate={revalidate}
      >
        <div className={s.column}>
          <EditableField
            label="First Name"
            data={{ first_name }}
            placeholder=""
          />
          <EditableField
            label="Last Name"
            data={{ last_name }}
            placeholder=""
          />
          <EditableField label="Email" data={{ email }} placeholder="" />
        </div>
        <div className={s.column}>
          <EditableField
            label="Phone"
            data={{ phone }}
            placeholder="No phone"
          />
          <EditableField
            label="Company"
            data={{ company }}
            placeholder="Your company"
            emptyText="No company"
          />
          {/* <InfoField
            label="Address Count"
            data={`${address_count} addresses`}
            editText="View/edit addresses"
            href="/profile/addresses"
          /> */}
        </div>

        <EditableButtons />
      </EditableForm>
    )
  } else {
    return <LoadingDots />
  }
}

export default AccountView
