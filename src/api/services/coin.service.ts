import { IDatabase } from '../../db/db'
import { convertToMoney } from '../utils'

export const coinPriceMap: { [key: string]: number } = {
  Penny: 1,
  Nickel: 5,
  Dime: 10,
  Quarter: 25,
}

const acceptedCoins = ['Nickel', 'Dime', 'Quarter']

interface InsertCoinReturn {
  total: string
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
    if (!acceptedCoins.includes(coin)) {
      return {
        total: convertToMoney(this.db.vendingBank.total),
        coinReturn: coin,
      }
    }

    this.db.vendingBank.insertedCoins.push(coin)
    this.db.vendingBank.total += coinPriceMap[coin]

    return {
      total: convertToMoney(this.db.vendingBank.total),
    }
  }

  public async returnCoins() {
    this.db.vendingBank.total = 0
    const returnCoins = this.db.vendingBank.insertedCoins
    this.db.vendingBank.insertedCoins = []

    return {
      coinReturn: returnCoins,
      message: 'INSERT COIN',
    }
  }
}
