import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LoginForm({ formData, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
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
        </form>
    );
}

export default LoginForm;
