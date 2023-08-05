import React, { FormEvent, useState } from 'react'
import styles from './AddItemToShoppingList.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { storeActions } from '../../store/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { getProducts } from '../../store/product';
import { ProductSuggestions } from '../Lists/ProductSuggestions';
import { Product } from '../../models/product';
import { utilService } from '../../services/util.service';
import { Toast } from '../UI/Toast';
import toast from 'react-hot-toast'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const AddItemToShoppingList = () => {
    const dispatch: AppDispatch = useDispatch()
    const [groceryToAdd, setGroceryToAdd] = useState({ title: '', quantity: 1, imgUrl: '', barcode: '' })
    const addToShoppingListStatus = useSelector((state: RootState) => state.store.addToShoppingListStatus);
    const products: Product[] | null = useSelector((state: RootState) => state.product.products)

    const debouncedGetProducts = utilService.debounce((title: string) => {
        dispatch(getProducts({ txt: title }))
    }, 500)

    const chooseProductHandler = (title: string, imgUrl: string, barcode: string) => {
        setGroceryToAdd({ ...groceryToAdd, title, imgUrl, barcode })
        debouncedGetProducts('')
    }

    const addItemToShoppingListHandler = (ev: FormEvent) => {
        ev.preventDefault()
        if (!groceryToAdd.title || !groceryToAdd.barcode) return
        dispatch(storeActions.addToShoppingList(groceryToAdd))
        setGroceryToAdd({ title: '', quantity: 1, imgUrl: '', barcode: '' })
        if (addToShoppingListStatus === 'error') toast.error(`${groceryToAdd.title} - כבר קיים ברשימת הקניות!`)
    }

    const setGroceryTitleHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setGroceryToAdd({ ...groceryToAdd, title: ev.target.value })
        // dispatch(getProducts({ txt: ev.target.value }))
        debouncedGetProducts(ev.target.value)
    }

    const setItemQuantityHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (+ev.target.value <= 1) {
            return
        }
        setGroceryToAdd({ ...groceryToAdd, quantity: +ev.target.value })
    }

    return (
        <>
            <Toast />
            <form onSubmit={addItemToShoppingListHandler} className={styles.form}>
                <input
                    className={styles.title}
                    value={groceryToAdd.title}
                    onChange={setGroceryTitleHandler}
                    type="text"
                    placeholder='לדוגמה: קמח חיטה מלא' />
                <input
                    onChange={setItemQuantityHandler}
                    value={groceryToAdd.quantity}
                    className={styles.quantity}
                    type="number"
                    placeholder='Quantity'
                />
                <button disabled={!groceryToAdd.barcode} className={styles.button} type='submit'><span className={styles.icon}>+</span></button>
            </form>
            {groceryToAdd.title && products && <ProductSuggestions onChooseProduct={chooseProductHandler} products={products} />}
        </>
    )
}
