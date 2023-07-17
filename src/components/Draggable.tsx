import React, { ReactNode } from 'react';
import {useDraggable} from '@dnd-kit/core';

interface Props {

}

type PropsWithChildren<P> = P & { children?: ReactNode };

export const Draggable: React.FC<PropsWithChildren<Props>> =(props) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable',
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    // <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
    <>
      {props.children}
    </>
    // </button>
  );
}