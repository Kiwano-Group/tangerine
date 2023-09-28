// import React from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Copyright from './Copyright.jsx';

// function SignInForm({ handleSubmit }) {
//     return (
//         <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{
//                 width: '80%',
//                 maxWidth: 400,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 2,
//             }}
//         >
//             <TextField
//                 required
//                 fullWidth
//                 variant="outlined"
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 autoFocus
//                 sx={{
//                     height: 56,
//                     '& .MuiOutlinedInput-root': {
//                         height: '100%', width: '100%', padding: '0 14px'
//                     }
//                 }}
//             />
//             <TextField
//                 required
//                 fullWidth
//                 variant="outlined"
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 sx={{
//                     height: 56,
//                     '& .MuiOutlinedInput-root': {
//                         height: '100%', width: '100%', padding: '0 14px'
//                     }
//                 }}
//             />
//             <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 size="large"
//                 sx={{ height: 56, padding: ' 4px', marginTop: 3 }}
//             >
//                 Sign In
//             </Button>

//             <Copyright sx={{ mt: 5 }} />
//         </Box>
//     );
// }

// export default SignInForm;
