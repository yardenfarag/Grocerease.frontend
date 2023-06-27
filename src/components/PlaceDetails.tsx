import React from 'react'
import { ItemList } from './ItemList'
import { Item } from '../models/item'
import { AddItemForm } from './AddItemForm'

interface Props {
    items: Item[]
    id: string
    title:string
}

export const PlaceDetails: React.FC<Props> = (props) => {

    return (
        <div className='place flex column'>
            <div className='place-details flex between'>
                <h5>{props.title}</h5>
            </div>
            <div className="item-list">
                <ItemList placeId={props.id} items={props.items} />
            </div>
            <AddItemForm placeId={props.id} />
        </div>
    )
}
