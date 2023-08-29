import React from 'react'
import { Item } from '../../models/item';
import styles from './MarketItem.module.scss'

interface Props {
    item: Item
}

export const MarketItem: React.FC<Props> = ({ item }) => {

    const formatPriceILS = (price: number) => {
        const formattedNumber = Number(price).toFixed(2)
        return `₪${formattedNumber}`
    }

    return (
        <li className={styles.li}>
            <h4 className={styles.h4}>{item.title}</h4>
            <h3 className={`${item.price! === 0 ? styles['not-found'] : styles.h3}`}>
                {item.price! > 0 ? formatPriceILS(item.price!) : 'לא נמצא מידע'}
            </h3>
        </li>
    )
}
