export const convertToMoney = (number: number) => {
  const amount = number / 100

  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
