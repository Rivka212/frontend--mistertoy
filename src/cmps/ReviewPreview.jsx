import { Link } from 'react-router-dom'

export function ReviewPreview({ review }) {
    const { byUser, aboutUser } = review

    return (
        <article className="review-preview">
            <h4>About: {aboutUser.fullname}</h4>
            <h4 className="review-by">By: {byUser.fullname}</h4>
            <h4 className="review-txt">{review.txt}</h4>            
        </article>
    )
}