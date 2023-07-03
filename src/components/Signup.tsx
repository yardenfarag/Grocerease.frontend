import React, { FormEvent, useState } from 'react'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/index'
import { signup } from '../store/auth'
import { useDispatch } from 'react-redux'
import styles from './Signup.module.scss'


type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
}

export const Signup: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signupHandler = (ev: FormEvent) => {
        ev.preventDefault()
        dispatch(signup({email, password, fullName}))
    }
    return (
        <form className={styles['signup-form']} onSubmit={signupHandler}>
            <h3 className={styles.h3}>הרשמה</h3>
            <input className={styles.input} onChange={(ev) => setFullName(ev.target.value)} type="text" placeholder='שם מלא' />
            <input className={styles.input} onChange={(ev) => setEmail(ev.target.value)} type="text" placeholder='אימייל' />
            <input className={styles.input} onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder='סיסמה' />
            <button type='submit' className={styles.button}>כניסה</button>
        </form>
    )
}