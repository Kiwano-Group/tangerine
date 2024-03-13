import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Components
import Copyright from '../components/Copyright.jsx';
import LeftSide from '../components/LeftSide.jsx';
import SignUpForm from '../components/SignUpForm.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

// Firebase
import { useAuth } from '../authContext.jsx';

const defaultTheme = createTheme();

function Signup() {

    // Firebase context
    const { signUp, signInWithGoogle } = useAuth();

    // States
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    // for redirecting 
    const navigate = useNavigate();

    // Track changes in input boxes
    const onChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // MongoDB Logic
    // const registerUser = async (formData) => {

    //     // Deconstruct input
    //     const { name, email, password, confirmPassword } = formData;

    //     console.log(formData);

    //     if (password !== confirmPassword) {
    //         console.error("Passwords do not match");
    //         return;
    //     }

    //     try {
    //         const response = await fetch('/api/user/signup', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 name: name,
    //                 email: email,
    //                 password: password
    //             })
    //         });

    //         const data = await response.json();

    //         if (response.ok) {
    //             console.log("Registration successful:", data.message);
    //             navigate('/login');
    //         } else {
    //             console.error("Registration failed:", data.message);
    //             setError(data.message || 'An error occurred. Please try again.');

    //         }
    //     } catch (err) {
    //         console.error("An error occurred during registration:", err);
    //         setError('An unexpected error occurred. Please try again.');

    //     }
    // };

    // Firebase password/email
    const registerUser = async (formData) => {
        const { name, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await signUp(email, password);
            // Optionally, save other user data (like "name") to a user profile in Firebase
            // or your own backend.
            console.log("Registration successful");
            navigate('/login');
        } catch (err) {
            console.error('Signup error:', err);
            if(password.length < 6){
                setError('Password must be at least 6 characters');
            }
            else setError('An unexpected error occurred. Please try again.');
        }
    };

    // Firebase google oauth
    const registerUserWithGoogle = async () => {
        try {
            await signInWithGoogle();
            console.log("Registration with Google successful");
            navigate('/dashboard'); // or navigate to any other route you prefer after sign up
        } catch (err) {
            console.error('Google Signup error:', err);
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

                {/* Right side of the page */}
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
                    <SignUpForm
                        formData={formData}
                        onChange={onChange}
                        onSubmit={onSubmit}
                        onGoogleSignUp={registerUserWithGoogle} />

                    {/* Copyright Component */}
                    <Copyright sx={{ mt: 5 }} />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Signup;
