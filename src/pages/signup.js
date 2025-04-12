import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/authSlice';
import { useRouter } from 'next/router';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function Signup() {
    const dispatch = useDispatch();
    const { status, error } = useSelector(state => state.auth);
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await dispatch(signup({ name, email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            router.push('/login');
        }
    };

    return (
        <Container maxWidth="xs">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Box mt={8} display="flex" flexDirection="column" alignItems="center">
                    <Typography component="h1" variant="h5">Sign Up</Typography>
                    <Box component="form" onSubmit={handleSubmit} mt={1}>
                        <TextField fullWidth margin="normal" label="Name" value={name} onChange={e => setName(e.target.value)} />
                        <TextField fullWidth margin="normal" label="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        <TextField fullWidth margin="normal" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button type="submit" fullWidth variant="contained" disabled={status === 'loading'}>Sign Up</Button>
                    </Box>
                </Box>
            </motion.div>
        </Container>
    );
}