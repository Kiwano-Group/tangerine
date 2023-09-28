import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TypedText from './Typed';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Tangerine
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();
export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* Left Side */}
        <Grid
          item
          xs={12}
          sm={4}
          md={7}
          sx={{
            backgroundColor: '#EAC461',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 3,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontSize: '4rem' }}>
            <TypedText />
          </Typography>
        </Grid>

        {/* Right Side */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          sx={{
            backgroundColor: '#F4F4F4',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // This will center the content vertically
            alignItems: 'center',    // This will center the content horizontally
            py: 3,                   // Some vertical padding to give a bit of spacing 
          }}
        >
          <Typography component="h1" variant="h5" mb={2} sx={{ fontSize: '2.7rem', paddingBottom: 5 }}>
            Welcome Back 🙂
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              width: '80%',
              maxWidth: 400,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              required
              fullWidth
              variant="outlined"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                height: 56,
                '& .MuiOutlinedInput-root': {
                  height: '100%', width: '100%', padding: '0 14px'
                }
              }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{
                height: 56,
                '& .MuiOutlinedInput-root': {
                  height: '100%', width: '100%', padding: '0 14px'
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ height: 56, padding: ' 4px', marginTop: 3 }}
            >
              Sign In
            </Button>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
