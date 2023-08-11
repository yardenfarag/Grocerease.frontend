import React, { useState } from 'react'
import { Product } from '../../models/product'
import styles from './ProductPreview.module.scss'
import { AddBoxOutlined, PlaylistAddOutlined, SearchOutlined, VisibilityOutlined } from '@mui/icons-material'

interface Props {
  product: Product
}

export const ProductPreview: React.FC<Props> = ({ product }) => {
  const { product_name, product_image, product_description, brand_name } = product

  return (
    <li className={styles.li}>
      <h3 title={product_name} className={styles.h3}>{product_name}</h3>
      <img className={styles.img} src={product_image} alt="מוצר" />
      <hr className={styles.hr} />
      <div className={styles.buttons}>
        <button className={styles.button} title='הוספה למלאי'><AddBoxOutlined /></button>
        <button className={styles.button} title='פרטי מוצר'><SearchOutlined /></button>
        <button className={styles.button} title='הוספה לרשימת קניות'><PlaylistAddOutlined /></button>
      </div>
    </li>
  )
}
