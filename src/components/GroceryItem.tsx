import { ArrowDownward, ArrowUpward, RemoveCircleOutline } from '@mui/icons-material'
import React, { useState } from 'react'
import { Grocery } from '../models/grocery'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { RootState } from '../store'
import { storeActions } from '../store/store'
import styles from './GroceryItem.module.scss'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
    item: Grocery
}

export const GroceryItem: React.FC<Props> = (props: any) => {
    const dispatch: AppDispatch = useDispatch()
    const [item, setItem] = useState({ ...props.item })
    const { barcode, title, quantity } = item
    const [isHovered, setIsHovered] = useState(false)
    const deleteGroceryHandler = () => {
        dispatch(storeActions.deleteGroceryFromShoppingList(barcode))
    }
    const decreaseQuantityHandler = () => {
        if (barcode) {
            if (quantity === 1) {
                props.onDeleteGrocery(barcode)
                return
            }
            const updatedItem = { ...item, quantity: item.quantity - 1 }
            setItem(updatedItem)
            dispatch(storeActions.updateGrocery(updatedItem))
        }
    }
    const increaseQuantityHandler = () => {
        const updatedItem = { ...item, quantity: item.quantity + 1 }
        setItem(updatedItem)
        dispatch(storeActions.updateGrocery(updatedItem))
    }
    const handleMouseEnter = () => {
        setIsHovered(true)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
    }
    return (
        <li className={styles['grocery-item']} key={barcode} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={styles['grocery-item-title']}>
                <RemoveCircleOutline
                    className={`${styles['delete-grocery']} ${isHovered ? styles['hovered'] : ''}`}
                    onClick={deleteGroceryHandler}
                />
                <p className={`${styles.p} ${isHovered ? styles['hovered'] : ''}`}>{title}</p>
            </div>
            <div className={styles['grocery-item-actions']}>
                <button onClick={decreaseQuantityHandler} className={`${styles['decrease-quantity']} ${isHovered ? styles['hovered'] : ''}`} title='להפחית כמות'><ArrowDownward /></button>
                <p style={{ marginInlineEnd: quantity > 9 ? '0px' : '' }} className={styles['item-quantity']}>{quantity} </p>
                <button onClick={increaseQuantityHandler} className={`${styles['increase-quantity']} ${isHovered ? styles['hovered'] : ''}`} title='להוסיף כמות'><ArrowUpward /></button>
            </div>
        </li>
    )
}
