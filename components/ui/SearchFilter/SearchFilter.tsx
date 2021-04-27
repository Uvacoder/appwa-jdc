import React, { FC } from 'react'
import cn from 'classnames'
import s from './SearchFilter.module.css'
import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'
import { useRouter } from 'next/router'
import FilterSection from './FilterSection'

interface Props {
  className: string
  categories: any[]
  brands: any[]
  activeCategory: any | undefined
  activeBrand: any | undefined
}

const SearchFilter: FC<Props> = ({
  className,
  categories,
  brands,
  activeCategory,
  activeBrand,
}) => {
  const router = useRouter()
  const { asPath } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })
  const { category, brand } = useSearchMeta(asPath)

  return (
    <div className={cn(s.root, className)}>
      <div className={s.header}>
        <h2>Filter</h2>
        {/* <button>Apply Filter</button> */}
      </div>

      <FilterSection
        router={router}
        title="All Categories"
        titleHref={{ pathname: getCategoryPath('', brand), query }}
        items={categories}
        activeBrand={activeBrand}
        activeCategory={activeCategory}
        isCategory
      />

      <FilterSection
        router={router}
        title="All Designers"
        titleHref={{ pathname: getDesignerPath('', category), query }}
        items={brands.flat()}
        activeBrand={activeBrand}
        activeCategory={activeCategory}
        isBrand
      />
    </div>
  )
}

export default SearchFilter
