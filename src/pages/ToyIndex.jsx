import { useDispatch, useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { useEffect } from 'react'
import { loadToys } from '../store/toy.actions.js'

import { Link } from 'react-router-dom'

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(state => state.toys)
    const isLoading = useSelector(state => state.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [])


    return (
        <div>
            <h3>MISTER TOY</h3>
            <main>
                {!isLoading ? <ToyList toys={toys} /> : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}