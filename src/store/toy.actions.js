import { toyService } from '../services/toy.service.js'
import { SET_TOYS, store } from './store.js'

export function loadToys(filterBy = '') {
    return toyService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TOYS, todos }))
}