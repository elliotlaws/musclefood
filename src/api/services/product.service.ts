import { IProduct } from '../../db/data/products'
import { IDatabase } from '../../db/db'

interface SelectProductReturn {
  message: string
  dispensedProduct?: string
  coinReturn?: number
}

interface CheckStatusReturn {
  message: string
  total: number
}

export interface IProductService {
  selectProduct: (productId: number) => Promise<SelectProductReturn>
  checkStatus: () => Promise<CheckStatusReturn>
}

export class ProductService implements IProductService {
  private db: IDatabase

  constructor(db: IDatabase) {
    this.db = db
  }

  private getProduct(productId: number) {
    const productIndex = this.db.products.findIndex((p) => p.id === productId)

    return { product: this.db.products[productIndex], productIndex }
  }

  public async checkStatus() {
    const message =
      this.db.vendingBank.total === 0 ? 'INSERT COIN' : 'CURRENT TOTAL'

    return { message, total: this.db.vendingBank.total }
  }

  public async selectProduct(productId: number) {
    const { product, productIndex } = this.getProduct(productId)
    let result: SelectProductReturn = { message: '' }

    if (product.quantity === 0) {
      return { message: 'SOLD OUT' }
    }

    if (this.db.vendingBank.total >= product.price) {
      this.db.vendingBank.total -= product.price
      this.db.products[productIndex].quantity -= 1

      result = {
        message: 'THANK YOU',
        dispensedProduct: product.name,
      }

      this.db.vendingBank.total > 0 &&
        (result = { ...result, coinReturn: this.db.vendingBank.total })
    } else {
      result = {
        message: `PRICE ${product.price}`,
      }
    }

    return result
  }
}
