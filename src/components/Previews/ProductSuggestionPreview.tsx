import React from 'react'
import { Product } from '../../models/product'
import styles from './ProductSuggestionPreview.module.scss'

interface Props {
  product: Product
  onChooseProduct: (title: string, imgUrl: string, barcode: string) => void
  width: number
}

export const ProductSuggestionPreview: React.FC<Props> = (props) => {
  const { product_name, product_image, product_description, product_barcode, brand_name } = props.product
  const chooseProductHandler = () => {
    props.onChooseProduct(product_name, product_image, product_barcode)
  }
  return (
    <div onClick={chooseProductHandler} className={styles['product-preview']}>
      <img className={styles.img} src={product_image} />
      <div className={styles['product-info']}>
        <p style={{width: props.width - 90 + 'px'}} className={styles['product-title']} title={product_name}>{product_name}</p>
        <span className={styles['product-manufacturer']}>מותג: {brand_name}</span>
      </div>
    </div>
  )
}
