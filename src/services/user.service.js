import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'


const BASE_URL = '/user'

export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
    save
}


function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(userId) {
    return httpService.get(BASE_URL + userId)
}

// function remove(toyId) {
//     return httpService.delete(BASE_URL + toyId)
// }

function login({ username, password }) {
    // return storageService.query(STORAGE_KEY)
    // return httpService.get(BASE_URL, filterBy)
    return httpService.post('/login')
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return user
            // if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

export function save(user) {
    // console.log(user, activity);
    // user.activities.push(activity)
    return httpService.put(BASE_URL, user)
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    // user.createdAt = user.updatedAt = Date.now()
    // user.balance = 0
    // return httpService.post(BASE_URL, user)
    return httpService.post('/signup')
    // return httpService.post('/signup', { username, password, fullname })
        .then(user => user)
    // .then(_setLoggedinUser)

}

function logout() {
    return httpService.post('/logout')
    .then(() => null)
    // .then(() => console.log('logging out se');
    //   })
    //   .catch((error) => {
    //     console.error('Error logging out:', error);
    //   }); 
    //  return Promise.resolve()
}



function getLoggedinUser() {
    return httpService.get('/session') // Implement this route to return session data
        .then(response => response.data);
}
    // return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))


// function _setLoggedinUser(user) {
//     const userToSave = {
//         _id: user._id, fullname: user.fullname,
//     }
//     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
//     return userToSave
// }

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