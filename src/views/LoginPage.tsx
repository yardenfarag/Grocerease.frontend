import React, { useEffect } from 'react'
import { Login } from '../components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { User } from '../models/user'
import { RootState } from '../store/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { getStores } from '../store/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { Signup } from '../components/Signup'
import styles from './LoginPage.module.scss'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const LoginPage = () => {
  const location = useLocation()
  const url = location.pathname.split('/')[1]
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector<RootState, User | null>(state => state.auth.user)
  useEffect(() => {
    if (user && user._id !== undefined) {
      navigate('/store')
      dispatch(getStores())
    }
  }, [user?._id])
  return (
    <div className={styles['login-signup']}>
      <div className={styles.hero}>
        <img className={styles.img} src="https://res.cloudinary.com/dfz8mxb4f/image/upload/v1689103690/Untitled_design_7_onzhg2.png" alt="hero" />
      </div>
      <div className={styles.content}>
        {url === 'login' && <Login />}
        {url === 'signup' && <Signup />}
      </div>
    </div>
  )
}
