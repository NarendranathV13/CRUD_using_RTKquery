import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'; // Import SweetAlert
import Details from '../Details';
import { useAddDataMutation } from '../../api/apiSlice';

import { Heading, LoginContainer } from '../../styledComponent/LoginStyle';
const Register = () => {
    const [showDetails, setShowDetails] = useState(false);
    const handleDetailsButtonClick = () => {
        setShowDetails(!showDetails); // Set showDetails to true when button is clicked
    }
    //yup library validation 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        pin: Yup.string()
            .matches(/^\d{5,6}$/, 'Pin code must be 5 to 6 digits')
            .required('Pin code is required'),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must have minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character'
            )
            .required('Password is required'),
        cnfpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm your Password '),
        country: Yup.string().required('Country is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
    });
    
    const [addData1] = useAddDataMutation(); // Initialize the addData mutation

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            pin: '',
            password: '',
            cnfpassword: '',
            country: '',
            state: '',
            city: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const newData = {
                name: values.username,
                email: values.email,
                pincode: values.pin,
                password: values.cnfpassword,
                country: values.country,
                state: values.state,
                city: values.city,
            };

            try {
                //addData mutation to send a POST request
                await addData1(newData);
                resetForm();
                Swal.fire({
                    icon: 'success',
                    title: 'Form submitted successfully!',
                    timer: 1500,
                    showConfirmButton: false
                });
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    });
    return (
        <>
            <div className='container'>
                <form id="form" className="form" name="form" onSubmit={formik.handleSubmit}>
                    <div className=' container-fluid'>
                        <div class="row">
                            <div class="col-lg-12">
                                <Heading>Registration Form</Heading>
                                <LoginContainer width="100%" padding="40px" height="85%">
                                    <div className="row">
                                        <div className="col-lg-6 my-2">
                                            <div className="form-val text-start ">
                                                <label htmlFor="username">Name</label><br />
                                                <input
                                                    class=" form-control w-100"
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    placeholder="Enter your name"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.username}
                                                />
                                                {formik.touched.username && formik.errors.username ? (
                                                    <div class="text-start text-danger">{formik.errors.username}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 my-2">
                                            <div className="form-val text-start">
                                                <label htmlFor="Lname">Email</label><br />
                                                <input
                                                    class=" form-control w-100"
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Enter your Email"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.email}
                                                />
                                                {formik.touched.email && formik.errors.email ? (
                                                    <div class="text-start text-danger">{formik.errors.email}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-lg-6 my-2">
                                            <div className="form-val text-start">
                                                <label htmlFor="phone">Password</label><br />
                                                <input
                                                    class=" form-control w-100"
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.password}
                                                />
                                                {formik.touched.password && formik.errors.password ? (
                                                    <div class="text-start text-danger">{formik.errors.password}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 my-2">
                                            <div className="form-val text-start">
                                                <label htmlFor="cnfPassword">Confirm password</label><br />
                                                <input
                                                    class=" form-control w-100"
                                                    type="password"
                                                    id="cnfpassword"
                                                    name="cnfpassword"
                                                    placeholder="Confirm Password"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.cnfpassword}
                                                />
                                                {formik.touched.cnfpassword && formik.errors.cnfpassword ? (
                                                    <div class="text-start text-danger">{formik.errors.cnfpassword}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-lg-6 my-2">
                                            <div className="form-val text-start">
                                                <label htmlFor="pin">Pin code</label><br />
                                                <input
                                                    class="form-control w-100"
                                                    type="text"
                                                    id="pin"
                                                    name="pin"
                                                    placeholder="Enter the Pincode"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.pin}
                                                />
                                                {formik.touched.pin && formik.errors.pin ? (
                                                    <div class="text-start text-danger">{formik.errors.pin}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 ">
                                            <div className="form-val text-start">
                                                <label htmlFor="countryList" className="form-label">Country</label><br />
                                                <input
                                                    className="form-control w-100"
                                                    list="datalistOptions"
                                                    id="countryList"
                                                    placeholder="Type to search..."
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.country}
                                                    name="country"
                                                />
                                                {formik.touched.country && formik.errors.country ? (
                                                    <div className="text-start text-danger">{formik.errors.country}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className='col-lg-6 my-2'>
                                            <div className="form-val text-start">
                                                <label htmlFor="exampleDataList" className="form-label">State</label>
                                                <input
                                                    className="form-control w-100"
                                                    list="Statelist"
                                                    id="exampleDataList"
                                                    placeholder="Type to search..."
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.state}
                                                    name="state"
                                                />
                                                {formik.touched.state && formik.errors.state ? (
                                                    <div className="text-start text-danger">{formik.errors.state}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className='col-lg-6 my-2'>
                                            <div className="form-val text-start">
                                                <label htmlFor="exampleDataList" className="form-label">City</label>
                                                <input
                                                    className="form-control "
                                                    list="Citylist"
                                                    id="exampleDataList"
                                                    placeholder="Type to search..."
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.city}
                                                    name="city"
                                                />
                                                {formik.touched.city && formik.errors.city ? (
                                                    <div className="text-start text-danger">{formik.errors.city}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 my-2">
                                            <div class="d-flex justify-content-center">
                                                <button
                                                    className="btn btn-success mt-2"
                                                    id="submitbtn"
                                                    type="submit"
                                                >
                                                    Register
                                                </button>
                                                <button
                                                    className="btn btn-warning mx-2 mt-2"
                                                    id="detailsbtn"
                                                    type="button"
                                                    onClick={handleDetailsButtonClick}
                                                >
                                                    All Entries
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </LoginContainer>
                            </div>
                        </div>
                    </div >
                </form >
            </div >
            <div className=' container mt-3'>
                <div className=' row '>
                    <div className=' col-lg-12'>
                        {showDetails && <Details />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
