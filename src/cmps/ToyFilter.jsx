import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdate.js"
import { toyService } from "../services/toy.service.js"
import * as React from 'react';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Form } from "react-router-dom";


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
                <div className="form">
                    <TextField 
                        id="name"
                        label="Search"
                        variant="outlined"
                        name="txt"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                        sx={{ width: '20ch', height: '8ch' }} />

                    {/* <FormControl sx={{ m: 1, minWidth: 100, minHeight: 1 }}>
                        <InputLabel id="inStock-label">In Stock</InputLabel>
                        <Select
                            labelId="inStock-label"
                            id="inStock"
                            // name="inStock"
                            value={filterByToEdit.inStock}
                            onChange={handleChange}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="true">In Stock</MenuItem>
                            <MenuItem value="false">Not in Stock</MenuItem>
                        </Select>
                    </FormControl> */}
                    <label htmlFor="inStock"></label>
                    <select name="inStock" id="inStock" onChange={handleChange}>
                        <option value="">All</option>
                        <option value="true">In Stock</option>
                        <option value="false">Not in Stock</option>
                    </select>

                    <FormControl sx={{ minWidth: 100, minHeight: 1, height: '8ch' }}>
                        <InputLabel id="labels-label">Labels</InputLabel>
                        <Select className="select-filterBy"
                            labelId="labels-label"
                            id="labels"
                            name="labels"
                            multiple
                            value={filterByToEdit.labels}
                            onChange={handleChange}
                            renderValue={selected => selected.join(', ')}
                        >
                            {toyLabels.map(label => (
                                <MenuItem key={label} value={label}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 100, minHeight: '40px', height: '8ch' }}>
                        <InputLabel className="inputLabel" id="sortBy-label">Sort By</InputLabel>
                        <Select className="select-filterBy"
                            labelId="sortBy-label"
                            id="sortBy"
                            name="sortBy"
                            value={filterByToEdit.sortBy}
                            onChange={handleChange}
                        >
                            <MenuItem value="name">Name</MenuItem>
                            <MenuItem value="price">Price</MenuItem>
                            <MenuItem value="createdAt">Date</MenuItem>
                        </Select>
                    </FormControl>

                    <label> Descending
                        <input className="descending"
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

