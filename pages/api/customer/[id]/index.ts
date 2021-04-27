import { a } from '@lib/helpers'
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch, { Response } from 'node-fetch'

const createUrl = (id?: string | string[]) =>
  process.env.BIGCOMMERCE_STORE_API_URL +
  (id ? `/v3/customers?id:in=${a(id)}` : '/v3/customers')

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

  if (req.method === 'PUT') {
    try {
      const response = await fetch(createUrl(), {
        method: 'PUT',
        headers,
        body: JSON.stringify([req.body]),
      })
      const result = await response.json()
      res.status(200).send(result)
    } catch (error) {}
  }
}
