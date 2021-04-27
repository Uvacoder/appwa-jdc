// Fallback to CMS Data

export const defatultPageProps = {
  header: {
    links: [
      {
        link: {
          title: 'New Arrivals',
          url: '/',
        },
      },
    ],
  },
}

export const defaultApiHeaders = {
  'Content-Type': 'application/json',
  'X-Auth-Token': process.env.BIGCOMMERCE_STORE_API_TOKEN,
  'X-Auth-Client': process.env.BIGCOMMERCE_STORE_API_CLIENT_ID,
}
