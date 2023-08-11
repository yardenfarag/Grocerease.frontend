import React from 'react'
import { ProductSuggestionPreview } from '../Previews/ProductSuggestionPreview'
import { Product } from '../../models/product'
import styles from './ProductSuggestions.module.scss'

interface Props {
  products: Product[] | null
  onChooseProduct: (title: string, imgUrl: string, barcode: string) => void
  top: number
  left: number
  width: number
}

export const ProductSuggestions: React.FC<Props> = (props) => {
  const chooseProductHandler = (title: string, imgUrl: string, barcode: string) => {
    props.onChooseProduct(title, imgUrl, barcode)
  }
  return (
    <div style={{top: props.top +24 + 'px', left: props.left + 'px', width: props.width + 'px'}} className={styles['product-list']}>
      {props.products?.length !== 0 && <h6 className={styles.h6}>יש לבחור מוצר מן הרשימה</h6>}
      {props.products?.map((p: Product) => (
        <ProductSuggestionPreview width={props.width} onChooseProduct={chooseProductHandler} key={p.product_barcode} product={p} />
      ))}
    </div>
  );
};
