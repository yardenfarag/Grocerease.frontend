import { Pagination } from '../models/pagination'
import { Gs1Product, Product } from '../models/product'
import { httpService } from './http.service'

export const productService = {
    getProducts,
    getProductByBarcode,
}


async function getProducts(filterBy: { txt: string }, page?: number): Promise<{pagination: Pagination, products: Product[]}> {
    return await httpService.get('product', {filterBy, page})
}

async function getProductByBarcode(barcode: string): Promise<Gs1Product> {
    return await httpService.get('product/' + barcode)
}

