import React, { FormEvent, useEffect, useState } from 'react'
import { ProductList } from './ProductSuggestions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Product } from '../models/product'
import { getProducts } from '../store/product'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { storeActions } from '../store/store'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
    placeId: string
}

export const AddItemForm: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch()
    const [itemToAdd, setItemToAdd] = useState({ title: '', quantity: 1, expiry: '', imgUrl: '', barcode: '' })
    const [productDetails, setProductDetails] = useState({ title: '', imgUrl: '', barcode: '' })
    const products: Product[] | null = useSelector((state: RootState) => state.product.products)

    useEffect(() => {
        let { title, imgUrl, barcode } = productDetails
        setItemToAdd({ ...itemToAdd, title, imgUrl, barcode })
    }, [productDetails])

    const setItemTitleHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setItemToAdd({ ...itemToAdd, title: ev.target.value })
        dispatch(getProducts({ txt: ev.target.value }))
    }

    const chooseProductHandler = (title: string, imgUrl: string, barcode: string) => {
        setProductDetails({ title, imgUrl, barcode })
    }

    const setItemQuantityHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (+ev.target.value < 1) {
            return
        }
        setItemToAdd({ ...itemToAdd, quantity: +ev.target.value })
    }

    const setItemExpiryHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setItemToAdd({ ...itemToAdd, expiry: ev.target.value })
    }

    const addItemHandler = (ev: FormEvent) => {
        ev.preventDefault()
        if (!itemToAdd.title || !itemToAdd.barcode) return
        dispatch(storeActions.addItem({ itemToAdd, placeId: props.placeId }))
        setItemToAdd({ title: '', quantity: 1, expiry: '', imgUrl: '', barcode: '' })
    }

    return (
        <div className='add-item flex between column'>
            <form onSubmit={addItemHandler} className="add-item-form flex items-center">
                <div className='inputs flex column'>
                    <div className="title-quantity flex">
                        <input
                            onChange={setItemExpiryHandler}
                            value={itemToAdd.expiry}
                            className='new-item-date'
                            type="date"
                            placeholder='Expiration'
                        />

                        <input
                            onChange={setItemQuantityHandler}
                            value={itemToAdd.quantity}
                            className='new-item-quantity'
                            type="number"
                            placeholder='Quantity'
                        />
                    </div>
                    <input
                        onChange={setItemTitleHandler}
                        value={itemToAdd.title} className='new-item-title'
                        type="text" placeholder='הוסף מוצר'
                    />
                </div>
                <button type='submit'>+</button>
            </form>
            {itemToAdd.title && products?.length && <ProductList onChooseProduct={chooseProductHandler} products={products} />}
        </div>
    )
}
