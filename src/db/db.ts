import { IProduct, products } from './data/products'
import { IVendingBank, vendingBank } from './data/vending-bank'

export interface IDatabase {
  products: IProduct[]
  vendingBank: IVendingBank
}

const db: IDatabase = {
  products,
  vendingBank,
}

export default db
