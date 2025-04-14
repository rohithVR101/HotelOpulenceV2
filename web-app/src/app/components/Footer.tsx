import { Box, Typography } from '@mui/joy';
export default function Footer() {
    return (
        <Box component="footer" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100}}>
            <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                © {new Date().getFullYear()} Hotel Opulence. All rights reserved.
            </Typography>
        </Box>
    );
}