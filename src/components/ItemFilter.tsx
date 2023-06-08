import React from 'react'
import { useDispatch } from 'react-redux'
import { storeActions } from '../store/store'

export const ItemFilter = () => {
    const dispatch = useDispatch()
    const filterByHandler = (ev:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(storeActions.setFilterBy(ev.target.value))
    }
    return (
        <div className="item-filter">
            <input onChange={filterByHandler} type="text" placeholder='חפש פריט' />
        </div>
    )
}

// better way?

// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { storeActions } from '../store/store'

// export const ItemFilter = () => {
//     const [filterValue, setFilterValue] = useState(''); // add state for input value
//     const dispatch = useDispatch()
//     const filterByHandler = (ev:React.ChangeEvent<HTMLInputElement>) => {
//         setFilterValue(ev.target.value); // update input value state
//         dispatch(storeActions.setFilterBy(ev.target.value))
//     }
//     return (
//         <div className="item-filter">
//             <input
//                 type="text"
//                 placeholder='חפש פריט'
//                 value={filterValue} // pass state value as prop
//                 onChange={filterByHandler}
//             />
//         </div>
//     )
// }