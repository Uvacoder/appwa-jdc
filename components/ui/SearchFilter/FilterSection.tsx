import React, { FC, useState } from 'react'
import cn from 'classnames'
import s from './FilterSection.module.css'
import Link from 'next/link'
import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'
import { Checkbox } from '@components/ui'
import { NextRouter } from 'next/router'
import { ChevronUp } from '@components/icons'

interface Props {
  title: string
  titleHref: { pathname: string; query: string }
  items: any[] | any[]
  router: NextRouter
  activeCategory: any | undefined
  activeBrand: any | undefined
  isCategory?: boolean
  isBrand?: boolean
}

const FilterSection: FC<Props> = ({
  title,
  items,
  router,
  isCategory,
  isBrand,
}) => {
  const [expanded, setExpanded] = useState(true)
  const array = isCategory
    ? items
    : isBrand
    ? items.flatMap((item) => item.node)
    : items
  const { asPath } = router
  const { sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })
  const { category, brand } = useSearchMeta(asPath)

  return (
    <div className={cn(s.root, expanded ? 'h-auto ' : 'h-15')}>
      <button
        className={cn(
          s.sectionHeader,
          expanded ? 'border-accents-2' : 'border-accents-1'
        )}
        onClick={() => setExpanded(!expanded)}
      >
        <h3>{title}</h3>

        <ChevronUp
          className={cn('transform transition-transform duration-200', {
            'rotate-180': !expanded,
          })}
        />
      </button>
      <ul className={s.list}>
        {array.map((item) => (
          <li key={item.path} className={s.listItem}>
            <Checkbox
              className="float-left"
              label={item.name}
              handleCheck={(newValue) => console.log(newValue)}
            />
            <Link
              href={{
                pathname: isCategory
                  ? getCategoryPath(item.path, brand)
                  : isBrand
                  ? getDesignerPath(item.path, category)
                  : item.path,
                query,
              }}
            >
              <a className="w-full">
                {item.name} {item.productCount && `(${item.productCount})`}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterSection
