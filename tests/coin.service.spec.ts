import { IVendingBank } from '../src/db/data/vending-bank'
import { IDatabase } from '../src/db/db'
import { products } from '../src/db/data/products'
import { CoinService } from '../src/api/services'
import { coinPriceMap } from '../src/api/services/coin.service'

describe('Coin service tests', () => {
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

  it('Insert coin - invalid coin - returns coin', async () => {
    const service = new CoinService(db)
    const coin = 'Penny'

    const result = await service.insertCoin(coin)

    expect(result).toEqual({
      total: 0,
      coinReturn: coin,
    })
  })

  it('Insert coin - valid coin - updates total', async () => {
    const service = new CoinService(db)
    const coin = 'Nickel'
    const coinValue = coinPriceMap[coin]

    const result = await service.insertCoin(coin)

    expect(result).toEqual({
      total: coinValue,
    })
  })

  it('Return coins - returns coins', async () => {
    const service = new CoinService(db)
    const coinReturn = db.vendingBank.insertedCoins

    const result = await service.returnCoins()

    expect(result).toEqual({
      message: 'INSERT COIN',
      coinReturn: coinReturn,
    })
  })
})
