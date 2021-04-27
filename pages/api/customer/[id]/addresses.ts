import { a } from '@lib/helpers'
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch, { Response } from 'node-fetch'

const createUrl = (id: string | string[]): string =>
  process.env.BIGCOMMERCE_STORE_API_URL +
  '/v3/customers?customer_id:in=' +
  a(id)

const headers = {
  'Content-Type': 'application/json',
  'X-Auth-Token': process.env.BIGCOMMERCE_STORE_API_TOKEN,
  'X-Auth-Client': process.env.BIGCOMMERCE_STORE_API_CLIENT_ID,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const response = await fetch(createUrl(id), {
        method: 'GET',
        headers,
      })
      const result = await response.json()
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
    }
  }
}
