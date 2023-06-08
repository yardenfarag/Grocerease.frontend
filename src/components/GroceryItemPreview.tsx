import { RemoveCircleOutline } from '@mui/icons-material'
import React, { useState } from 'react'

export const GroceryItemPreview = (props: any) => {
    const { barcode, title, imgUrl, quantity } = props.item
    const [isHovered, setIsHovered] = useState(false)
    const deleteGroceryHandler = () => {
        props.onDeleteGrocery(barcode)
    }
    return (
        <li className='flex between' key={barcode}>
            <div className='flex items-center'>
                <RemoveCircleOutline onClick={deleteGroceryHandler}/>
                <p>{title}</p>
            </div>
            <p>{quantity}</p>
        </li>
    )
}
