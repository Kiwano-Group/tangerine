import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TypedText from './Typed.jsx';
import { GiOrange } from "react-icons/gi";
import { Link } from 'react-router-dom';

function LeftSide() {
    return (
        <Grid
            item
            xs={false}  // makes sure the left side doesn't appear on xs sizes
            sm={4}
            md={7}
            sx={{
                backgroundColor: '#EAC461',
                display: {
                    xs: 'none',
                    sm: 'flex'
                }, // hides the left side on mobile
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 3,
                position: 'relative'  // Makes sure absolute positioned children are relative to this container
            }}
        >
            {/* Tangerine text logo */}

            <Typography
                variant="h5"
                gutterBottom
                component={Link}
                to="/"
                sx={{
                    position: 'absolute',
                    top: '1rem',
                    left: '2rem',
                    textDecoration: 'none',
                    color: 'inherit',
                }}
            >
                <GiOrange />Tangerine
            </Typography>

            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontSize: '3rem',
                    paddingLeft: '2rem',
                    paddingBottom: '5rem'
                }}
            >
                {/* The text animation on the left side */}
                <TypedText />
            </Typography>
        </Grid>
    );
}

export default LeftSide;
