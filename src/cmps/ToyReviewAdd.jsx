import { Link, useNavigate, useParams } from "react-router-dom"
import { reviewService } from "../services/review.service.js"
import { showErrorReview, showSuccessMsg } from "../services/event-bus.service.js"
import { addReview } from "../store/actions/review.actions.js"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {
    Button,
    TextField,
} from '@mui/material'


export function ToyreviewAdd() {
    const user = useSelector(storeState => storeState.userModule.user)
    const { toyId } = useParams()
    const navigate = useNavigate()

    const [toyReviewToAdd, setToyReviewToAdd] = useState({ userId: user.id, toyId, txt:''})



    async function onAddToyReview(toyReviewToAdd, { setSubmitting }) {
        console.log(toyReviewToAdd, { setSubmitting });
        
        try {
            await addReview(toyReviewToAdd)
            showSuccessReview('Toy Review added!')
            navigate('/toy')

        } catch (err) {
            console.log('Cannot add toy Review', err)
            showErrorReview('Cannot add toy Review')
        } finally {
            setSubmitting(false)
        }
    }

    const toySchema = Yup.object().shape({
        txt: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Name is required'),
    })

    return (
        <section className="toy-Review">
            <h2>Add a toy Review:</h2>
            <div>
                <Formik
                    enableReinitialize
                    initialValues={toyReviewToAdd}
                    validationSchema={toySchema}
                    onSubmit={onAddToyReview}
                >
                    {({ errors, touched, values: toyReviewToAdd, handleChange }) => (
                        <Form className="add-form">
                            <Field name="txt"
                                label="review"
                                as={TextField}
                                variant="outlined" required
                                value={toyReviewToAdd.txt}
                                onChange={handleChange}
                            />
                            <div>
                                <Button className="custom-button" type="submit" variant="contained" color="primary">
                                    Save </Button>
                                <Button className="custom-button" component={Link} to="/toy" variant="contained" color="secondary">
                                    Cancel
                                </Button>
                                {/* <button className="custom-button"><Link to="/toy">CANCEL</Link></button> */}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    )
}