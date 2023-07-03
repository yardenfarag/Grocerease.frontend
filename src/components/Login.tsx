import React, { FormEvent, useState } from 'react'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/index'
import { login } from '../store/auth'
import styles from './Login.module.scss'
import { useDispatch } from 'react-redux'


type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
}

export const Login: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginHandler = (ev: FormEvent) => {
        ev.preventDefault()
        dispatch(login({ email, password }))
    }
    return (
        <form className={styles['login-form']} onSubmit={loginHandler}>
            <h3 className={styles.h3}>התחברות</h3>
            <input className={styles.input} onChange={(ev) => setEmail(ev.target.value)} type="text" placeholder='אימייל' />
            <input className={styles.input} onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder='סיסמה' />
            <button className={styles.button} type='submit'>כניסה</button>
        </form>
    )
}
