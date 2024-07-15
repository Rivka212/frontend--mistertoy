import { useDispatch, useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect } from 'react'
import { loadToys, removeToy } from '../store/actions/toy.actions.js'

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

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => showSuccessMsg('Toy removed')
            )
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }


    return (
        <div>
            <h3>OUR'S TOYS</h3>
            <main>
                <button> <Link to="/toy/edit">Add Toy</Link></button>
                {!isLoading ?
                    <ToyList toys={toys} onRemoveToy={onRemoveToy}
                    /> : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}