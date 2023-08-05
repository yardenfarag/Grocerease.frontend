import React, { ChangeEvent, useState } from 'react'
import { Item } from '../../models/item'
import styles from './ItemTr.module.scss'
import { DeleteOutline, PlaylistAddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { storeActions } from '../../store/store'
import { utilService } from '../../services/util.service'
import { Toast } from '../UI/Toast'
import toast from 'react-hot-toast'
import { RootState } from '../../store'

interface Props {
  item: Item
}

export const ItemTr: React.FC<Props> = (props) => {
  const dispatch = useDispatch()
  const [item, setItem] = useState({ ...props.item })
  const addToShoppingListStatus = useSelector((state: RootState) => state.store.addToShoppingListStatus);


  const updateQuantityHandler = (actionType: 'increase' | 'decrease') => {
    if (item.id) {

      let updatedQuantity
      if (actionType === 'increase') {
        updatedQuantity = item.quantity + 1
      } else if (actionType === 'decrease' && item.quantity > 0) {
        updatedQuantity = item.quantity - 1
      } else {
        dispatch(storeActions.deleteItem(item.id))
        return
      }

      const updatedItem = { ...item, quantity: updatedQuantity }
      setItem(updatedItem)
      dispatch(storeActions.updateGrocery(updatedItem))
    }
  }

  const decreaseQuantityHandler = () => {
    updateQuantityHandler('decrease')
  }

  const increaseQuantityHandler = () => {
    updateQuantityHandler('increase')
  }

  const deleteItemHandler = () => {
    if (item.id) {
      dispatch(storeActions.deleteItem(item.id))
      toast.success(`${item.title} - הוסר מהמלאי`)
    }
  }

  const addItemToShoppingListHandler = () => {
    const { barcode, title, quantity, imgUrl } = item
    if (item.barcode) {
      dispatch(storeActions.addToShoppingList({ barcode, title, quantity, imgUrl }))
      if (addToShoppingListStatus === 'error') toast.error(`${title} - כבר קיים ברשימת הקניות!`)
      if (addToShoppingListStatus === 'success') toast.success(`${title} - התווסף לרשימת הקניות!`)
    }
  }

  const expiryHandler = (ev: ChangeEvent<HTMLInputElement>) => {
    const updatedItem = { ...item, expiry: ev.target.value }
    setItem(updatedItem)
    dispatch(storeActions.updateItem(updatedItem))
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
      <Toast />
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
            <input readOnly onClick={decreaseQuantityHandler} type="button" value="-" className={styles.minus} />
            <input readOnly type="number" step="1" min="1" max="" name="quantity" value={item.quantity} title="Qty" className={`${styles["input-text"]} ${styles.qty} ${styles.text}`} size={4} pattern="" />
            <input readOnly onClick={increaseQuantityHandler} type="button" value="+" className={styles.plus} />
          </div>
        </td>
        <td className={styles.td}>
          {/* <span style={getColorForDate(item.expiry)}> */}
          <span>
            <span className={styles['item-expiry']} style={{ color: item.expiry ? utilService.getColorForDate(item.expiry) : '#686868' }}>
              {item.expiry ? utilService.formatDateDescription(item.expiry) : 'הזן ת.תפוגה'}
              <input style={{ background: utilService.getColorForDate(item.expiry) }} className={styles.input} onChange={expiryHandler} type="date" id='datePicker' value={item.expiry} />
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
    </>
  )
}

