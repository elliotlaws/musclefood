import { coinService, productService } from '../services'
import { VendingMachineController } from './vendingMachine.controller'

export const vendingMachineController = new VendingMachineController(
  productService,
  coinService,
)
