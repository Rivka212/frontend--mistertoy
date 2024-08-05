import { utilService } from '../services/util.service.js'
import { userService } from '../../services/user.service.js'
import { UPDATE_USER, SET_USER } from '../reducers/user.reducer.js'
import { store } from "../store.js"

export function signup(credentials) {
    return userService.signup(credentials)
        .then(loggedinUser => store.dispatch({ type: SET_USER, loggedinUser }))
}

export function login(credentials) {
    return userService.login(credentials)
        .then(loggedinUser => store.dispatch({ type: SET_USER, loggedinUser }))
}

export function logout() {
    return userService.logout()
        .then(() => store.dispatch({ type: SET_USER, loggedinUser: null }))
}

export function updateUser(user, activity) {
    console.log(user, activity);
    const type = UPDATE_USER
    activity.at = utilService.getCurrentTimestamp()
    console.log(activity.at);
    console.log('user', user);
    return userService.save(user, activity)
        .then(updateUser => {
            store.dispatch({ type, user: updateUser })
            return updateUser
        })
        .catch(e => {
            console.log('cant save user, ', e);
        })
}
