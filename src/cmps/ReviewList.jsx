import { userService } from '../services/user.service.js'

import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews, onRemoveReview }) {

    console.log(reviews);
    
    function shouldShowActionBtns(review) {
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return review.byUser?._id === user._id
    }

    return (
        <section>
            <ul className="review-list">
                {reviews.map(review =>
                    <li key={review._id}>
                        <ReviewPreview review={review} />
                        {/* {shouldShowActionBtns(review) && <div className="actions">
                            <button onClick={() => onRemoveReview(review._id)}>x</button>
                        </div>} */}
                    </li>)
                }
            </ul>
        </section>
    )
}