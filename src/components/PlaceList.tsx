import React from 'react'
import { Place } from '../models/place'
import { PlaceDetails } from './PlaceDetails'
import styles from './PlaceList.module.scss'
import { useDroppable, DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { AddPlace } from './AddPlace'

interface Props {
    places?: Place[]
}

export const PlaceList: React.FC<Props> = ({ places }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };
    const dragEndHandler = (ev: DragEndEvent) => {
        console.log('drag end: ' + ev);
        
    }
    const dragStartHandler = (result: DragStartEvent) => {
        console.log('start:' + result)
      }
    return (
        // <DndContext onDragEnd={dragEndHandler} onDragStart={dragStartHandler}>
            <div ref={setNodeRef} className={styles['place-list']}>
                {places?.map((place: Place, index: number) => {
                    return (
                        <PlaceDetails index={index} key={place.id} id={place.id} title={place.title} items={place.items} />
                    )
                })}
                <AddPlace />
            </div>
        // </DndCont.ext>
    )
}
