import React, { useState } from 'react'
import { Item } from '../../models/item'
import { useSelector } from 'react-redux'
import styles from './ItemTable.module.scss'
import { RootState } from '../../store'
import { ItemTr } from './ItemTr'
import { ItemFilter } from '../Forms/ItemFilter'
import { utilService } from '../../services/util.service'

interface Props {
    items: Item[]
}

export const ItemTable: React.FC<Props> = (props) => {
    // let itemsView = useSelector((state: RootState) => state.settings.view)
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
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr className={styles.tr}>
                            <th id='שם' className={styles.th}>שם</th>
                            <th id='מיקום' className={styles.th}>מיקום</th>
                            <th id='כמות' className={styles.th}>כמות</th>
                            <th id='ת.תפוגה' className={styles.th}>ת.תפוגה</th>
                            <th id='פעולות' className={styles.th}>פעולות</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {filteredItems.map((item: Item) => (
                            <ItemTr key={item.id} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>}
        </>
    )
}
