import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { loginCreds, signupCreds } from '../models/auth'
import { USER_KEY, userService } from '../services/user.service'
import { User } from '../models/user'



const persistedUser = JSON.parse(sessionStorage.getItem('user') || 'null')


export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: signupCreds) => {
    try {
      return await userService.signup(credentials)
    } catch (error) {
      throw error
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: loginCreds) => {
    try {
      return await userService.login(credentials)
    } catch (error) {
      throw error
    }
  }
)

export const getLoggedInUser = createAsyncThunk(
  'auth/loggedinuser',
  async () => {
    try {
      return await userService.getLoggedInUser()
    } catch (error) {
      if (typeof error === 'string') {
        console.error(error)
      } else if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('An unknown error occurred')
      }
      throw error
    }
  }
)

interface AuthState {
  user: User | null
  isLoggedIn: boolean
  loading: boolean
  error: boolean
}

const initialState: AuthState = {
  user: persistedUser,
  isLoggedIn: false,
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      userService.logout()
      state.user = null
      state.loading = false
      state.isLoggedIn = false
      state.error = false
      sessionStorage.removeItem('user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoggedIn = true
        state.loading = false
        state.error = false
        sessionStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(signup.pending, (state) => {
        state.loading = true
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false
        state.isLoggedIn = false
        state.error = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoggedIn = true
        state.loading = false
        state.error = false
        sessionStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
        state.isLoggedIn = false
        state.error = true
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoggedIn = true
        state.loading = false
        state.error = false
        sessionStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(getLoggedInUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getLoggedInUser.rejected, (state) => {
        state.loading = false
        state.isLoggedIn = false
        state.error = true
      })
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
