import { useState, useEffect, useMemo } from 'react'

interface FilterState {}

export const useSearchFilter = (data: any) => {
  const oldData = useMemo(() => data, [])
  const newData = useMemo(() => data, [data])
}
