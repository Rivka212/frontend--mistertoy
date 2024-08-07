import { utilService } from '../../services/util.service.js'
import { userService } from '../../services/user.service.js'
import { UPDATE_USER, SET_USER } from '../reducers/user.reducer.js'
import { store } from "../store.js"

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}


export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}


export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
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