import React, { FormEvent, useState } from 'react'
import { ItemPreview } from './ItemPreview'
import { Form } from 'react-router-dom'
import { Item } from '../../models/item'
import { useSelector } from 'react-redux'

export const ItemList = (props: any) => {
    let filterBy: {txt:string} = useSelector((state: any) => state.store.filterBy)
    const deleteItemHandler = (itemId:string) => {
        props.onDeleteItem(itemId)
    }
    const updateItemHandler = (itemToUpdate: Item) => {
        props.onUpdateItem(itemToUpdate)
    }
    const addItemToShoppingListHandler = (barcode:string, title:string, quantity:number, imgUrl:string) => {
        props.onAddItemToShoppingList(barcode, title, quantity, imgUrl)
    }
    return (
        <div className="items flex column">
            {props.items.filter((item: Item) => filterBy.txt ? item.title.includes(filterBy.txt): true)
            .map((item: Item) => {
                return (
                    <ItemPreview onAddItemToShoppingList={addItemToShoppingListHandler} onUpdateItem={updateItemHandler} onDeleteItem={deleteItemHandler} key={item.id} item={item}/>
                )
            })}
            
        </div>
    )
}
