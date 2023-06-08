import React, { useEffect } from 'react'
import { Login } from '../components/Login'
import { userActions } from '../store/user'
import { useDispatch, useSelector } from 'react-redux'
import { User } from '../models/user'
import { RootState } from '../store/index'
import { useNavigate } from 'react-router-dom'
import { storeActions } from '../store/store'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector<RootState, User | null>(state => state.user.loggedInUser)
  const loginHandler = (email: string, password: string) => {
    dispatch(userActions.login({ email, password }))
  }
  useEffect(() => {
    if (user && user._id !== undefined) {
      navigate('/store')
      dispatch(storeActions.setStores(user._id))
    }
  },[user?._id])
  return (
    <div className='login-page'>
      <Login onLogin={loginHandler} />
    </div>
  )
}
