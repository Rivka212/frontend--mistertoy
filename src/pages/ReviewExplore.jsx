import { useEffect } from "react"
import { loadReviews } from "../store/actions/review.actions"
import { useSelector } from "react-redux"

import { ReviewPreview } from '../cmps/ReviewPreview.jsx'
import { ReviewFilter } from '../cmps/ReviewFilter.jsx'


export function ReviewExplore() {
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const filterBy = useSelector(storeState => storeState.reviewModule.filterBy)

    useEffect(() => {
        loadReviews()
            // .catch(err => {
            //     showErrorMsg('Cannot load reviews!')
            // })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <div>
            <h2>Review's Toys </h2>
            <section>
                <ReviewFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading ?
                    <ReviewPreview reviews={reviews}
                    /> : <div>Loading...</div>
                }
            </section>
        </div>
    )

}