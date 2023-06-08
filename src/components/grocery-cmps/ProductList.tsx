import React, { useEffect } from 'react';
import { ProductPreview } from './ProductPreview';
import { Product } from '../../models/product';

interface Props {
  position: {top: number, left: number}
  products: Product[] | null
  onChooseProduct: (title:string, imgUrl: string, barcode: string) => void
}

export const ProductList: React.FC<Props> = (props) => {
  const chooseProductHandler = (title: string, imgUrl: string, barcode: string) => {
    props.onChooseProduct(title, imgUrl, barcode)
  }
  const {top, left} = props.position
  return (
    <div style={{top: top + 36, left: left - 69}} className='product-list'>
      {props.products?.length !==0 && <h6>יש לבחור מוצר מן הרשימה</h6>}
      {props.products?.map((p: Product) => (
        <ProductPreview onChooseProduct={chooseProductHandler} key={Math.random()} product={p} />
      ))}
    </div>
  );
};
