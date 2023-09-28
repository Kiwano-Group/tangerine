import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from '../components/Copyright.jsx';
import LeftSide from '../components/LeftSide.jsx';
import SignUpForm from '../components/SignUpForm.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

const defaultTheme = createTheme();

function SignUpSide() {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // Deconstruct input

    // for redirecting to home page on successful sign up
    const navigate = useNavigate();

    // Track changes in input boxes
    const onChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const registerUser = async (formData) => {

        const { name, email, password, confirmPassword } = formData;

        console.log(formData);

        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Registration successful:", data.message);
                navigate('/login');
            } else {
                console.error("Registration failed:", data.message);
                setError(data.message || 'An error occurred. Please try again.');

            }
        } catch (err) {
            console.error("An error occurred during registration:", err);
            setError('An unexpected error occurred. Please try again.');

        }


    };

    // Click Handler
    const onSubmit = e => {
        e.preventDefault();
        registerUser(formData);
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                {/* LeftSide component */}
                <LeftSide />

                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    sx={{
                        backgroundColor: '#F4F4F4',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 3,
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        mb={2}
                        sx={{
                            fontSize: '2rem',
                            paddingBottom: 1
                        }}>
                        Sign Up 🙂
                    </Typography>

                    {/* Error Message Component */}
                    {error && <ErrorMessage message={error} />}

                    {/* Sign Up Form Component */}
                    <SignUpForm formData={formData} onChange={onChange} onSubmit={onSubmit} />

                    {/* Copyright Component */}
                    <Copyright sx={{ mt: 5 }} />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default SignUpSide;
