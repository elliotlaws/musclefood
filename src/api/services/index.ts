import db from '../../db/db'
import { CoinService } from './coin.service'
import { ProductService } from './product.service'

export { ProductService } from './product.service'
export { CoinService } from './coin.service'

export const productService = new ProductService(db)
export const coinService = new CoinService(db)
