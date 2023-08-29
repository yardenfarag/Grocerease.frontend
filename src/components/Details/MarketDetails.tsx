import React from 'react'
import styles from './MarketDetails.module.scss'
import { Close } from '@mui/icons-material'
import { Market } from '../../models/Market'
import { Item } from '../../models/item'
import { MarketItem } from '../Previews/MarketItem'

interface Props {
    onToggleModal: () => void
    market: Market
}

export const MarketDetails: React.FC<Props> = ({ onToggleModal, market }) => {
    const closeModalHandler = () => {
        onToggleModal()
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
                        {market.items?.map((item: Item) => <MarketItem key={item.barcode} item={item}/>)}
                    </ul>
                </article>}
            </main>
        </>
    )
}
