import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../../css/login.css"
import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL
function Login(){
    const user = useSelector((state)=>state.user)
    const username = useRef();
    const password = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const keepLogin = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    
    useEffect(()=>{
        if(user.username){
            navigate("/")
        }
    })

    const onLoginSubmit = () =>{
        if(!username.current.value){
            return toast({
                title: 'Login Error',
                description: "Username cannot be empty",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        if(!password.current.value){
            return toast({
                title: 'Login Error',
                description: "Password cannot be empty",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        const data = {
            username : username.current.value,
            password : password.current.value
        }
        Axios.post(API_URL + "/auth/login", data)
        .then((respond)=>{
            console.log(respond.data)
            toast({
                title: 'Login Success',
                description: "Welcome to Diesel Games",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
            if(keepLogin)localStorage.setItem("dieselgames_token", respond.data.user_id)
            dispatch({type:"LOGIN", payload: respond.data})
            navigate("/")
        })
        .catch((error)=>{
            console.log(error.response.data)
            toast({
                title: 'Login Error',
                description: error.response.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        })
        
       
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onLoginSubmit();
        }
    }
    const toggleShowPassword = () =>{
        if(showPassword) return setShowPassword(false);
        return setShowPassword(true)
    }
    return (
        <div className='loginContainer'>
            <div className='loginForm w3-animate-opacity'>
                <p className='loginHeader'>Login</p>
                <div className='loginInputBox'>
                    <p className='loginInputLabel'>Username or Email</p>
                    <input ref={username} className='loginInputText' placeholder='ex. John Cena'></input>
                </div>
                <div className='loginInputBox'>
                    <p className='loginInputLabel' >Password</p>
                    <input ref={password} className='loginInputText' placeholder='********' type={showPassword?"text":"password"} onKeyDown={handleKeyDown}></input>
                    <div className='loginPasswordShowIcon' onClick={toggleShowPassword}></div>
                </div>
                <button className='loginInputSmallBox'>
                     <input defaultChecked={true} ref={keepLogin} className='pointer loginCheckBox' type="checkbox" id="keeplogin" onKeyDown={handleKeyDown}></input><label htmlFor='keeplogin' className='pointer'>Keep Login</label>
                </button>
                <div className=''>
                    <button className='loginSubmitButton' onClick={onLoginSubmit}>
                        Submit
                    </button>
                    <button className='loginForgetButton'>
                        Forget Password
                    </button>
                </div>
                
            </div>
            
        </div>
    )
}
export default Login;