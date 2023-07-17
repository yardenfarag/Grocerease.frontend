import React, { FormEvent, useEffect, useState } from 'react'
import styles from './AddItemToShoppingList.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { storeActions } from '../store/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getProducts } from '../store/product';
import { ProductSuggestions } from './ProductSuggestions';
import { Product } from '../models/product';
import { Add } from '@mui/icons-material';

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const AddItemToShoppingList = () => {
    const dispatch: AppDispatch = useDispatch()
    const [groceryToAdd, setGroceryToAdd] = useState({ title: '', quantity: 1, imgUrl: '', barcode: '' })
    const [productDetails, setProductDetails] = useState({ title: '', imgUrl: '', barcode: '' })
    const products: Product[] | null = useSelector((state: RootState) => state.product.products)

    useEffect(() => {
        let { title, imgUrl, barcode } = productDetails
        setGroceryToAdd({ ...groceryToAdd, title, imgUrl, barcode })
    }, [productDetails])

    const chooseProductHandler = (title: string, imgUrl: string, barcode: string) => {
        setProductDetails({ title, imgUrl, barcode })
    }

    const addItemToShoppingListHandler = (ev: FormEvent) => {

        ev.preventDefault()
        if (!groceryToAdd.title || !groceryToAdd.barcode) return
        dispatch(storeActions.addGroceryToShoppingList(groceryToAdd))
        setGroceryToAdd({ title: '', quantity: 1, imgUrl: '', barcode: '' })
    }
    const setGroceryTitleHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setGroceryToAdd({ ...groceryToAdd, title: ev.target.value })
        dispatch(getProducts({ txt: ev.target.value }))
    }
    const setItemQuantityHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (+ev.target.value <= 1) {
            return
        }
        setGroceryToAdd({ ...groceryToAdd, quantity: +ev.target.value })
    }
    return (
        <>
            <form onSubmit={addItemToShoppingListHandler} className={styles.form}>
                <input
                    className={styles.title}
                    value={groceryToAdd.title}
                    onChange={setGroceryTitleHandler}
                    type="text"
                    placeholder='לדוגמה: קמח חיטה מלא'/>
                <input
                    onChange={setItemQuantityHandler}
                    value={groceryToAdd.quantity}
                    className={styles.quantity}
                    type="number"
                    placeholder='Quantity'
                />
                <button className={styles.button} type='submit'><span className={styles.icon}>+</span></button>
            </form>
            {groceryToAdd.title && products && <ProductSuggestions onChooseProduct={chooseProductHandler} products={products} />}
        </>
    )
}
