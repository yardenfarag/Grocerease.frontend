import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useDispatch } from 'react-redux'
import styles from './MarketDetails.module.scss'
import { Close } from '@mui/icons-material'
import { Market } from '../../models/Market'
import { Item } from '../../models/item'

interface Props {
    onToggleModal: () => void
    market: Market
}

export const MarketDetails: React.FC<Props> = (props) => {
    const market = props.market
    const closeModalHandler = () => {
        props.onToggleModal()
    }
    const formatPriceILS = (price: number) => {
        const formattedNumber = Number(price).toFixed(2)
        return `₪${formattedNumber}`
    }
    return (
        <>
            <main className={styles.main}>
                {market && <article className={styles.container}>
                    <header className={styles.header}>
                        <div className={styles.div}>
                            <img className={styles.img} src={market.imgUrl} alt="" />
                            <h1 className={styles.h1}>{market.branch_brand} סניף {market.branch_name}</h1>
                        </div>
                        <Close onClick={closeModalHandler} className={styles.icon} />
                    </header>
                    <hr className={styles.hr}/>
                    <ul className={styles.ul}>
                        {market.items?.map((item: Item) => <li className={styles.li} key={item.barcode}>
                            <h4 className={styles.h4}>{item.title}</h4>
                            <h3 className={styles.h3}>{item.price! > 0 ? formatPriceILS(item.price!) : 'לא נמצא מידע'}</h3>
                        </li>)}
                    </ul>
                </article>}
            </main>
        </>
    )
}
