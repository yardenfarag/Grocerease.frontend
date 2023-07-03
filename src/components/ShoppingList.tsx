import React, { FormEvent, useEffect, useState } from 'react'
import { Grocery } from '../models/grocery'
import { GroceryItem } from './GroceryItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Product } from '../models/product'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { storeActions } from '../store/store'
import { ProductSuggestions } from './ProductSuggestions'
import { getProducts } from '../store/product'
import { Store } from '../models/store'
import styles from './ShoppingList.module.scss'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
    onToggleShoppingListModal: () => void
}

export const ShoppingList: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch()
    const [groceryToAdd, setGroceryToAdd] = useState({ title: '', quantity: 1, imgUrl: '', barcode: '' })
    const [productDetails, setProductDetails] = useState({ title: '', imgUrl: '', barcode: '' })
    const products: Product[] | null = useSelector((state: RootState) => state.product.products)
    const store: Store | null = useSelector((state: RootState) => state.store.curStore)

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
    return (
        <div className={styles['shopping-list']}>
            <div className={styles['shopping-list-header']}>
                <h1>רשימת קניות</h1>
                <span onClick={props.onToggleShoppingListModal} className={styles['close-shopping-list']}>X</span>
            </div>
            <ul className={styles.ul}>
                {store && store.shoppingList?.map((item: Grocery) => <GroceryItem key={item.barcode} item={item} />)}
            </ul>
            <form onSubmit={addItemToShoppingListHandler} className={styles.form}>
                <input className={styles.input} value={groceryToAdd.title} onChange={setGroceryTitleHandler} type="text" placeholder='הוסף פריט לרשימה' />
                <button className={styles['add-grocery-btn']} type='submit'>+</button>
            </form>
                {groceryToAdd.title && products?.length && <ProductSuggestions onChooseProduct={chooseProductHandler} products={products}/>}
            {/* <button className={styles['compare-btn']}>השווה מחירים (בקרוב...)</button> */}
            <div className="prices-container">
                <div className="prices-list">
                    <div className="price">
                        <h4>רמי לוי - סניף באר שבע</h4>
                        <h5>מחיר הסל: 120 ש"ח</h5>
                        <h6>3 פריטים אינם במלאי:</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
