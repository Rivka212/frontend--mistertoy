import { useDispatch, useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { useEffect } from 'react'
import { loadToys } from '../store/actions/toy.actions.js'

import { Link } from 'react-router-dom'

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [])


    return (
        <div>
            <h3>OUR'S TOYS</h3>
            <main>
                {!isLoading ? <ToyList toys={toys} /> : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}