import React, { FocusEventHandler, FormEvent, useState } from 'react'
import { ItemList } from './ItemList'
import { Item } from '../models/item'
import { AddItemForm } from './AddItemForm'
import styles from './PlaceDetails.module.scss'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { storeActions } from '../store/store'
import { Delete, DeleteForever, RemoveCircle, RemoveCircleOutline } from '@mui/icons-material'

interface Props {
    items: Item[]
    id: string
    title: string
    index: number
}

export const PlaceDetails: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const [placeTitle, setPlaceTitle] = useState(props.title)
    const dragEndHandler = (result: DropResult) => {
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
            <Draggable draggableId={props.id!} index={props.index}>
                {(provided) => (
                    <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className={styles.place}>
                        <div className={styles['place-details']}>
                            <h5 suppressContentEditableWarning={true} contentEditable onBlur={blurHandler} className={styles.h5}>{placeTitle}</h5>
                            {/* <span onClick={deletePlaceHandler} className={styles['close-shopping-list']}><RemoveCircleOutline/></span> */}
                        </div>
                        <DragDropContext onDragEnd={dragEndHandler}>
                            <Droppable droppableId={props.id}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps} className={styles['item-list']}>
                                        <ItemList placeId={props.id} items={props.items} />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <AddItemForm placeId={props.id} />
                    </div>
                )}
                
            </Draggable>
        </>
    )
}
