// src/theme.js
import { createTheme } from '@mui/material/styles';

// Customize your palette, typography, etc. here
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',  // blue
        },
        secondary: {
            main: '#dc004e',  // pink
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default theme;
