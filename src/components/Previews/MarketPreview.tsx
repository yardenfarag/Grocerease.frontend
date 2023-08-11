import React from 'react'
import styles from './MarketPreview.module.scss'
import { Item } from '../../models/item'
import { Market } from '../../models/Market'

interface Props {
    market: Market
    onOpenMarketModal: (market: Market) => void
}

export const MarketPreview: React.FC<Props> = (props) => {
    const { market } = props
    let totalPrice = market.items?.reduce((total: number, item: Item) => (item.totalPrice ? total + item.totalPrice : total), 0)

    const getItemCount = () => {
        if (!market.items) return
        let count = market.items?.length
        market.items?.forEach((item: Item) => {
            if (item.price === 0) {
                count--
            }
        })
        return `${count} מתוך ${market.items?.length}`
    }

    const formatPriceILS = (price: number) => {
        const formattedNumber = Number(price).toFixed(2)
        return `₪${formattedNumber}`
    }

    const openMarketModalHandler = () => {
        props.onOpenMarketModal(market)
    }

    return (
        <li onClick={openMarketModalHandler} className={styles.li}>
            <div className={styles['market-info']}>
                <div className={styles.details}>
                    <img className={styles.img} src={market.imgUrl ? market.imgUrl : 'https://e7.pngegg.com/pngimages/92/781/png-clipart-computer-icons-user-profile-avatar-avatar-heroes-profile-thumbnail.png'} alt="Market" />
                    <div className={styles.div}>
                        <h3 className={styles.h3}>{market.branch_brand}</h3>
                        <p className={styles.p}>סניף {market.branch_name}</p>
                    </div>
                </div>
                <p className={styles['item-count']}>נמצא מידע על {getItemCount()} מוצרים</p>
                <div className={styles.price}>
                    <h3 className={styles.h3}>מחיר הסל</h3>
                    <h1 className={styles.h1}>{formatPriceILS(totalPrice || 0)}</h1>
                </div>
            </div>
        </li>
    )
}

