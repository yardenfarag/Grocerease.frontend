import React, { useEffect } from 'react'
import { Login } from '../components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { User } from '../models/user'
import { RootState } from '../store/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { getStores } from '../store/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { login, signup } from '../store/auth'
import { Signup } from '../components/Signup'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const LoginPage = () => {
  const location = useLocation()
  const url = location.pathname.split('/')[1]
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector<RootState, User | null>(state => state.auth.user)
  const loginHandler = (email: string, password: string) => {
    dispatch(login({ email, password }))
  }
  const signupHandler = (email: string, password: string, fullName: string) => {
    dispatch(signup({email, password, fullName}))
  }
  useEffect(() => {
    if (user && user._id !== undefined) {
      navigate('/store')
      dispatch(getStores())
    }
  }, [user?._id])
  return (
    <div className='login-page'>
      { url === 'login' && <Login onLogin={loginHandler} />}
      { url === 'signup' && <Signup onSignup={signupHandler} />}
    </div>
  )
}
