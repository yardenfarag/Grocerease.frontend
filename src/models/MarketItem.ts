export interface MarketItem {
    barcode: string
    title: string
    imgUrl: string
    quantity: number
    price: number
    discount?: number
    totalPrice: number
}