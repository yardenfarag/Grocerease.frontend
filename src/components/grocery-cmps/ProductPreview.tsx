import React from 'react'
import { Product } from '../../models/product';

interface Props {
  product: Product
  onChooseProduct: (title:string, imgUrl: string, barcode: string) => void
}

export const ProductPreview: React.FC<Props> = (props) => {
  const { title, manufacturer, imgUrl, barcode } = props.product
  const chooseProductHandler = () => { 
    props.onChooseProduct(title, imgUrl, barcode)
  }
  return (
    <div onClick={chooseProductHandler} className='product-preview flex between'>
      <div className="product-info flex column">
        <p className='product-title'>{title}</p>
        <span className='product-manufacturer'>יצרן: {manufacturer}</span>
      </div>
      <img src={imgUrl}/>
    </div>
  )
}
