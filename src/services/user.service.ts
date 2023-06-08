import { User } from '../models/user'
import { storageService } from './storage.service'
import { utilService } from './util.service'

export const userService = {
    getUser,
    signup,
    login,
    logout,
    getUsers
}

const USERS = [
    {
        _id: 'u1',
        fullName: 'Snail',
        email: 'snail@gmail.com',
        password: 'password'
    },
    {
        _id: 'u2',
        fullName: 'Panda',
        email: 'panda@gmail.com',
        password: 'password'
    }
]

const USER_KEY = 'user_db'

function getUsers() {
    return USERS
}

function getUser() {
    return storageService.load(USER_KEY)
}

function signup(user:User) {
    user._id = utilService.makeId()
    storageService.store(USER_KEY, user)
}

function login(email:string, password:string) {
    const user = USERS.find((user:User) => user.email === email && user.password === password)
    if (!user) {
        console.log('error: user not found')
        return
    }
    storageService.store(USER_KEY, user)
}

function logout() {
    localStorage.removeItem(USER_KEY)
}




