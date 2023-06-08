import React, { useState } from 'react'
import { Item } from '../../models/item'
import { RemoveCircleOutline, ArrowUpward, ArrowDownward, PlaylistAdd } from '@mui/icons-material'

export const ItemPreview:
    React.FC<{
        item: Item,
        onDeleteItem: (id: string) => void,
        onAddItemToShoppingList: (barcode:string, title:string, quantity:number, imgUrl:string) => void,
        onUpdateItem: (item: Item) => void
    }> = props => {
        const [item, setItem] = useState({ ...props.item })
        const [isHovered, setIsHovered] = useState(false)
        const decreaseQuantityHandler = () => {
            if (item.id) {
                if (item.quantity === 0) {
                    props.onDeleteItem(item.id)
                    return
                }
                if (item.quantity >= 2) {
                    props.onAddItemToShoppingList(item.barcode, item.title, item.quantity, item.imgUrl!)
                }
                setItem((prevItem: Item) => ({ ...prevItem, quantity: prevItem.quantity - 1 }))
                props.onUpdateItem(item)
            }
        }
        const increaseQuantityHandler = () => {
            setItem((prevItem: Item) => ({ ...prevItem, quantity: prevItem.quantity + 1 }))
            props.onUpdateItem(item)
        }
        const deleteItemHandler = () => {
            if (item.id) {
                props.onDeleteItem(item.id)
            }
        }
        const addItemToShoppingListHandler = () => {
            if (item.barcode) {
                props.onAddItemToShoppingList(item.barcode, item.title, 1, item.imgUrl!)
            }
        }
        const formatDate = (inputDate: string | undefined): string => {
            if (!inputDate) {
                return 'לא הוזן תאריך'
            }
            const [year, month, day] = inputDate.split('-');
            return `${day}-${month}-${year}`;
        }
        const handleMouseEnter = () => {
            setIsHovered(true)
        }
        const handleMouseLeave = () => {
            setIsHovered(false)
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
                <div style={{backgroundColor: getColorForDate(item.expiry)}} className={`item flex column ${isHovered ? 'hovered' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div className="item-actions flex between">
                        <div className="item-title flex items-center">
                            <p onClick={deleteItemHandler} className={`delete-item ${isHovered ? 'hovered' : ''}`} title='הסר'><RemoveCircleOutline /></p>
                            <p className={`item-name ${isHovered ? 'hovered' : ''}`}>{item.title}</p>
                        </div>
                        <div className="actions flex items-center justify-end">
                            <button onClick={decreaseQuantityHandler} className={`decrease-quantity ${isHovered ? 'hovered' : ''}`} title='להפחית כמות'><ArrowDownward /></button>
                            <p style={{marginInlineEnd: item.quantity > 9 ? '7px' : ''}} className='item-quantity'>{item.quantity} </p>
                            <button onClick={increaseQuantityHandler} className={`increase-quantity ${isHovered ? 'hovered' : ''}`} title='להוסיף כמות'><ArrowUpward /></button>
                        </div>
                    </div>
                    <div className={`item-expiry flex items-center between`}>
                        <p className={`expiry ${isHovered ? 'hovered' : ''}`}>תפוגה: {formatDate(item.expiry)}</p>
                        <p onClick={addItemToShoppingListHandler} className={`add-item-to-shopping-list ${isHovered ? 'hovered' : ''} `} title='הוסף לרשימת קניות'><PlaylistAdd /></p>
                    </div>
                </div >
            </>
        )
    }
