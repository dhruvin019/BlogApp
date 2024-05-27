import React, { useState, useEffect, useRef  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [countdown, setCountdown] = useState(0);
  const countdownRef = useRef(null);

  const generateDescription = async (title) => {
    try {
      const response = await axios.post("/api/v1/blog/generate-description", {
        prompt: title,
      });
      if (response.data.success) {
        setInputs((prevState) => ({
          ...prevState,
          description: response.data.text,
        }));
      }
    } catch (error) {
      console.error("Error generating description:", error);
    }
  };

  const startCountdown = () => {
    generateDescription(inputs.title);
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    setCountdown(3);
    countdownRef.current = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(countdownRef.current);
          
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);
  const handleDescriptionFocus = () => {
    if (inputs.title) {
      startCountdown();
    }
  };
  

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
        userName: userName,
      });
      if (data?.success) {
        // toast.success("blog created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Create A Post
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
           <Box display="flex" alignItems="center">
            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
            >
              Description
            </InputLabel>
            {countdown > 0 && (
              <Typography
                variant="h6"
                sx={{ mb: 1, mt: 2, ml: 2 }}
                color="textSecondary"
              >
                Generating in {countdown}...
              </Typography>
            )}
          </Box>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            onFocus={handleDescriptionFocus}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="primary" variant="contained">
            SUBMIT
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;