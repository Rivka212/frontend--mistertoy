import { useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectOnUpdate } from "../hooks/useEffectOnUpdate.js"
import * as React from 'react';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Form } from "react-router-dom";
import { useSelector } from "react-redux";


export function ReviewFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const toys = useSelector(storeState => storeState.toyModule.toys)

    // const users = toyService.getToyLabels()


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
        <section className="review-filter full main-layout">
            <h2>Reviews Filter</h2>
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


                    <FormControl sx={{ minWidth: 100, minHeight: 1, height: '8ch' }}>
                        <InputLabel id="toys">Toys</InputLabel>
                        <Select className="select-filterBy"
                            // labelId="labels-toy"
                            id="toys"
                            name="toys"
                            multiple
                            value={filterByToEdit.toys}
                            onChange={handleChange}
                            renderValue={selected => selected.join(', ')}
                        >
                            {toys.map(toy => (
                                <MenuItem key={toy} value={toy}>
                                    {toy}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </form>
        </section >
    )
}

