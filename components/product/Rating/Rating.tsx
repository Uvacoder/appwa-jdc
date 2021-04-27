import StarEmpty from '@components/icons/StarEmpty'
import StarFilled from '@components/icons/StarFilled'
import StarHalf from '@components/icons/StarHalf'
import React, { FC, useState } from 'react'
import s from './Rating.module.css'

interface Props {
  rating: number
}

// TODO make rating dynamic
const Rating: FC<Props> = ({ rating }) => {
  const mapStars = () => {
    const roundedRating = Math.round(rating * 2)
    const filledStars = Math.floor(roundedRating / 2)
    const halfStars = roundedRating % 2
    const emptyStars = Math.floor((10 - roundedRating) / 2)

    let stars = new Array(5)
  }

  mapStars()

  return (
    <div className={s.root}>
      <div className={s.starContainer}>
        <StarFilled className={s.star} />
        <StarFilled className={s.star} />
        <StarFilled className={s.star} />
        <StarHalf className={s.star} />
        <StarEmpty className={s.star} />
        <a href="#reviews">427 reviews</a>
      </div>
      <a href="#reviews">Write a review</a>
    </div>
  )
}

export default Rating
