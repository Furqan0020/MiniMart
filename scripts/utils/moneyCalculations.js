export function productDiscount(price , discountPercentage){
  const discount = (price * discountPercentage)/100
  const discountPrice = price - discount
  return(
    Math.round(discountPrice).toFixed(2)
  )
}