export interface IVendingBank {
  total: number
  pending: number
  insertedCoins: string[]
}

export const vendingBank: IVendingBank = {
  total: 0,
  pending: 0,
  insertedCoins: [],
}
