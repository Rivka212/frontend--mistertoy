import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdate.js"
import { toyService } from "../services/toy.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const toyLabels = toyService.getToyLabels()

    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffectOnUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'select-multiple') {
            value = Array.from(target.selectedOptions, option => option.value || [])
        }
        value = type === 'number' ? +value || '' : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: field === 'sortDir' ? -prevFilter.sortDir : value }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <div>
                    <label htmlFor="txt"></label>
                    <input type="text"
                        id="txt"
                        name="txt"
                        placeholder="Search"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="inStock"></label>
                    <select name="inStock" id="inStock" onChange={handleChange}>
                        <option value="">All</option>
                        <option value="true">In Stock</option>
                        <option value="false">Not in Stock</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="labels"></label>
                    <select name="labels" id="labels" onChange={handleChange} multiple>
                        {toyLabels.map(label => (
                            <option key={label} value={label}
                            >{label}</option>))}
                    </select>
                </div>
                <div>
                    <label htmlFor="sortBy"></label>
                    <select name="sortBy" id="sortBy" value={filterByToEdit.sortBy} onChange={handleChange}>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="createdAt">Date</option>
                    </select>
                    <label> Descending
                        <input
                            type="checkbox"
                            name="sortDir"
                            checked={filterByToEdit.sortDir < 0}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </form>
        </section >
    )
}
