import React,{useState}from 'react';
import {Box,AppBar,Toolbar,Button,Typography,Tabs,Tab} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { authActions } from '../redux/Store';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    // state
    const [value, setValue] = useState();
    
    // global state
    let isLogin = useSelector(state => state.isLogin);
    isLogin = isLogin || localStorage.getItem("userId");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    // logout
    const handleLogout = () => {
        try{
        dispatch(authActions.logout());
        navigate('/login');
        localStorage.clear();
        }
        catch(err)
        {
        console.log(err);
        }
    }
  return (
    <>
    <AppBar position='sticky'>
        <Toolbar>
            <Typography variant='h4' >
                My Blog App
            </Typography>
            {isLogin && (
                <Box display='flex' marginLeft='auto' marginRight={'auto'} >
                <Tabs textColor='inherit' value={value} onChange={(e,val) => setValue(val)}>
                    <Tab label="Blogs" LinkComponent={Link} to="/blogs"/>
                    <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs"/>
                    <Tab label="Create Blogs" LinkComponent={Link} to="/create-blogs"/>

                </Tabs>
            </Box>
            )}
            <Box display='flex' marginLeft='auto'>
                {!isLogin && (
                    <>
                    <Button sx={{margin:1,color:'white'}} LinkComponent={Link} 
                    to="/login" >Login</Button>
                    <Button sx={{margin:1,color:'white'}} LinkComponent={Link} 
                    to="/register" >Register</Button>
                    </>
                )}
                {isLogin && (
                    <Button onClick={handleLogout} sx={{margin:1,color:'white'}}>Logout</Button>
                )}

            </Box>
        </Toolbar>
    </AppBar>
      
    </>
  )
}

export default Header





// const Header = () => {
//     // state
//     const [value, setValue] = useState(0); // Provide an initial value
    
//     // global state
//     let isLogin = useSelector(state => state.isLogin);
//     isLogin = isLogin || localStorage.getItem("userId");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
    
//     // logout
//     const handleLogout = () => {
//         try {
//             dispatch(authActions.logout());
//             toast.success("logout Succesfully");
//             navigate('/login');
//             localStorage.clear();
//         } catch (err) {
//             console.log(err);
//         }
//     }
    
//     return (
//         <>
//             <AppBar position='sticky'>
//                 <Toolbar>
//                     <Typography variant='h4' >
//                         My Blog App
//                     </Typography>
//                     {isLogin && (
//                         <Box display='flex' marginLeft='auto' marginRight={'auto'} >
//                             <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
//                                 <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
//                                 <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
//                                 <Tab label="Create Blogs" LinkComponent={Link} to="/create-blogs" />
//                             </Tabs>
//                         </Box>
//                     )}
//                     <Box display='flex' marginLeft='auto'>
//                         {!isLogin && (
//                             <>
//                                 <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/login" >Login</Button>
//                                 <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/register" >Register</Button>
//                             </>
//                         )}
//                         {isLogin && (
//                             <Button onClick={handleLogout} sx={{ margin: 1, color: 'white' }}>Logout</Button>
//                         )}
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//         </>
//     )
// }

// export default Header;

