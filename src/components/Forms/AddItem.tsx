import React, { FormEvent, useState } from 'react'
import { ProductSuggestions } from '../Lists/ProductSuggestions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Product } from '../../models/product'
import { getProducts } from '../../store/product'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { storeActions } from '../../store/store'
import styles from './AddItem.module.scss'
import { Close } from '@mui/icons-material'
import { utilService } from '../../services/util.service'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
    onSetIsAddItemForm: () => void
}

export const AddItem: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch()
    const [itemToAdd, setItemToAdd] = useState({ title: '', quantity: 1, expiry: '', imgUrl: '', barcode: '', place: '' })
    const products: Product[] | null = useSelector((state: RootState) => state.product.products)
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 })

    const debouncedGetProducts = utilService.debounce((title: string) => {
        dispatch(getProducts({ txt: title }))
    }, 500)

    const setItemTitleHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setItemToAdd({ ...itemToAdd, title: ev.target.value })

        if (ev.target.value.length >= 2) {
            debouncedGetProducts(ev.target.value)
        } else {
            debouncedGetProducts('&')
        }

        var element = document.getElementById("title");
        var rect = element?.getBoundingClientRect()
        let top = rect?.top
        let left = rect?.left
        let width = rect?.width
        setCoords({ top: top || 0, left: left || 0, width: width || 0 })
    }

    const setItemPlaceHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setItemToAdd({ ...itemToAdd, place: ev.target.value })
    }

    const chooseProductHandler = (title: string, imgUrl: string, barcode: string) => {
        setItemToAdd({ ...itemToAdd, title, imgUrl, barcode })
        debouncedGetProducts('&')
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
        dispatch(storeActions.addItem(itemToAdd))
        setItemToAdd({ title: '', quantity: 1, expiry: '', imgUrl: '', barcode: '', place: '' })
    }

    return (
        <>
            <form onSubmit={addItemHandler} className={styles.form}>
                <Close onClick={props.onSetIsAddItemForm} className={styles.close} />
                <input
                    onChange={setItemTitleHandler}
                    value={itemToAdd.title}
                    id='title'
                    className={styles['item-title']}
                    type="text" placeholder='תה שחור ארל גריי'
                />
                <input
                    onChange={setItemPlaceHandler}
                    value={itemToAdd.place}
                    className={styles['item-place']}
                    type="text" placeholder='ארון קפה'
                />
                <input
                    onChange={setItemQuantityHandler}
                    value={itemToAdd.quantity}
                    className={styles['item-quantity']}
                    type="number"
                    placeholder='Quantity'
                />
                <input
                    onChange={setItemExpiryHandler}
                    value={itemToAdd.expiry}
                    className={styles['item-date']}
                    type="date"
                    placeholder='Expiration'
                />

                <button title='יש לבחור מוצר מן הרשימה' disabled={!itemToAdd.barcode} className={styles.button} type='submit'><span className={styles.span}>+</span></button>
            </form>
            {itemToAdd.title && products && <ProductSuggestions width={coords.width} top={coords.top} left={coords.left} onChooseProduct={chooseProductHandler} products={products} />}
        </>
    )
}
