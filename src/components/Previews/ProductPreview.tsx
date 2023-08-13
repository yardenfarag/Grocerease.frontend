import React, { useState } from 'react'
import { Product } from '../../models/product'
import styles from './ProductPreview.module.scss'
import { AddBoxOutlined, PlaylistAddOutlined, SearchOutlined, VisibilityOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { storeActions } from '../../store/store'
import { AnyAction } from 'redux'
import { RootState } from '../../store'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { getProductByBarcode } from '../../store/product'
import { Toast } from '../UI/Toast'
import { toast } from 'react-hot-toast'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
  product: Product
  onOpenProductModal: () => void
}

export const ProductPreview: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch()
  const addToShoppingListStatus = useSelector((state: RootState) => state.store.addToShoppingListStatus)
  const { product_name, product_image, product_description, brand_name, product_barcode } = props.product

  const addItemHandler = () => {
    const newItem = {
      title: product_name,
      quantity: 1,
      expiry: '',
      imgUrl: product_image,
      barcode: product_barcode,
      place: ''
    }
    dispatch(storeActions.addItem(newItem))
    toast.success(`${newItem.title} הועבר למלאי!`)
  }
  const addItemToShoppingListHandler = () => {
    const newItem = {
      title: product_name,
      quantity: 1,
      imgUrl: product_image,
      barcode: product_barcode,
    }
    dispatch(storeActions.addToShoppingList(newItem))
    if (addToShoppingListStatus === 'error') toast.error(`${newItem.title} - כבר קיים ברשימת הקניות!`)
    if (addToShoppingListStatus === 'success') toast.success(`${newItem.title} - התווסף לרשימת הקניות!`)
  }
  const openProductModalHandler = () => {
    props.onOpenProductModal()
    if (product_barcode) {
      dispatch(getProductByBarcode(product_barcode))
    }
  }

  return (
    <>
      <Toast />
      <li className={styles.li}>
        <h3 title={product_name} className={styles.h3}>{product_name}</h3>
        <img className={styles.img} src={product_image} alt="מוצר" />
        <hr className={styles.hr} />
        <div className={styles.buttons}>
          <button onClick={addItemHandler} className={styles.button} title='הוספה למלאי'><AddBoxOutlined /></button>
          <button onClick={openProductModalHandler} className={styles.button} title='פרטי מוצר'><SearchOutlined /></button>
          <button onClick={addItemToShoppingListHandler} className={styles.button} title='הוספה לרשימת קניות'><PlaylistAddOutlined /></button>
        </div>
      </li>
    </>
  )
}
