import { toyService } from "../services/toy.service.js"
import { combineReducers, compose, legacy_createStore as createStore } from "redux"
// const {  } = Redux

export const SET_TOYS = 'SET_TOYS'



const initialState = {
    toys: [],

}


function appReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_TOYS:
            return { ...state, todos: action.todos }
        default:
            return state
    }
}


export const store = createStore(appReducer)
window.gStore = store