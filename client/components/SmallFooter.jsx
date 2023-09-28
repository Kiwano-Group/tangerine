import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function Footer() {
    return (
        <Box
            sx={{
                mt: 5,  // Add a top margin to push it below other content.
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Typography variant="body2" align="center">
                <Link style={{ color: "#000" }} href="/terms-of-service" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                </Link>
                {" | "}
                <Link style={{ color: "#000" }} href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                </Link>
            </Typography>
            <Typography variant="body2" align="center">
                Kiwagno Group
            </Typography>
        </Box>
    );
}

export default Footer;
