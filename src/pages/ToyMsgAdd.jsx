import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { addToyMsg } from "../store/actions/toy.actions.js"
import { useEffect, useState } from "react"
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {
    Button,
    TextField,
} from '@mui/material'


export function ToyMsgAdd() {
    const navigate = useNavigate()
    const [toyMsgToAdd, setToyMsgToAdd] = useState(toyService.getEmptyToyMsg())
    const { toyId } = useParams()


    async function onAddToyMsg(toyMsgToAdd, { setSubmitting }) {
        console.log(toyMsgToAdd, { setSubmitting });
        try {
            await addToyMsg(toyMsgToAdd)
            showSuccessMsg('Toy msg added!')
            navigate('/toy')

        } catch (err) {
            console.log('Cannot add toy msg', err)
            showErrorMsg('Cannot add toy msg')
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

//     <Formik
//     enableReinitialize
//     initialValues={toyToEdit}
//     validationSchema={toySchema}
//     onSubmit={onSaveToy}
// >
//     {({ errors, touched, values: toyToEdit, handleChange }) => (
//         <Form className="edit-form">
//             <Field name="name"
//                 label="Name"
//                 as={TextField}
//                 variant="outlined" required
//                 // error={errors.name && touched.name}
//                 // helperText={touched.name && errors.name}
//                 value={toyToEdit.name}
//                 onChange={handleChange}
//             />

    return (
        <section className="toy-msg">
            <h2>Add a toy Messge:</h2>
            <div>
                <Formik
                    enableReinitialize
                    initialValues={toyMsgToAdd}
                    validationSchema={toySchema}
                    onSubmit={onAddToyMsg}
                >
                    {({ errors, touched, values: toyMsgToAdd, handleChange }) => (
                        <Form className="add-form">
                            <Field name="txt"
                                label="Messge"
                                as={TextField}
                                variant="outlined" required
                                value={toyMsgToAdd.txt}
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