import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from '../components/Copyright.jsx';
import LeftSide from '../components/LeftSide.jsx';
import SignUpForm from '../components/SignUpForm.jsx'; // Assuming you've named your sign-up form component as SignUpForm
import ErrorMessage from '../components/ErrorMessage.jsx';

const defaultTheme = createTheme();

function SignUpSide() {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

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

    // Sign Up logic (You'll have to write this part or modify based on your needs)
    const registerUser = async (formData) => {
        // Registration logic goes here
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
