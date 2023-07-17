import React, { ChangeEvent, useState } from 'react'
import { Item } from '../models/item'
import { RemoveCircleOutline, ArrowUpward, ArrowDownward, PlaylistAdd, Delete, DeleteOutline, DeleteSweep, Remove, Add } from '@mui/icons-material'
import { storeActions } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store'
import styles from './ItemPreview.module.scss'
import { Draggable } from './Draggable'
import { useDraggable } from '@dnd-kit/core';

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
    item: Item
    placeId?: string
    index: number
}

export const ItemPreview: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch()
    let itemsView = useSelector((state: RootState) => state.settings.view)
    const [item, setItem] = useState({ ...props.item })
    const [isHovered, setIsHovered] = useState(false)
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable',
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    const decreaseQuantityHandler = () => {
        if (item.id) {
            if (item.quantity === 0) {
                dispatch(storeActions.deleteItem(item.id))
                return
            }
            if (item.quantity >= 2) {
                const { barcode, title, quantity, imgUrl } = item
                dispatch(storeActions.addItemToShoppingList({ barcode, title, quantity, imgUrl }))
            }
            const updatedItem = { ...item, quantity: item.quantity - 1 }
            setItem(updatedItem)
            dispatch(storeActions.updateItem(updatedItem))
        }
    }
    const increaseQuantityHandler = () => {
        const updatedItem = { ...item, quantity: item.quantity + 1 }
        setItem(updatedItem)
        dispatch(storeActions.updateItem(updatedItem))
    }
    const deleteItemHandler = () => {
        if (item.id) {
            dispatch(storeActions.deleteItem(item.id))
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
        dispatch(storeActions.updateItem(updatedItem))
    }
    const getColorForDate = (dateString: string | undefined): { color: string } => {
        if (!dateString) {
            return { color: '' }
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
            return { color: '#fc8309' }
        } else if (givenDateOnly.getTime() < currentDateOnly.getTime()) {
            return { color: '#f73711' }
        } else if (givenDateOnly.getTime() - currentDateOnly.getTime() <= 2 * 24 * 60 * 60 * 1000) {
            return { color: '#ffed50' }
        } else {
            return { color: '' }
        }
    }
    const generateRandomColor = (input?: string): string => {
        let hash = 0;
        if (input) {

            for (let i = 0; i < input.length; i++) {
                const charCode = input.charCodeAt(i);
                hash = (hash << 5) - hash + charCode;
                hash &= hash; // Convert to 32-bit integer
            }

            const color = '#' + ((hash >>> 0) % 0xFFFFFF).toString(16).padStart(6, '0');
            return color;
        }
        else return 'transparent'
    }
    const isColorDark = (color: string): boolean => {
        const hexColor = color.replace('#', '')
        const red = parseInt(hexColor.substr(0, 2), 16)
        const green = parseInt(hexColor.substr(2, 2), 16)
        const blue = parseInt(hexColor.substr(4, 2), 16)
        const relativeLuminance = (red * 0.299 + green * 0.587 + blue * 0.114) / 255

        return relativeLuminance <= 0.5
    }

    const convertDateFormat = (dateString: string): string => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    }
    const blurHandler: React.FocusEventHandler<HTMLHeadingElement> = (ev) => {
        let updatedItem = { ...item }
        if (!ev.target.innerText || ev.target.innerText === 'הזן מיקום') {
            updatedItem = { ...item, place: '' }
        } else {
            updatedItem = { ...item, place: ev.target.innerText.slice(0, 20) }
        }
        setItem(updatedItem)
        dispatch(storeActions.updateItem(updatedItem))
    }

    return (
        <>
            <li className={itemsView === 'list' ? styles.item : styles['item-card']} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className={styles['item-title-img']}>
                    <img className={styles.img} src={item.imgUrl ? item.imgUrl : 'https://res.cloudinary.com/dfz8mxb4f/image/upload/v1680119258/Group_1_nhbrcc.svg'} />
                    <p title={item.title} className={styles['item-title']}>{item.title}</p>
                </div>
                <div className={styles.quantity}>
                    <button onClick={deleteItemHandler} className={`${styles['delete-item']} ${isHovered ? styles['hovered'] : ''}`} title='הסר'><DeleteOutline /></button>
                    {/* <button onClick={decreaseQuantityHandler} className={`${styles['decrease-quantity']} ${isHovered ? styles['hovered'] : ''}`} title='להפחית כמות'><ArrowDownward /></button> */}
                    <button onClick={decreaseQuantityHandler} className={`${styles['decrease-quantity']} ${isHovered ? styles['hovered'] : ''}`} title='להפחית כמות'><Remove /></button>

                    <p style={{ marginInlineEnd: item.quantity > 9 ? '0px' : '' }} className={styles['item-quantity']}>{item.quantity} </p>
                    <button onClick={increaseQuantityHandler} className={`${styles['increase-quantity']} ${isHovered ? styles['hovered'] : ''}`} title='להוסיף כמות'><Add /></button>

                    {/* <button onClick={increaseQuantityHandler} className={`${styles['increase-quantity']} ${isHovered ? styles['hovered'] : ''}`} title='להוסיף כמות'><ArrowUpward /></button> */}
                </div>
                {/* <div className={styles['item-date-place']}> */}
                <button style={getColorForDate(item.expiry)} className={styles['date-button']}>{item.expiry ? convertDateFormat(item.expiry) : 'הזן ת.תפוגה'}<input style={getColorForDate(item.expiry)} className={styles.input} onChange={expiryHandler} type="date" id='datePicker' value={item.expiry} /></button>
                {/* <p suppressContentEditableWarning={true} contentEditable onBlur={blurHandler}
                    style={{ background: generateRandomColor(item?.place), color: !item?.place ? '' : isColorDark(generateRandomColor(item?.place)) ? 'white' : 'black' }} className={styles['item-place']}>
                    {item.place ? item.place : 'הזן מיקום'}
                </p> */}
                <p suppressContentEditableWarning={true} contentEditable onBlur={blurHandler}
                    className={styles['item-place']}>
                    {item.place ? item.place : 'הזן מיקום'}
                </p>
                        {/* </div> */}
                <button onClick={addItemToShoppingListHandler} className={styles['add-item-to-shopping-list']} title='הוסף לרשימת קניות'><span className={styles.span}>+</span><p className={styles.p}>הוסף לרשימת קניות</p></button>
            </li>
        </>
        // <>
        //     <li className={itemsView === 'list' ? styles.item : styles['item-card']} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        //         <div className={styles['item-title-img']}>
        //             <img className={styles.img} src={item.imgUrl ? item.imgUrl : 'https://res.cloudinary.com/dfz8mxb4f/image/upload/v1680119258/Group_1_nhbrcc.svg'} />
        //             <p title={item.title} className={styles['item-title']}>{item.title}</p>
        //         </div>
        //         <div className={styles.quantity}>
        //             <button onClick={deleteItemHandler} className={`${styles['delete-item']} ${isHovered ? styles['hovered'] : ''}`} title='הסר'><DeleteOutline /></button>
        //             <button onClick={decreaseQuantityHandler} className={`${styles['decrease-quantity']} ${isHovered ? styles['hovered'] : ''}`} title='להפחית כמות'><ArrowDownward /></button>
        //             <p style={{ marginInlineEnd: item.quantity > 9 ? '0px' : '' }} className={styles['item-quantity']}>{item.quantity} </p>
        //             <button onClick={increaseQuantityHandler} className={`${styles['increase-quantity']} ${isHovered ? styles['hovered'] : ''}`} title='להוסיף כמות'><ArrowUpward /></button>
        //         </div>
        //         <div className={styles['item-date-place']}>
        //         <button style={getColorForDate(item.expiry)} className={styles['date-button']}>{item.expiry ? convertDateFormat(item.expiry) : 'הזן ת.תפוגה'}<input style={getColorForDate(item.expiry)} className={styles.input} onChange={expiryHandler} type="date" id='datePicker' value={item.expiry} /></button>
        //         <p suppressContentEditableWarning={true} contentEditable onBlur={blurHandler}
        //             style={{ background: generateRandomColor(item?.place), color: !item?.place ? '' : isColorDark(generateRandomColor(item?.place)) ? 'white' : 'black' }} className={styles['item-place']}>
        //             {item.place ? item.place : 'הזן מיקום'}
        //         </p>
        //                 </div>
        //         <button onClick={addItemToShoppingListHandler} className={styles['add-item-to-shopping-list']} title='הוסף לרשימת קניות'><span className={styles.span}>+</span><p className={styles.p}>הוסף לרשימת קניות</p></button>
        //     </li>
        // </>
        // <>
        //     <li className={itemsView === 'list' ? styles.item : styles['item-card']} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        //         <img className={styles.img} src={item.imgUrl ? item.imgUrl : 'https://res.cloudinary.com/dfz8mxb4f/image/upload/v1680119258/Group_1_nhbrcc.svg'} />
        //         <div className={styles['item-title-img']}>
        //             <p title={item.title} className={styles['item-title']}>{item.title}</p>
        //             <div className={styles['item-date-place']}>
        //                 <button style={getColorForDate(item.expiry)} className={styles['date-button']}>{item.expiry ? convertDateFormat(item.expiry) : 'הזן ת.תפוגה'}<input style={getColorForDate(item.expiry)} className={styles.input} onChange={expiryHandler} type="date" id='datePicker' value={item.expiry} /></button>
        //                 <p suppressContentEditableWarning={true} contentEditable onBlur={blurHandler}
        //                     style={{ background: generateRandomColor(item?.place), color: !item?.place ? '' : isColorDark(generateRandomColor(item?.place)) ? 'white' : 'black' }} className={styles['item-place']}>
        //                     {item.place ? item.place : 'הזן מיקום'}
        //                 </p>
        //             </div>
        //             <div className={styles.quantity}>
        //                 <button onClick={deleteItemHandler} className={`${styles['delete-item']} ${isHovered ? styles['hovered'] : ''}`} title='הסר'><DeleteOutline /></button>
        //                 <button onClick={decreaseQuantityHandler} className={`${styles['decrease-quantity']} ${isHovered ? styles['hovered'] : ''}`} title='להפחית כמות'><ArrowDownward /></button>
        //                 <p style={{ marginInlineEnd: item.quantity > 9 ? '0px' : '' }} className={styles['item-quantity']}>{item.quantity} </p>
        //                 <button onClick={increaseQuantityHandler} className={`${styles['increase-quantity']} ${isHovered ? styles['hovered'] : ''}`} title='להוסיף כמות'><ArrowUpward /></button>
        //                 <button onClick={addItemToShoppingListHandler} className={styles['add-item-to-shopping-list']} title='הוסף לרשימת קניות'><span className={styles.span}>+</span><p className={styles.p}>הוסף לרשימת קניות</p></button>
        //             </div>
        //         </div>
        //     </li>
        // </>
    )
}
