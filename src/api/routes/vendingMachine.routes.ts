import { Router } from 'express'
import { vendingMachineController } from '../controllers'

const router = Router()

router.post('/insert-coin', (req, res) =>
  vendingMachineController.insertCoin(req, res),
)
router.get('/check-status', (req, res) =>
  vendingMachineController.checkStatus(req, res),
)
router.get('/return-coins', (req, res) =>
  vendingMachineController.returnCoins(req, res),
)
router.get('/select-product/:productId', (req, res) =>
  vendingMachineController.selectProduct(req, res),
)

export default router
