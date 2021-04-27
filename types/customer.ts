export default interface Customer {
  email: string
  first_name: string
  last_name: string
  company: string
  phone: string
  registration_ip_address: string
  notes: string
  tax_exempt_category: string
  customer_group_id: number
  id: number
  entityId?: number
  date_modified: string
  date_created: string
  address_count: number
  attribute_count: number
  authentication: { force_password_reset: boolean }
  addresses: {
    first_name: string
    last_name: string
    company: string
    address1: string
    address2: string
    city: string
    state_or_province: string
    postal_code: string
    country_code: string
    phone: string
    address_type: string
    customer_id: number
    id: number
    country: string
    form_fields: any[]
  }[]
  attributes: {
    name: string
    type: string
    id: number
    date_modified: string
    date_created: string
  }[]
  form_fields: any[]
  store_credit_amounts: {
    amount: number
  }
  accepts_product_review_abandoned_cart_emails: boolean
  channel_ids: number[]
}
