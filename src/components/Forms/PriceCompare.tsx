import React, { FormEvent, useEffect, useState } from 'react'
import styles from './PriceCompare.module.scss'
import { useDispatch } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { getPrices } from '../../store/price'
import { useSelector } from 'react-redux'
import { AutoComplete } from './AutoComplete'
import { utilService } from '../../services/util.service'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>

export const PriceCompare = () => {
    const dispatch: AppDispatch = useDispatch()
    const store = useSelector((state: RootState) => state.store.curStore)
    const [coords, setCoords] = useState({ lat: 0, lng: 0 })
    const [radius, setRadius] = useState(5)
    const [key, setKey] = useState('')

    useEffect(() => {
        utilService.getKey('GOOGLE_API_KEY')
            .then(res => setKey(res))
            .catch(err => setKey(''))
    }, [])


    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault()
        dispatch(getPrices({ pos: coords, rad: radius, items: store?.shoppingList }))
    }

    const placeChangeHandler = (pos: { lat?: number, lng?: number }) => {
        if (pos?.lat && pos?.lng) {
            setCoords({ lat: pos.lat, lng: pos.lng })
        } else {
            setCoords({ lat: 0, lng: 0 })
        }
    }

    return (
        <>
            {key &&
                <form onSubmit={submitHandler} className={styles.form}>
                    <AutoComplete apiKey={key} onPlaceChange={placeChangeHandler} />
                    <select className={styles.select} onChange={(ev) => setRadius(+ev.target.value)}>
                        <option disabled defaultValue='10'>רדיוס</option>
                        <option value="5">5 ק"מ</option>
                        <option value="10">10 ק"מ</option>
                        <option value="15">15 ק"מ</option>
                        <option value="20">20 ק"מ</option>
                        <option value="30">30 ק"מ</option>
                        <option value="40">40 ק"מ</option>
                        <option value="50">50 ק"מ</option>
                    </select>
                    <button className={styles.button} type='submit'><span className={styles.icon}>השוואה</span></button>
                </form>
            }
        </>
    )
}
