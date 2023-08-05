import React from 'react'
import { Product } from '../../models/product'
import styles from './ProductPreview.module.scss'

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
    <div onClick={chooseProductHandler} className={styles['product-preview']}>
      <div className={styles['product-info']}>
        <p className={styles['product-title']}>{product_name}</p>
        <span className={styles['product-manufacturer']}>יצרן: {manufacturer_name}</span>
      </div>
      <img className={styles.img} src={product_image} />
    </div>
  )
}
