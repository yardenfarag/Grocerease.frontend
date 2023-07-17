import React, { FormEvent, useState } from 'react'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store/index'
import { signup } from '../store/auth'
import { useDispatch } from 'react-redux'
import styles from './Signup.module.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader } from './Loader'


type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
}

export const Signup: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch()
    const loading = useSelector((state:RootState) => state.auth.loading)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email)
    }
    const isValidPassword = (password: string) => {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)
    }

    const signupHandler = (ev: FormEvent) => {
        ev.preventDefault()
        dispatch(signup({ email, password, fullName }))
    }

    const setFullNameHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if(ev.target.value.length < 2) {
            setError('שם לא תקין')
        } else setError('')
        setFullName(ev.target.value)
    }
    const setEmailHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!isValidEmail(ev.target.value)) {
            setError('אימייל לא תקין')
        } else {
            setError('')
        }
        setEmail(ev.target.value)
    }
    const setPasswordHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!isValidPassword(ev.target.value)) {
            setError('הסיסמה חייבת להיות מעל 6 תווים ולכלול מספרים ואותיות')
        } else {
            setError('')
        }
        setPassword(ev.target.value)
    }
    return (
        <form onSubmit={signupHandler} className={styles.form}>
            <h1 className={styles.h1}>הרשמה</h1>
            <label className={styles.label}>שם מלא
                <input className={styles.input}
                    onChange={setFullNameHandler}
                    type="text"
                    minLength={2}
                    required
                    placeholder='ישראל ישראלי' />
            </label>
            <label className={styles.label}>אימייל
                <input className={styles.input}
                    onChange={setEmailHandler}
                    type="text"
                    required
                    placeholder='example@email.com' />
            </label>
            <label className={styles.label}>סיסמה
                <input className={styles.input}
                    onChange={setPasswordHandler}
                    type="password"
                    minLength={6}
                    required
                    placeholder='*************' />
            </label>
            {error && <p className={styles.p}>{error}</p>}
            <button disabled={(!fullName || !email || !password || !!error)} type='submit' className={styles.button}>{loading ? <Loader/> : 'כניסה'}</button>
            <span className={styles.span}>כבר יש לך חשבון?
                <Link className={styles.link} to='/login'>לחץ כאן כדי להתחבר</Link>
            </span>
        </form>
    )
}