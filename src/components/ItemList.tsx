import React, { FormEvent, useState } from 'react'
import { ItemPreview } from './ItemPreview'
import { Item } from '../models/item'
import { useSelector } from 'react-redux'

interface Props {
    items: Item[]
    placeId: string
}

export const ItemList: React.FC<Props> = (props: any) => {
    let filterBy: {txt:string} = useSelector((state: any) => state.store.filterBy)
    return (
        <div className="items flex column">
            {props.items.filter((item: Item) => filterBy.txt ? item.title.includes(filterBy.txt): true)
            .map((item: Item) => {
                return (
                    <ItemPreview placeId={props.placeId} key={item.id} item={item}/>
                )
            })}
            
        </div>
    )
}
