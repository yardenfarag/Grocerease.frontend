import React, { FocusEventHandler, FormEvent, useState } from 'react'
import { ItemList } from './ItemList'
import { Item } from '../models/item'
import { AddItemForm } from './AddItemForm'
import styles from './PlaceDetails.module.scss'
// import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { storeActions } from '../store/store'
import { Add, Delete, DeleteForever, RemoveCircle, RemoveCircleOutline } from '@mui/icons-material'
import { DndContext, DragEndEvent, useDraggable } from '@dnd-kit/core'
import { Draggable } from './Draggable'
import { Droppable } from './Droppable'
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

interface Props {
    items: Item[]
    id: string
    title: string
    index: number
}

export const PlaceDetails: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const [placeTitle, setPlaceTitle] = useState(props.title)
    const [isAddItemForm, setIsAddItemForm] = useState(false)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: props.id})
    // const {attributes, listeners, setNodeRef, transform} = useDraggable({
    //     id: 'draggable',
    //   });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };
    // const { isOver, setNodeRef } = useDroppable({
    //     id: 'droppable',
    // });
    // const style = {
    //     color: isOver ? 'green' : undefined,
    // };
    const dragEndHandler = (result: DragEndEvent) => {
        console.log('result: ', result)
    }
    const blurHandler: React.FocusEventHandler<HTMLHeadingElement> = (ev) => {
        if (!ev.target.outerText) {
            setPlaceTitle(props.title)
            dispatch(storeActions.updatePlaceTitle({ placeId: props.id, placeTitle: props.title }))
            return
        }
        if (ev.target.outerText.length <= 30) {
            setPlaceTitle(ev.target.innerText)
            dispatch(storeActions.updatePlaceTitle({ placeId: props.id, placeTitle: ev.target.innerText }))
        }
    }
    const deletePlaceHandler = () => {
        // TODO: enable deletion of places
    }
    return (
        <>
            <div style={style} {...listeners} {...attributes} className={styles.place}>
                <div className={styles['place-details']}>
                    <h5 suppressContentEditableWarning={true} contentEditable onBlur={blurHandler} className={styles.h5}>{placeTitle}</h5>
                    <span className={styles.span} onClick={() => {setIsAddItemForm(!isAddItemForm)}} ><Add/></span>
                </div>
                {/* <DndContext onDragEnd={dragEndHandler}> */}
                    <div className={styles['item-list']}>
                        <ItemList placeId={props.id} items={props.items} />
                    </div>
                {/* </DndContext> */}
                {isAddItemForm && <AddItemForm placeId={props.id} />}
            </div>
        </>
    )
}
