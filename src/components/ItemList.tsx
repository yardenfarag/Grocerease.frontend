import React from 'react'
import { ItemPreview } from './ItemPreview'
import { Item } from '../models/item'
import { useSelector } from 'react-redux'
import styles from './ItemList.module.scss'
import { RootState } from '../store'

interface Props {
    items?: Item[]
}

export const ItemList: React.FC<Props> = (props) => {
    let itemsView = useSelector((state: RootState) => state.settings.view)
    let filterBy: { txt: string } = useSelector((state: RootState) => state.store.filterBy)

    const filteredItems = !filterBy.txt
  ? props.items
  : props.items?.filter((item: Item) => item.title.includes(filterBy.txt) || item.place?.includes(filterBy.txt))

    return (
        <>
            <ul className={itemsView === 'list' ? styles.items : styles.cards}>
                {filteredItems?.map((item: Item, index: number) => {
                    return <ItemPreview index={index} key={item.id} item={item} />
                })}
            </ul>
        </>
    )
}
