import { AddBoxOutlined, ArrowDownward, ArrowUpward, Delete, DeleteOutline, Remove, RemoveCircleOutline } from '@mui/icons-material'
import React, { MouseEventHandler, useState } from 'react'
import { Grocery } from '../../models/grocery'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { storeActions } from '../../store/store'
import styles from './GroceryPreview.module.scss'
import toast from 'react-hot-toast'
import { Toast } from '../UI/Toast'
import { Link, useParams } from 'react-router-dom'
import { getProductByBarcode } from '../../store/product'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>

interface Props {
    item: Grocery
    onOpenProductModal: () => void
}

export const GroceryPreview: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch()
    const { id } = useParams()
    const [item, setItem] = useState({ ...props.item })
    const { barcode, title, quantity } = item
    const [isHovered, setIsHovered] = useState(false)

    const deleteGroceryHandler = () => {
        dispatch(storeActions.deleteGroceryFromShoppingList(barcode))
        toast.success(`${item.title} - הוסר מהרשימה`)
    }

    const updateQuantityHandler = (actionType: 'increase' | 'decrease') => {
        let updatedQuantity
        if (actionType === 'increase') {
            updatedQuantity = item.quantity + 1
        } else if (actionType === 'decrease' && item.quantity > 1) {
            updatedQuantity = item.quantity - 1
        } else {
            dispatch(storeActions.deleteGroceryFromShoppingList(barcode))
            return
        }

        const updatedItem = { ...item, quantity: updatedQuantity }
        setItem(updatedItem)
        dispatch(storeActions.updateGrocery(updatedItem))
    }

    const decreaseQuantityHandler = () => {
        updateQuantityHandler('decrease')
    }

    const increaseQuantityHandler = () => {
        updateQuantityHandler('increase')
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const openProductModal = () => {
        props.onOpenProductModal()
        if (barcode) {
            dispatch(getProductByBarcode(barcode))
        }
    }

    const getProductDetailsHandler = () => {
        if (barcode) {
            dispatch(getProductByBarcode(barcode))
        }
    }

    const addItemToStore = () => {
        dispatch(storeActions.addItem(item))
        dispatch(storeActions.deleteGroceryFromShoppingList(barcode))
        toast.success(`${item.title} - הועבר למלאי`)
    }

    return (
        <>
            <Toast />
            <li className={styles.li} key={barcode} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className={styles['grocery-item-title']}>
                    <DeleteOutline
                        titleAccess='מחק'
                        className={`${styles['delete-grocery']} ${isHovered ? styles['hovered'] : ''}`}
                        onClick={deleteGroceryHandler}
                    />
                    <AddBoxOutlined
                        titleAccess='העבר למלאי הביתי'
                        className={`${styles['move-grocery']} ${isHovered ? styles['hovered'] : ''}`}
                        onClick={addItemToStore}
                    />
                    <img className={styles.img} src={item.imgUrl} alt="" />
                    <p title='לחצו עליי כדי לקבל מידע נוסף אודות המוצר' onClick={openProductModal} className={`${styles.p} ${isHovered ? styles['hovered'] : ''}`}>{title}</p>
                </div>
                <div className={styles['grocery-item-actions']}>
                    <div className={`${styles["quantity"]} ${styles['buttons_added']}`}>
                        <input readOnly onClick={decreaseQuantityHandler} type="button" value="-" className={styles.minus} />
                        <input readOnly type="number" step="1" min="1" max="" name="quantity" value={item.quantity} title="Qty" className={`${styles["input-text"]} ${styles.qty} ${styles.text}`} size={4} pattern="" />
                        <input readOnly onClick={increaseQuantityHandler} type="button" value="+" className={styles.plus} />
                    </div>
                </div>
            </li>
        </>
    )
}
