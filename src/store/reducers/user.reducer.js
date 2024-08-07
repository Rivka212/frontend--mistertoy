import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'

// export const SET_FILTER_BY = 'SET_FILTER_BY'


const initialState = {
    user: userService.getLoggedinUser(),
    users: [],
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_USER:
            return { ...state, user: action.user }
        case UPDATE_USER:
            var users = state.users.map(user => user._id === action.user._id ? action.user : user)
            return { ...state, users }
        case REMOVE_USER:
            var users = state.users.filter(user => user._id !== action.userId)
            return { ...state, users }
        case SET_USERS:
            return { ...state, users: action.users }
            break
        default:
            return state
    }
}
