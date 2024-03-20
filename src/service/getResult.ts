import type { Product } from '../utils/types'
import { products as ListOfProduct } from '../mock/products.json'

export const getResult = async ({ queryParam }: { queryParam: string }): (Promise<{ result: Product[], categories: { [key: string]: number } }>) => {
  const query = queryParam === '' ? 0 : queryParam.toLowerCase()
  const products = await fetch(`http://localhost:3000/api/items?q=${query}`).then((res) => {
    if (!res.ok) {
      throw new Error('Error fetching data')
    }
    const result: Promise<Product[]> = res.json()
    return result
  })
    .catch(() => {
      console.error('Error fetching data to Bun server')
      return null
    })

  const categories: Record<string, number> = {}
  if (products) {
    products.forEach((item) => {
      if (categories[item.category]) {
        categories[item.category] += 1
        return
      }
      categories[item.category] = 1
    })
  }
  const result = products ?? ListOfProduct
  return { result, categories }
}

export const getItemById = ({ id }: { id: string }): Promise<Product> => {
  return fetch(`http://localhost:3000/api/item/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error fetching data')
      }
      return res.json()
    })
    .catch(() => {
      console.log('error fetching data')
    })
}
