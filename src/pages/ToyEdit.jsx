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
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    console.log(toyToEdit);

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevtoy) => ({ ...prevtoy, [field]: value }))
    }

    function onSaveToy(toyToEdit, { setSubmitting }) {
        ev.preventDefault()
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
                    initialValues={toyToEdit}
                    validationSchema={toySchema}
                    onSubmit={onSaveToy}
                >
                    {({ errors, touched, values: toyToEdit, handleChange }) => (
                        <Form>
                            <Field name="name"
                                label="Name"
                                as={TextField}
                                variant="outlined" required
                                error={errors.name && touched.name}
                                helperText={touched.name && errors.name}
                                placeholder="Enter name..."
                                value={toyToEdit.name}
                                onChange={handleChange}
                            />

                            <Field name="price"
                                 label="Price"
                                as={TextField}
                                variant="outlined" required
                                error={errors.price && touched.price}
                                helperText={touched.price && errors.price}
                                placeholder="Enter price..."
                                value={toyToEdit.price}
                                onChange={handleChange}
                            />
                            <Field name="labels"
                                 label="labels"
                                as={TextField}
                                variant="outlined" required
                                error={errors.labels && touched.labels}
                                helperText={touched.labels && errors.labels}
                                placeholder="Enter labels..."
                                value={toyToEdit.labels}
                                onChange={handleChange}
                            />
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
                                    error={touched.inStock && !!errors.inStock}
                                    helperText={touched.inStock && errors.inStock}
                                    onChange={handleChange}
                                    value={toyToEdit.inStock}
                                    checked={toyToEdit.inStock}
                                />
                            </FormControl>
                        }
                            <button type="submit">{toyToEdit._id ? 'Save' : 'Add'}</button>
                        </Form>
                    )}
                </Formik>
            </div>

{/* 

            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                /> */}

                <div>
                    {/* <button>{toyToEdit._id ? 'Save' : 'Add'}</button> */}
                    <Link to="/toy">Cancel</Link>
                </div>
            {/* </form> */}
        </section>
    )
}