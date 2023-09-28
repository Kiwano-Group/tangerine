import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SignUpForm({ formData, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit} style={{ margin: '0 auto', maxWidth: '80%' }}>
            {/* Full Name Field */}
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                type="text"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={onChange}
            />

            {/* Email Field */}
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
                value={formData.email}
                onChange={onChange}
            />

            {/* Password Field */}
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={onChange}
            />

            {/* Confirm Password Field */}
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={onChange}
            />

            {/* Sign Up Button */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ height: 56, padding: '4px', marginTop: 3 }}
            >
                Sign Up
            </Button>
        </form>
    );
}

export default SignUpForm;
