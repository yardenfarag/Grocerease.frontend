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

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
    color: string | undefined
}

export const ShoppingList: React.FC<Props> = (props: any) => {
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
    return (
        <div className="shopping-list">
            <div className="shopping-list-header flex items-center between">
                <h1>רשימת קניות</h1>
                <span className='close-shopping-list'>X</span>
            </div>
            <ul className='clean-list flex column'>
                {props.shoppingList?.map((item: Grocery) => <GroceryItem key={item.barcode} item={item} />)}
            </ul>
            <form onSubmit={addItemToShoppingListHandler} className='flex'>
                <input value={groceryToAdd.title} onChange={setGroceryTitleHandler} type="text" placeholder='הוסף פריט לרשימה' />
                <button className='add-grocery-btn' type='submit'>+</button>
            </form>
                {groceryToAdd.title && products?.length && <ProductSuggestions onChooseProduct={chooseProductHandler} products={products}/>}
            <button className='compare-btn'>השווה מחירים (בקרוב...)</button>
        </div>
    )
}
