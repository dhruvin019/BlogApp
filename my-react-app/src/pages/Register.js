
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {Box,Button,Typography,TextField} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  // state
  const [input,setInputs] = useState({
    name:'',
    email:'',
    password:''
  });

  // handle input change
  const handleChange = (e) => {
    setInputs((prevstate) => ({
      ...prevstate,
      [e.target.name]:e.target.value
    }));
  }

  // form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post('/api/v1/user/register',{username:input.name,email:input.email,password:input.password});
      if(data.success)
      {
        toast.success("User Register Succesfully");
        navigate('/login');
      }
    }
    catch(err)
    {
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
      sx={{textTransform:"uppercase"}}>
        Register</Typography>

      <TextField placeholder='name' 
      name='name'
       margin='normal'
      type='text'
      required
      value={input.name}
    onChange={handleChange}
      />
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
        sx={{borderRadius:3,marginTop:3}}
        variant='contained'
        color='primary'
      >
      Submit
      </Button>
      <Button
        onClick={() => navigate("/login")}
        sx={{borderRadius:3,marginTop:3}}
      >
        Already Registeres? Please Login
      </Button>
      </Box>
      </form>
    </>

  )
}

export default Register;
