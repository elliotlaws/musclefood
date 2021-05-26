import { ProductService } from '../src/api/services/product.service'
import { IVendingBank } from '../src/db/data/vending-bank'
import { IDatabase } from '../src/db/db'
import { products } from '../src/db/data/products'

describe('Product service tests', () => {
  let vendingBank: IVendingBank
  let db: IDatabase

  beforeEach(() => {
    vendingBank = {
      total: 0,
      pending: 0,
      insertedCoins: [],
    }

    db = { products, vendingBank }
  })

  it('Status should show insert coin when total is 0', async () => {
    const service = new ProductService(db)

    const result = await service.checkStatus()

    expect(result).toEqual({
      message: 'INSERT COIN',
      total: vendingBank.total,
    })
  })

  it('Status should show insert coin when total is greater than 0', async () => {
    vendingBank.total = 5
    const service = new ProductService(db)

    const result = await service.checkStatus()

    expect(result).toEqual({
      message: 'CURRENT TOTAL',
      total: vendingBank.total,
    })
  })

  it('Select product - enough money - product dispensed and returns thank you', async () => {
    vendingBank.total = 1
    const service = new ProductService(db)
    const product = {
      id: 1,
      name: 'cola',
      price: 1.0,
      quantity: 10,
    }

    const result = await service.selectProduct(product.id)

    expect(result).toEqual({
      message: 'THANK YOU',
      dispensedProduct: product.name,
    })
  })

  it('Select product - not enough money - display price and price of product', async () => {
    vendingBank.total = 0.5
    const service = new ProductService(db)
    const product = {
      id: 1,
      name: 'cola',
      price: 1.0,
      quantity: 10,
    }

    const result = await service.selectProduct(product.id)

    expect(result).toEqual({
      message: `PRICE ${product.price}`,
    })
  })

  it('Select product - remaining total - returns change', async () => {
    vendingBank.total = 2
    const product = {
      id: 1,
      name: 'cola',
      price: 1.0,
      quantity: 10,
    }
    const service = new ProductService(db)
    const change = vendingBank.total - product.price

    const result = await service.selectProduct(product.id)

    expect(result).toEqual({
      message: 'THANK YOU',
      dispensedProduct: product.name,
      coinReturn: change,
    })
  })

  it('Select product - product quantity 0 - returns sold out', async () => {
    const product = {
      id: 1,
      name: 'cola',
      price: 1.0,
      quantity: 0,
    }
    db.products = [product]
    const service = new ProductService(db)

    const result = await service.selectProduct(product.id)

    expect(result).toEqual({
      message: `SOLD OUT`,
    })
  })
})
