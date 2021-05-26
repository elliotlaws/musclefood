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
    price: 100,
    quantity: 10,
  },
  {
    id: 2,
    name: 'chips',
    price: 50,
    quantity: 5,
  },
  {
    id: 3,
    name: 'candy',
    price: 65,
    quantity: 15,
  },
]
