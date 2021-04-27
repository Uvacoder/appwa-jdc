// to be used alongside usePrice hook

export const getPriceDetails = (product: any) => ({
  salePrice: product.prices.salePrice?.value,
  basePrice: product.prices.price.value,
  currencyCode: product.prices.price.currencyCode,
})

export const getPriceDetailsForHook = (product: any) => {
  const { salePrice, basePrice, currencyCode } = getPriceDetails(product)
  return {
    amount: salePrice || basePrice,
    baseAmount: basePrice,
    currencyCode,
  }
}

export const getDiscountPercentage = (salePrice: number, basePrice: number) =>
  (100 * (basePrice - salePrice)) / basePrice
