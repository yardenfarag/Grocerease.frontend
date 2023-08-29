import { httpService } from './http.service'
import { loginCreds, signupCreds } from '../models/auth'
import Cookies from "js-cookie"
import { User } from '../models/user'


export const userService = {
    getLoggedInUser,
    signup,
    login,
    logout
}

export const USER_KEY = 'loggedInUser'

async function getLoggedInUser(): Promise<{_id:string, fullName: string}> {
    const loginToken = Cookies.get('loginToken')
    const user = await httpService.get('auth/loggedInUser', {loginToken})
    return user
}

async function signup(credentials: signupCreds): Promise<{_id:string, fullName: string}> {
    const user = await httpService.post('auth/signup', credentials)
    return user
}

async function login(credentials: loginCreds): Promise<{_id:string, fullName: string}> {
    const user = await httpService.post('auth/login', credentials)  
    return user
}

async function logout(): Promise<void> {
    return await httpService.post('auth/logout')
}



