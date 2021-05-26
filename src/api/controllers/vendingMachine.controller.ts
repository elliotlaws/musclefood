import { Request, Response } from 'express'
import { ICoinService } from '../services/coin.service'
import { IProductService } from '../services/product.service'

export class VendingMachineController {
  private productService: IProductService
  private coinService: ICoinService

  constructor(productService: IProductService, coinService: ICoinService) {
    this.productService = productService
    this.coinService = coinService
  }

  public async checkStatus(req: Request, res: Response) {
    const result = await this.productService.checkStatus()
    return res.status(200).json(result)
  }

  public async insertCoin(req: Request, res: Response) {
    const { coin } = req.body
    if (!coin) return res.status(400).json('INSERT COIN')

    return res.status(200).json(await this.coinService.insertCoin(coin))
  }

  public async returnCoins(req: Request, res: Response) {
    const result = await this.coinService.returnCoins()
    return res.status(200).json(result)
  }

  public async selectProduct(req: Request, res: Response) {
    const productId = Number(req.params.productId)
    const result = await this.productService.selectProduct(productId)

    return res.status(200).json(result)
  }
}
