import { useState } from 'react';
import axios from 'axios';
import { TextField, Typography, Box, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Button from "../uielement/Button";
function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/auth/login', form);
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard'; // Redirect after login
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="login-singup-page">
      <Container className='login-singup-page-container' maxWidth="xs">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              fullWidth
              margin="normal"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button buttonType="button" className="default-btn login-btn"
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
            >
              Log In
            </Button>
          </Box>
          <Button buttonType="button" className="default-btn login-btn"
             handler={handleGoogleLogin}
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          >
            Log In with Google
          </Button>

          <p className='singupNow'>Don&apos;t have an account yet? <b> <NavLink to="/signup">Sign Up</NavLink></b> </p>

        </Box>
      </Container>
    </div>
  );
}

export default Login;