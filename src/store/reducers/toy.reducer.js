import { toyService } from "../../services/toy.service.js"


//* Toys
export const SET_TOYS = 'SET_TOYS'
export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {
    toys: [],
    isLoading: false,


}


export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_TOYS:
            return { ...state, toys: action.toys }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        default:
            return state
    }
}
