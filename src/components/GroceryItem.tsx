import { ArrowDownward, ArrowUpward, RemoveCircleOutline } from '@mui/icons-material'
import React, { useState } from 'react'
import { Grocery } from '../models/grocery'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { RootState } from '../store'
import { storeActions } from '../store/store'

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
        <li className='grocery-item flex between' key={barcode} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='grocery-item-title flex items-center'>
                <RemoveCircleOutline className={`delete-grocery ${isHovered ? 'hovered' : ''}`} onClick={deleteGroceryHandler} />
                <p>{title}</p>
            </div>
            <div className="grocery-item-actions flex items-center justify-end">
                <button onClick={decreaseQuantityHandler} className={`decrease-quantity ${isHovered ? 'hovered' : ''}`} title='להפחית כמות'><ArrowDownward /></button>
                <p style={{ marginInlineEnd: quantity > 9 ? '7px' : '' }} className='item-quantity'>{quantity} </p>
                <button onClick={increaseQuantityHandler} className={`increase-quantity ${isHovered ? 'hovered' : ''}`} title='להוסיף כמות'><ArrowUpward /></button>
            </div>
        </li>
    )
}
