// @ts-ignore
import { FC, useState } from 'react'
import Link from 'next/link'
import { Button, Container } from '@components/ui'
import cn from 'classnames'
import s from './CategoryBanner.module.css'
import { BannerHeader } from '@components/common'

interface ItemProps {
  name: string
  path: string
}

const Item: FC<ItemProps> = ({ name, path }) => {
  return (
    <div className={s.item}>
      <Link href={path}>
        <a>
          <div className="h-full w-full flex justify-center items-center">
            {name}
          </div>
        </a>
      </Link>
    </div>
  )
}

interface CategoryGridProps {
  items: unknown[]
  display: boolean
}

const CategoryGrid: FC<CategoryGridProps> = ({ display, items }) => {
  const arr = display
    ? items.map(({ name, path }) => ({ name, path: `/search${path}` }))
    : items.map(({ node }) => ({ name: node.name, path: node.path }))

  return (
    <div className={s.grid}>
      {arr.map(({ name, path }, i) => (
        <Item key={i} name={name} path={path} />
      ))}
    </div>
  )
}

interface CategoryBannerProps {
  categories: any
  brands: any
}

const CategoryBanner: FC<CategoryBannerProps> = ({ categories, brands }) => {
  const [gridDisplay, setGridDisplay] = useState(true)

  return (
    <Container className={s.root}>
      <BannerHeader>Shop by {gridDisplay ? 'Category' : 'Brand'}</BannerHeader>

      <div>
        <div className={s.btnContainer}>
          <button
            className={cn(
              s.button,
              // gridDisplay && s.buttonActive,
              'rounded-l-lg'
            )}
            onClick={() => {
              setGridDisplay(true)
            }}
          >
            Category
          </button>
          <button
            className={cn(
              s.button,
              // !gridDisplay && s.buttonActive,
              'rounded-r-lg'
            )}
            onClick={() => {
              setGridDisplay(false)
            }}
          >
            Brand
          </button>
        </div>

        <div className="h-1 w-1/3 bg-brand-primary" />
      </div>

      <CategoryGrid
        display={gridDisplay}
        items={gridDisplay ? categories : brands}
      />
    </Container>
  )
}

export default CategoryBanner
