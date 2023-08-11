import React, { MouseEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storeActions } from '../../store/store'
import styles from './ItemFilter.module.scss'
import { Search } from '@mui/icons-material'
import { RootState } from '../../store'

interface Props {

}

export const ItemFilter: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const filterByExpiry = useSelector((state:RootState) => state.store.filterBy.expiry)
    const filterByHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(storeActions.setFilterBy(ev.target.value))
    }
    const filterByExpiryHandler = (color: string): MouseEventHandler<HTMLDivElement> => {
        return (event) => {
            dispatch(storeActions.setFilterByExpiry(color))
        }
    }
    return (
        <div className={styles['item-filter']}>
            <Search className={styles.icon} />
            <input className={styles.input} onChange={filterByHandler} type="text" placeholder='חפש פריט' />
            <div className={styles.colors}>
                <div onClick={filterByExpiryHandler('red')} className={`${styles.color} ${styles.red} ${filterByExpiry === 'red' ? styles.selected : ''}`}></div>
                <div onClick={filterByExpiryHandler('orange')} className={`${styles.color} ${styles.orange} ${filterByExpiry === 'orange' ? styles.selected : ''}`}></div>
                <div onClick={filterByExpiryHandler('yellow')} className={`${styles.color} ${styles.yellow} ${filterByExpiry === 'yellow' ? styles.selected : ''}`}></div>
                <div onClick={filterByExpiryHandler('white')} className={`${styles.color} ${styles.white} ${filterByExpiry === 'white' ? styles.selected : ''}`}></div>
                <div onClick={filterByExpiryHandler('none')} className={`${styles.color} ${styles.transparent} ${filterByExpiry === 'none' ? styles.selected : ''}`}></div>
            </div>
        </div>
    )
}