import React, { ReactNode } from 'react';
import {useDroppable} from '@dnd-kit/core';

interface Props {

}

type PropsWithChildren<P> = P & { children?: ReactNode };

export const Droppable: React.FC<PropsWithChildren<Props>> = (props) => {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    // <div ref={setNodeRef} style={style}>
    <>
      {props.children}
    </>
    // </div>
  );
}