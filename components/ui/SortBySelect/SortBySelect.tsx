import React, { FC, useState, useCallback, ChangeEvent } from 'react'
import { SearchProductsData } from '@bigcommerce/storefront-data-hooks/api/catalog/products'
import s from './SortBySelect.module.css'
import { ChevronUp } from '@components/icons'
import { useRouter } from 'next/router'
import { filterQuery, useSearchMeta } from '@lib/search'

interface Props {
  data: SearchProductsData | undefined
}

const SORT = Object.entries({
  'latest-desc': 'Latest arrivals',
  'trending-desc': 'Trending',
  'price-asc': 'Price: Low to high',
  'prillce-desc': 'Price: High to low',
})

const SortBySelect: FC<Props> = ({ data }) => {
  const [filter, setFilter] = useState<string>('')
  const router = useRouter()
  const { asPath } = router
  const { q } = router.query
  const { pathname } = useSearchMeta(asPath)

  const handleSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    // push new url
    router.push({ pathname, query: filterQuery({ q, sort: e.target.value }) })
  }, [])

  return (
    <div className={s.root}>
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-2">Sort By: </span>
          <div className={s.selectContainer}>
            <select className={s.select} onChange={handleSelect}>
              <option value="">Relevance</option>
              {SORT.map(([key, text]) => (
                <option key={key} value={key}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <ChevronUp className={s.arrow} />
        </div>
      </div>
    </div>
  )
}

export default SortBySelect
