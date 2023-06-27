import React from 'react'
import { Product } from '../models/product';

interface Props {
  product: Product
  onChooseProduct: (title: string, imgUrl: string, barcode: string) => void
}

export const ProductPreview: React.FC<Props> = (props) => {
  const { product_name, product_image, product_description, product_barcode, manufacturer_name } = props.product
  const chooseProductHandler = () => {
    props.onChooseProduct(product_name, product_image, product_barcode)
  }
  return (
    <div onClick={chooseProductHandler} className='product-preview flex between'>
      <div className="product-info flex column">
        <p className='product-title'>{product_name}</p>
        <span className='product-manufacturer'>יצרן: {manufacturer_name}</span>
      </div>
      <img src={product_image} />
    </div>
  )
}
