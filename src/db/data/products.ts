export interface IProduct {
  id: number
  name: string
  price: number
  quantity: number
}

export const products: IProduct[] = [
  {
    id: 1,
    name: 'cola',
    price: 1.0,
    quantity: 10,
  },
  {
    id: 2,
    name: 'chips',
    price: 0.5,
    quantity: 5,
  },
  {
    id: 3,
    name: 'candy',
    price: 0.65,
    quantity: 15,
  },
]
