import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Typography, Box, Container } from '@mui/material';
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import Button from "../uielement/Button";
function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', form);
      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
      setSuccess('');
    }
  };

  return (
    <div className='login-singup-page'>
    <Container className='login-singup-page-container' maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
            required
          />
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
       <Button  type="submit"  buttonType="link" className="default-btn singup-btn">
           
        
            Sign Up
          </Button>
          <br/>
          <p className='singupNow'>Already have an account yet? <b> <NavLink to="/login">Login Now</NavLink></b> </p>

        </Box>
      </Box>
    </Container>
    </div>
  );
}

export default Signup;
