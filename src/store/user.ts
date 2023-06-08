import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { userService } from '../services/user.service'
import { User } from '../models/user'

const initialUserState = {loggedInUser: userService.getUser() || null}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        login: (state, action:PayloadAction<{email:string, password:string}>) => {
            const {email, password} = action.payload
            userService.login(email, password)
            state.loggedInUser = userService.getUser()
        },
        signup: (state, action:PayloadAction<{fullName:string, email:string, password:string}>) => {
            const {fullName, email, password} = action.payload
            userService.signup({fullName, email, password})
            state.loggedInUser = userService.getUser()
        },
        logout: (state, action) => {
            userService.logout()
            state.loggedInUser = null
        }
    }
})

export const userActions = userSlice.actions

export default userSlice.reducer