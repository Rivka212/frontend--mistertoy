import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdate.js"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffectOnUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === "checkbox") value = target.checked 
        else if (type === 'number' ? +value : value)
            console.log(value);
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label for="inStock"> In Stock</label>
                <input type="checkbox" id="inStock" name="inStock" value="inStock"
                    checked={filterByToEdit.inStock} onChange={handleChange} />



            </form>

        </section>
    )
}

{/* <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                /> */}