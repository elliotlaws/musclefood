import { IDatabase } from '../../db/db'

export const coinPriceMap: { [key: string]: number } = {
  Nickel: 1.2,
  Dime: 1,
  Quarter: 2,
  Penny: 0.5,
}

interface InsertCoinReturn {
  total: number
}

interface ReturnCoinsReturn {
  message: string
  coinReturn: string[]
}

export interface ICoinService {
  insertCoin: (coin: string) => Promise<InsertCoinReturn>
  returnCoins: () => Promise<ReturnCoinsReturn>
}

export class CoinService implements ICoinService {
  private db: IDatabase

  constructor(db: IDatabase) {
    this.db = db
  }

  public async insertCoin(coin: string) {
    if (coin === 'Penny') {
      return {
        total: this.db.vendingBank.total,
        coinReturn: coin,
      }
    }

    this.db.vendingBank.insertedCoins.push(coin)
    this.db.vendingBank.total += coinPriceMap[coin]

    return {
      total: this.db.vendingBank.total,
    }
  }

  public async returnCoins() {
    this.db.vendingBank.insertedCoins.forEach((c) => {
      this.db.vendingBank.total -= coinPriceMap[c]
    })

    const returnCoins = this.db.vendingBank.insertedCoins
    this.db.vendingBank.insertedCoins = []

    return {
      coinReturn: returnCoins,
      message: 'INSERT COIN',
    }
  }
}
