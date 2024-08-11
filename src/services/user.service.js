import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

const BASE_URL = 'user/'

export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getUsers,
    getEmptyCredentials,
    save,
    remove
}


function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getUsers() {
    return httpService.get(BASE_URL)
}

function getById(userId) {
    return httpService.get(BASE_URL + userId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}


export function save(user) {
    return httpService.put(BASE_URL, user)
}

async function login(userCred) {
    console.log(userCred);
    try {
        const user = await httpService.post('auth/login', userCred)
        try {
            return _saveLocalUser(user)
        } catch (error) {
            throw new Error('there was a problem')
        }
    } catch (error) {
        throw new Error('there was a problem')
    }

    // const user = await httpService.post('auth/login', credentials)
    // if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
    console.log(userCred);
    try {
        const newUser = await httpService.post('auth/signup', userCred)
        return _saveLocalUser(newUser)
    } catch (error) {
        throw new Error('there was a problem signing up')
    }
}


async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
// }