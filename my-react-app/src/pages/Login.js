import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/Store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInputs] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setInputs((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('api/v1/user/login', {
        email: input.email,
        password: input.password
      });

      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        localStorage.setItem("userName", data?.user.username);
        dispatch(authActions.login());
        navigate('/');
        toast.error("User login Successfully"); 
      }
    }
    catch (err) {
      toast.error("User login Failed"); 
      console.log("bad Luck")
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography variant='h4' padding={3} textAlign={'center'}
            sx={{ textTransform: "uppercase" }}>
            Login</Typography>

          <TextField placeholder='email'
            name='email'
            margin='normal'
            type='email'
            required
            value={input.email}
            onChange={handleChange}
          />
          <TextField placeholder='password'
            name='password'
            margin='normal'
            type='password'
            required
            value={input.password}
            onChange={handleChange}
          />

          <Button
            type='submit'
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant='contained'
            color='primary'
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not User? Please Register
          </Button>
        </Box>
      </form>
      <ToastContainer /> {/* Added ToastContainer here */}
    </>
  )
}

export default Login;
