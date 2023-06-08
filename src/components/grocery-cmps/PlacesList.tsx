import React, { FormEvent, useEffect, useState } from 'react'
import { ItemList } from './ItemList'
import { Item } from '../../models/item'
import { ProductList } from './ProductList'

interface Props {
    onSearch: (searchTerm:string) => void
    onSetProductsModalPosition: (position: {x:number, y:number}) => void
    productDetails: {title: string, imgUrl: string, barcode: string}
    onAddItem: (itemToAdd: Item, placeId: string) => void
    items: Item[]
    id: string
    title:string
    onDeleteItem: (itemId: string, placeId: string) => void
    onUpdateItem: (itemToUpdate: Item, placeId: string) => void
    onAddItemToShoppingList: (barcode:string, title:string, quantity:number, imgUrl:string) => void

}

export const PlacesList: React.FC<Props> = (props) => {
    const [itemToAdd, setItemToAdd] = useState({ title: '', quantity: 1, expiry: '', imgUrl: '', barcode: '' })
    useEffect(() => {
        let {title, imgUrl, barcode} = props.productDetails
        setItemToAdd({ ...itemToAdd, title, imgUrl, barcode})
    }, [props.productDetails])

    const setItemTitleHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        props.onSearch(ev.target.value)
        setItemToAdd({ ...itemToAdd, title: ev.target.value })
        const inputPosition = {x: ev.target.getBoundingClientRect().x, y: ev.target.getBoundingClientRect().y}
        props.onSetProductsModalPosition(inputPosition)
    }

    const setItemQuantityHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (+ev.target.value < 1){
            return
        }
        setItemToAdd({ ...itemToAdd, quantity: +ev.target.value })
    }

    const setItemExpiryHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setItemToAdd({ ...itemToAdd, expiry: ev.target.value })
    }

    const addItemHandler = (ev: FormEvent) => {
        ev.preventDefault()
        if (!itemToAdd.title || !itemToAdd.barcode) return
        props.onAddItem(itemToAdd, props.id)
        props.onSearch('')
        setItemToAdd({ title: '', quantity: 1, expiry: '', imgUrl: '', barcode: '' })
    }

    const deleteItemHandler = (itemId: string) => {
        props.onDeleteItem(itemId, props.id)
    }

    const updateItemHandler = (itemToUpdate: Item) => {
        props.onUpdateItem(itemToUpdate, props.id)
    }

    const addItemToShoppingListHandler = (barcode:string, title:string, quantity:number, imgUrl:string) => {
        props.onAddItemToShoppingList(barcode, title, quantity, imgUrl)
    }

    return (
        <div className='place flex column'>
            <div className='place-details flex between'>
                <h5>{props.title}</h5>
            </div>
            <div className="item-list">
                <ItemList  onAddItemToShoppingList={addItemToShoppingListHandler} onUpdateItem={updateItemHandler} onDeleteItem={deleteItemHandler} onAddItem={addItemHandler} items={props.items} />
            </div>
            <div className='add-item flex between column'>
                <form onSubmit={addItemHandler} className="add-item-form flex items-center">
                    <div className='inputs flex column'>
                        <div className="title-quantity flex">
                            <input
                                onChange={setItemExpiryHandler}
                                value={itemToAdd.expiry}
                                className='new-item-date'
                                type="date"
                                placeholder='Expiration'
                            />

                            <input
                                onChange={setItemQuantityHandler}
                                value={itemToAdd.quantity}
                                className='new-item-quantity'
                                type="number"
                                placeholder='Quantity'
                            />
                        </div>
                        <input
                            onChange={setItemTitleHandler}
                            value={itemToAdd.title} className='new-item-title'
                            type="text" placeholder='הוסף מוצר'
                        />
                    </div>
                    <button type='submit'>+</button>
                </form>
            </div>
        </div>
    )
}
