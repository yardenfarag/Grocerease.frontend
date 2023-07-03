import React, { FormEvent, useEffect, useState } from 'react'
import { ItemPreview } from './ItemPreview'
import { Item } from '../models/item'
import { useSelector } from 'react-redux'
import styles from './ItemList.module.scss'
import { Droppable, Draggable } from 'react-beautiful-dnd'

interface Props {
    items: Item[]
    placeId: string
}

export const ItemList: React.FC<Props> = (props: any) => {
    let filterBy: { txt: string } = useSelector((state: any) => state.store.filterBy)
    let items = props.items
    useEffect(() => {
        items = props.items.filter((item: Item) => filterBy.txt ? item.title.includes(filterBy.txt) : true)
    }, [filterBy.txt])

    // return (
    //     <>
    //         <Droppable droppableId={props.placeId}>
    //             {(provided) => (
    //                 <div ref={provided.innerRef} {...provided.droppableProps} className={styles.items}>
    //                     {items.map((item: Item, index: number) => {
    //                         return <ItemPreview index={index} placeId={props.placeId} key={item.id} item={item} />
    //                     })}
    //                     {provided.placeholder}
    //                 </div>
    //             )}
    //         </Droppable>
    //     </>
    // )
    return (
        <>
            <div className={styles.items}>
                {items.map((item: Item, index: number) => {
                    return <ItemPreview index={index} placeId={props.placeId} key={item.id} item={item} />
                })}
            </div>
        </>
    )
}
