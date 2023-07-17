import React from 'react'
import { useDispatch } from 'react-redux'
import { storeActions } from '../store/store'
import styles from './ItemFilter.module.scss'
import { Search } from '@mui/icons-material'

interface Props {

}

export const ItemFilter: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const filterByHandler = (ev:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(storeActions.setFilterBy(ev.target.value))
    }
    return (
        <div className={styles['item-filter']}>
            <Search className={styles.icon}/>
            <input className={styles.input} onChange={filterByHandler} type="text" placeholder='חפש פריט' />
        </div>
    )
}