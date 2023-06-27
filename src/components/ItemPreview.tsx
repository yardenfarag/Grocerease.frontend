import React, { ChangeEvent, useState } from 'react'
import { Item } from '../models/item'
import { RemoveCircleOutline, ArrowUpward, ArrowDownward, PlaylistAdd } from '@mui/icons-material'
import { storeActions } from '../store/store'
import { useDispatch } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
    item: Item
    placeId: string
}

export const ItemPreview: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch()
    const [item, setItem] = useState({ ...props.item })
    const [isHovered, setIsHovered] = useState(false)
    const decreaseQuantityHandler = () => {
        if (item.id) {
            if (item.quantity === 0) {
                dispatch(storeActions.deleteItem({ itemId: item.id, placeId: props.placeId }))
                return
            }
            if (item.quantity >= 2) {
                const { barcode, title, quantity, imgUrl } = item
                dispatch(storeActions.addItemToShoppingList({ barcode, title, quantity, imgUrl }))
            }
            const updatedItem = { ...item, quantity: item.quantity - 1 }
            setItem(updatedItem)
            dispatch(storeActions.updateItem({ itemToUpdate: updatedItem, placeId: props.placeId }))
        }
    }
    const increaseQuantityHandler = () => {
        const updatedItem = { ...item, quantity: item.quantity + 1 }
        setItem(updatedItem)
        dispatch(storeActions.updateItem({ itemToUpdate: updatedItem, placeId: props.placeId }))
    }
    const deleteItemHandler = () => {
        if (item.id) {
            dispatch(storeActions.deleteItem({ itemId: item.id, placeId: props.placeId }))
        }
    }
    const addItemToShoppingListHandler = () => {
        const { barcode, title, quantity, imgUrl } = item
        if (item.barcode) {
            dispatch(storeActions.addItemToShoppingList({ barcode, title, quantity, imgUrl }))
        }
    }
    const handleMouseEnter = () => {
        setIsHovered(true)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
    }
    const expiryHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        const updatedItem = { ...item, expiry: ev.target.value }
        setItem(updatedItem)
        dispatch(storeActions.updateItem({ itemToUpdate: updatedItem, placeId: props.placeId }))
    }
    const getColorForDate = (dateString: string | undefined): string => {
        if (!dateString) {
            return 'white'
        }
        const currentDate = new Date()
        const givenDate = new Date(dateString)

        const currentYear = currentDate.getFullYear()
        const currentMonth = currentDate.getMonth()
        const currentDay = currentDate.getDate()

        const givenYear = givenDate.getFullYear()
        const givenMonth = givenDate.getMonth()
        const givenDay = givenDate.getDate()

        const currentDateOnly = new Date(currentYear, currentMonth, currentDay)
        const givenDateOnly = new Date(givenYear, givenMonth, givenDay)

        if (givenDateOnly.getTime() === currentDateOnly.getTime()) {
            return '#ff9d5c' // Date is today
        } else if (givenDateOnly.getTime() < currentDateOnly.getTime()) {
            return '#fe2f06ac' // Date has passed
        } else if (givenDateOnly.getTime() - currentDateOnly.getTime() <= 2 * 24 * 60 * 60 * 1000) {
            return '#fff59e' // Date is within two days or less
        } else {
            return 'white' // Default color
        }
    }

    return (
        <>
            <div style={{ backgroundColor: getColorForDate(item.expiry) }} className={`item flex column ${isHovered ? 'hovered' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="item-actions flex between">
                    <div className="item-title flex items-center">
                        <p onClick={deleteItemHandler} className={`delete-item ${isHovered ? 'hovered' : ''}`} title='הסר'><RemoveCircleOutline /></p>
                        <p title={item.title} className={`item-name ${isHovered ? 'hovered' : ''}`}>{item.title}</p>
                    </div>
                    <div className="actions flex items-center justify-end">
                        <button onClick={decreaseQuantityHandler} className={`decrease-quantity ${isHovered ? 'hovered' : ''}`} title='להפחית כמות'><ArrowDownward /></button>
                        {/* <p style={{marginInlineEnd: item.quantity > 9 ? '7px' : ''}} className='item-quantity'>{item.quantity} </p> */}
                        <p style={{ marginInlineEnd: item.quantity > 9 ? '0px' : '' }} className='item-quantity'>{item.quantity} </p>

                        <button onClick={increaseQuantityHandler} className={`increase-quantity ${isHovered ? 'hovered' : ''}`} title='להוסיף כמות'><ArrowUpward /></button>
                    </div>
                </div>
                <div className={`item-expiry flex items-center between`}>

                    <p className={`expiry ${isHovered ? 'hovered' : ''}`}>תפוגה: <input onChange={expiryHandler} type="date" value={item.expiry} /></p>
                    <p onClick={addItemToShoppingListHandler} className={`add-item-to-shopping-list ${isHovered ? 'hovered' : ''} `} title='הוסף לרשימת קניות'><PlaylistAdd /></p>
                </div>
            </div >
        </>
    )
}
