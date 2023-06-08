import React, { FormEvent, useEffect, useState } from 'react'
import { Grocery } from '../models/grocery'
import { GroceryItemPreview } from './GroceryItemPreview'

const API_KEY = 'AIzaSyA70GiVeyzjJ00yQA7RYG3W82AWiX6J_6g'

export const ShoppingList = (props: any) => {
    const [groceryTitle, setGroceryTitle] = useState('')
    const [position, setPosition] = useState({ lat: 0, lng: 0 })
    const [curLoc, setCurLoc] = useState('')
    const getLocation = async () => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${API_KEY}`
        await fetch(url).then(res => res.json().then(res => setCurLoc(res.results[0].formatted_address)))
        console.log(position);
    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }))
        getLocation()

    }, [])
    const deleteGroceryHandler = (groceryId: string) => {
        props.onDeleteGrocery(groceryId)
    }
    const addItemToShoppingListHandler = (ev: FormEvent) => {
        ev.preventDefault()
        if (!groceryTitle) return
        props.onAddGroceryToShoppingList(groceryTitle)
        setGroceryTitle('')
    }
    const setGroceryTitleHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setGroceryTitle(ev.target.value)
    }
    return (
        <div className="shopping-list">
            <div className="shopping-list-header flex items-center between">
                <h1>רשימת קניות</h1>
                <span className='close-shopping-list'>X</span>
            </div>
            <ul className='clean-list flex column'>
                {props.shoppingList?.map((item: Grocery) => <GroceryItemPreview key={item.barcode} onDeleteGrocery={deleteGroceryHandler} item={item} />)}
            </ul>
            <form onSubmit={addItemToShoppingListHandler} className='flex'>
                <input value={groceryTitle} onChange={setGroceryTitleHandler} type="text" placeholder='הוסף פריט לרשימה' />
                <button className='add-grocery-btn' type='submit'>הוסף</button>
            </form>
            <button className='compare-btn'>השווה מחירים (בקרוב...)</button>
            <p>מיקום:</p>
            {curLoc && <p>{JSON.stringify(curLoc)}</p>}
        </div>
    )
}
