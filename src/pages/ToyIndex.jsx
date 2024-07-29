import { useDispatch, useSelector } from 'react-redux'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect } from 'react'
import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.actions.js'

import { Link } from 'react-router-dom'

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    // const [toyLabels, setToyLabels] = useState()

    useEffect(() => {
        loadToys()
            // .then(() => toyService.getToyLabelsRoute())
            // .then(labels => setToyLabels(labels))
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

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
            <h1>OUR'S TOYS </h1>
            <main>
                <button> <Link to="/toy/edit">Add Toy</Link></button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading ?
                    <ToyList toys={toys} onRemoveToy={onRemoveToy}
                    /> : <div>Loading...</div>
                }
            </main>
        </div>
    )
}