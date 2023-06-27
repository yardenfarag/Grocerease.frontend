import React from 'react';
import { ProductPreview } from './ProductPreview';
import { Product } from '../models/product';

interface Props {
  products: Product[] | null
  onChooseProduct: (title: string, imgUrl: string, barcode: string) => void
}

export const ProductSuggestions: React.FC<Props> = (props) => {
  const chooseProductHandler = (title: string, imgUrl: string, barcode: string) => {
    props.onChooseProduct(title, imgUrl, barcode)
  }
  return (
    <div className='product-list'>
      {props.products?.length !== 0 && <h6>יש לבחור מוצר מן הרשימה</h6>}
      {props.products?.map((p: Product) => (
        <ProductPreview onChooseProduct={chooseProductHandler} key={p.product_barcode} product={p} />
      ))}
    </div>
  );
};
