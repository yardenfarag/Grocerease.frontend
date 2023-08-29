import React, { useState } from 'react'
import { Item } from '../../models/item'
import { useSelector } from 'react-redux'
import styles from './ItemList.module.scss'
import { RootState } from '../../store'
import { ItemPreview } from '../Previews/ItemPreview'
import { ItemFilter } from '../Forms/ItemFilter'
import { utilService } from '../../services/util.service'

interface Props {
    items: Item[]
}

export const ItemList: React.FC<Props> = (props) => {
    let filterBy: { txt: string, expiry: string } = useSelector((state: RootState) => state.store.filterBy)

    let filteredItems = !filterBy.txt && filterBy.expiry === 'none'
        ? props.items
        : props.items?.filter((item: Item) =>
            (item.title.includes(filterBy.txt) || item.place?.includes(filterBy.txt))
        )

    if (filterBy.expiry !== 'none') {
        filteredItems = filteredItems.filter((item: Item) => {
            return (
                filterBy.expiry === 'red' && utilService.calculateDays(item.expiry!) < -1 ||
                filterBy.expiry === 'orange' && utilService.calculateDays(item.expiry!) === -1 ||
                filterBy.expiry === 'yellow' && utilService.calculateDays(item.expiry!) > 0 && utilService.calculateDays(item.expiry!) < 3 ||
                filterBy.expiry === 'white' && utilService.calculateDays(item.expiry!) > 2
            )
        })
    }

    return (
        <>
            {props.items.length === 0 && <h2>לא נמצאו פריטים</h2>}
            {props.items.length !== 0 && <div className={styles.wrapper}>
                <ItemFilter />
                <ul className={styles.ul}>
                    {filteredItems.map((item: Item) => (
                        <ItemPreview key={item.id} item={item} />
                    ))}
                </ul >
            </div>}
        </>
    )
}
