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
    const user = await httpService.get('auth/loggedinuser', loginToken)
    _saveUser(user)
    return user
}

async function signup(credentials: signupCreds): Promise<{_id:string, fullName: string}> {
    const user = await httpService.post('auth/signup', credentials)
    _saveUser(user)
    return user
}

async function login(credentials: loginCreds): Promise<{_id:string, fullName: string}> {
    console.log('hi');
    
    const user = await httpService.post('auth/login', credentials)
    console.log('user', user);
    
    _saveUser(user)
    return user
}

async function logout(): Promise<void> {
    localStorage.removeItem(USER_KEY)
    return await httpService.post('auth/logout')
}

function _saveUser(user:User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}




