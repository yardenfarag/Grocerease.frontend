import React from 'react'
import styles from './MarketList.module.scss'
import { PriceCompare } from '../Forms/PriceCompare'
import { MarketPreview } from '../Previews/MarketPreview'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Market } from '../../models/Market'
import { Loader } from '../UI/Loader'

export const MarketList = () => {
    const markets = useSelector((state: RootState) => state.price.markets)
    const loading = useSelector((state: RootState) => state.price.loading)
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1>השוואת מחירים</h1>
                <PriceCompare />
                <ul className={styles.ul}>
                    {markets && markets.map((market: Market) => (
                        <MarketPreview key={market._id} market={market} />
                    ))}
                    {loading && <Loader height='50px' width='50px' />}
                </ul>
            </div>
        </main>
    );
};
