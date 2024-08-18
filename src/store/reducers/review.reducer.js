
export const SET_REVIEWS = 'SET_REVIEWS'
export const ADD_REVIEW = 'ADD_REVIEW'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    reviews: [],
}

export function reviewReducer(state = initialState, action = {}) {
    switch (action.type) {

        case SET_REVIEWS:
            console.log('SET_REVIEWS', action.reviews);
            
            return { ...state, reviews: action.reviews }
        case ADD_REVIEW:
            return { ...state, reviews: [...state.reviews, action.review] }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }
        default:
            return state
    }
}
