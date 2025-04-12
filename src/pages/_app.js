// src/pages/_app.js
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from '../store/index';
import theme from '../theme.js';
import { setCredentials } from '../store/authSlice';

// Create a separate component to use dispatch inside Provider context
function AppInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            dispatch(setCredentials({ token, user: JSON.parse(user) }));
        }
    }, [dispatch]);

    return null;
}

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppInitializer />
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;
