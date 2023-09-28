import React from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';

import googleButton from '../assets/btn_google_signin_dark_normal_web.png';

function LoginForm({ formData, onChange, onSubmit, onGoogleLogin }) {
    return (

        <form onSubmit={onSubmit} style={{
            margin: '0 auto',
            maxWidth: '80%',
            marginTop: 3
        }}>

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={onChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={onChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ height: 56, padding: '4px', marginTop: 3 }}
            >
                Login
            </Button>

            <Divider variant='middle' sx={{
                margin: 4,
                my: '2'
            }}>OR</Divider>

            <Button
                onClick={onGoogleLogin}
                fullWidth
            >
                <img src={googleButton} alt="Sign in with Google" />
            </Button>
        </form >
    );
}

export default LoginForm;
