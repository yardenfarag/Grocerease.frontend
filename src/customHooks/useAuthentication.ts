import { useEffect } from 'react'
import Cookies from "js-cookie"
import { useDispatch } from 'react-redux'
import { getLoggedInUser, login } from '../store/auth'
import { AnyAction, AsyncThunkAction, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../store'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>

const useAuthentication = () => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        const loginToken = Cookies.get('loginToken')
        if (loginToken) {
            dispatch(getLoggedInUser)
        } else {
            
        }
    }, [])
}

export default useAuthentication
