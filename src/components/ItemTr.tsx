// ItemTr.tsx
import React, { ChangeEvent, useState } from 'react';
import { Item } from '../models/item';
import styles from './ItemTr.module.scss';
import { Add, Delete, DeleteOutline, PlaylistAdd, PlaylistAddOutlined, Remove } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { storeActions } from '../store/store';

interface Props {
  item: Item;
}

export const ItemTr: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const [item, setItem] = useState({ ...props.item })
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Item>>({});


  const handleChange = (key: keyof Item, value: string) => {
    setEditedData((prevData) => ({ ...prevData, [key]: value }));
  }

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
  const expiryHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    const updatedItem = { ...item, expiry: ev.target.value }
    setItem(updatedItem)
    dispatch(storeActions.updateItem(updatedItem))
  }
  const getColorForDate = (dateString: string | undefined): { backgroundColor: string } => {
    if (!dateString) {
      return { backgroundColor: '' }
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
      return { backgroundColor: '#ff8000' }
    } else if (givenDateOnly.getTime() < currentDateOnly.getTime()) {
      return { backgroundColor: '#ff2a00' }
    } else if (givenDateOnly.getTime() - currentDateOnly.getTime() <= 2 * 24 * 60 * 60 * 1000) {
      return { backgroundColor: '#ffe600' }
    } else {
      return { backgroundColor: '' }
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
    <tr className={styles.tr}>
      <td className={styles.td}>
        <div className={styles['title-img']}>
          <img src={item.imgUrl} alt="Item" />
          <span className={styles.title}>{item.title}</span>
        </div>
      </td>
      <td className={styles.td}>
        <span
          suppressContentEditableWarning={true}
          contentEditable={true}
          onBlur={blurHandler}
          className={styles['item-place']}
          style={{ color: item.place ? '' : '#686868' }}
          title='לחץ כדי לערוך'
        >
          {item.place ? item.place : 'הזן מיקום'}
        </span>
      </td>
      <td className={styles.td}>
        <div className={`${styles["quantity"]} ${styles['buttons_added']}`}>
          <input onClick={decreaseQuantityHandler} type="button" value="-" className={styles.minus} />
          <input type="number" step="1" min="1" max="" name="quantity" value={item.quantity} title="Qty" className={`${styles["input-text"]} ${styles.qty} ${styles.text}`} size={4} pattern="" />
          <input onClick={increaseQuantityHandler} type="button" value="+" className={styles.plus} />
        </div>
      </td>
      <td className={styles.td}>
        {/* <span style={getColorForDate(item.expiry)}> */}
        <span>
          <span className={styles['item-expiry']} style={{ color: item.expiry ? '' : '#686868' }}>
            {item.expiry ? convertDateFormat(item.expiry) : 'הזן ת.תפוגה'}
            <input style={getColorForDate(item.expiry)} className={styles.input} onChange={expiryHandler} type="date" id='datePicker' value={item.expiry} />
          </span>
        </span>
      </td>
      <td className={styles.td}>
        <div className={styles.actions}>
          <button onClick={addItemToShoppingListHandler} className={styles.add} title='הוסף לרשימת הקניות'><PlaylistAddOutlined /></button>
          <button onClick={deleteItemHandler} className={styles.remove} title='מחק'><DeleteOutline /></button>
        </div>
      </td>
    </tr>
  );
};

