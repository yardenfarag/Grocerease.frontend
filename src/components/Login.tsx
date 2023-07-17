import React, { FormEvent, useState } from 'react'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/index'
import { login } from '../store/auth'
import styles from './Login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Loader } from './Loader'


type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
}

export const Login: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch()
    const loading = useSelector((state:RootState) => state.auth.loading)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginHandler = (ev: FormEvent) => {
        ev.preventDefault()
        dispatch(login({ email, password }))
    }
    const setEmailHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(ev.target.value)
    }
    const setPasswordHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(ev.target.value)
    }
    return (
        <form onSubmit={loginHandler} className={styles.form}>
            <h1 className={styles.h1}>התחברות</h1>
            <label className={styles.label}>אימייל
            <input className={styles.input} onChange={setEmailHandler} type="text" placeholder='example@email.com' />
            </label>
            <label className={styles.label}>סיסמה
            <input className={styles.input} onChange={setPasswordHandler} type="password" placeholder='*************' />
            </label>
            <button disabled={(!email || !password)} type='submit' className={styles.button}>{loading ? <Loader/> : 'כניסה'}</button>
            <span className={styles.span}>אין לך חשבון? <Link className={styles.link} to='/signup'>לחץ כאן כדי להירשם</Link></span>
        </form>
    )
}
