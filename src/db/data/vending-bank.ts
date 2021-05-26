export interface IVendingBank {
  total: number
  insertedCoins: string[]
}

export const vendingBank: IVendingBank = {
  total: 0,
  insertedCoins: [],
}
