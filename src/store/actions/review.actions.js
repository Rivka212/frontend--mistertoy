import { reviewService } from '../../services/review.service.js'
import { SET_REVIEWS, ADD_REVIEW, SET_FILTER_BY } from '../reducers/review.reducer.js'
import { SET_IS_LOADING } from '../reducers/system.reducer.js'
import { store } from '../store.js'

export async function loadReviews() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const reviews = await reviewService.query()
        // console.log('reviews:', reviews)
        store.dispatch({ type: SET_REVIEWS, reviews })
        return reviews
    } catch (err) {
        console.log('Review action -> Cannot load Reviews', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


export async function addReview(review) {
    try {
        const addedReview = await reviewService.add(review)
        store.dispatch({ type: ADD_REVIEW, review })
        // const { score } = addedReview.byUser
        // store.dispatch({ type: SET_SCORE, score })
    } catch (err) {
        console.log('ReviewActions: err in addReview', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

// export function saveReview(Review) {
//     const type = Review._id ? UPDATE_Review : ADD_REVIEW
//     return reviewService.save(review)
//         .then(savedReview => {
//             store.dispatch({ type, Review: savedReview })
//             return savedReview
//         })
//         .catch(err => {
//             console.log('Review action -> Cannot save Review', err)
//             throw err
//         })
// }


