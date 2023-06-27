import { Product } from '../models/product'
import { httpService } from './http.service'

export const productService = {
    getProducts
}

async function getProducts(filterBy: { txt: string }): Promise<Product[]> {
    return await httpService.get('product', filterBy)
}