import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'

// export const SET_FILTER_BY = 'SET_FILTER_BY'


const initialState = {
    loggedinUser: userService.getLoggedinUser(),
    // filterBy: todoService.getDefaultFilter()
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_USER:
            return { ...state, loggedinUser: action.loggedinUser }
        case UPDATE_USER:
            var users = state.users.map(user => user._id === action.user._id ? action.user : user)
            return { ...state, users }

        default:
            return state
    }
}
