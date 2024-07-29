import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { useEffect, useState } from "react"
import { OutlinedInput } from '@mui/material';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'



export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [labels, setLabels] = useState([])
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
        loadToyLabels()
    }, [])


    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function loadToyLabels() {
        return toyService.getToyLabelsRoute()
            .then(labels => {
                setLabels(labels)
            })
            .catch(err => {
                console.log('Had issued in toy edit:', err)
                navigate('/toy')
                showErrorMsg('Toy not found!')
            })
    }
    console.log(labels)

    function onSaveToy(toyToEdit, { setSubmitting }) {
        if (!toyToEdit.price) toyToEdit.price = 100
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const toySchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Name is required'),
        price: Yup.number()
            .min(1, 'Price must be at least 1')
            .required('Price is required'),
        labels: Yup.array().of(Yup.string()),
    })

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} toy</h2>
            <div>
                <Formik
                    enableReinitialize
                    initialValues={toyToEdit}
                    validationSchema={toySchema}
                    onSubmit={onSaveToy}
                >
                    {({ errors, touched, values: toyToEdit, handleChange }) => (
                        <Form className="edit-form">
                            <Field name="name"
                                label="Name"
                                as={TextField}
                                variant="outlined" required
                                // error={errors.name && touched.name}
                                // helperText={touched.name && errors.name}
                                value={toyToEdit.name}
                                onChange={handleChange}
                            />

                            <Field name="price"
                                label="Price"
                                as={TextField}
                                variant="outlined" required
                                // error={errors.price && touched.price}
                                // helperText={touched.price && errors.price}
                                value={toyToEdit.price}
                                onChange={handleChange}
                            />
                            <FormControl margin="normal">
                                <InputLabel id="labels-label">Labels</InputLabel>
                                <Select
                                    multiple
                                    label="Labels"
                                    labelId="labels-label"
                                    id="labels"
                                    name="labels"
                                    value={toyToEdit.labels}
                                    onChange={handleChange}
                                    renderValue={selected => selected.join(', ')}
                                    style={{ minWidth: '250px' }}
                                >
                                    {/* {labels.map(label => {
                                        <MenuItem key={label} value={label}>
                                            <Checkbox checked={toyToEdit.labels.includes(label)} />
                                            <ListItemText primary={label} />
                                        </MenuItem>
                                    })} */}
                                </Select>
                            </FormControl>
                            {toyToEdit._id &&
                                <FormControl margin="normal">
                                    <Field
                                        as={FormControlLabel}
                                        control={<Checkbox />}
                                        label="In Stock"
                                        variant="outlined"
                                        name="inStock"
                                        id="inStock"
                                        margin="normal"
                                        // error={touched.inStock && !!errors.inStock}
                                        // helperText={touched.inStock && errors.inStock}
                                        onChange={handleChange}
                                        value={toyToEdit.inStock}
                                        checked={toyToEdit.inStock}
                                    />
                                </FormControl>
                            }
                            <Button type="submit" variant="contained" color="primary">
                                {toyToEdit._id ? 'Save' : 'Add'}
                            </Button>
                            {/* <Button type="submit">{toyToEdit._id ? 'Save' : 'Add'}</Button> */}
                        </Form>
                    )}
                </Formik>
            </div>
            <div>
                <button><Link to="/toy">Cancel</Link></button>
            </div>

        </section>
    )
}