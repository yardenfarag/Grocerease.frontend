import React from 'react'
import styles from './MarketList.module.scss'
import { PriceCompare } from '../Forms/PriceCompare'
import { MarketPreview } from '../Previews/MarketPreview'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Market } from '../../models/Market'
import { Loader } from '../UI/Loader'

interface Props {
    onOpenMarketModal: (market: Market) => void
}

export const MarketList: React.FC<Props> = (props) => {
    const markets = useSelector((state: RootState) => state.price.markets)
    const loading = useSelector((state: RootState) => state.price.loading)

    const openMarketModalHandler = (market:Market) => {
        props.onOpenMarketModal(market)
    }

    let sortedMarkets = markets ? [...markets].sort((a, b) => a.branch_name.localeCompare(b.branch_name)) : []

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.h1}>השוואת מחירים</h1>
                <PriceCompare />
                <ul className={styles.ul}>
                    {sortedMarkets && sortedMarkets.map((market: Market) => (
                        <MarketPreview onOpenMarketModal={openMarketModalHandler} key={market._id} market={market} />
                    ))}
                    <div className={styles.loading}>
                    {loading && <Loader height='120px' width='120px' />}
                    </div>
                </ul>
            </div>
        </main>
    );
};
