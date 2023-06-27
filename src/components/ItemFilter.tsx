import React from 'react'
import { useDispatch } from 'react-redux'
import { storeActions } from '../store/store'

export const ItemFilter = () => {
    const dispatch = useDispatch()
    const filterByHandler = (ev:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(storeActions.setFilterBy(ev.target.value))
    }
    return (
        <div className="item-filter">
            <input onChange={filterByHandler} type="text" placeholder='חפש פריט' />
        </div>
    )
}