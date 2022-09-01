import { useToast } from '@chakra-ui/react';
import React, { useRef, useState } from 'react'
import "../../css/register.css"
import Axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL
function Register(){
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const repassword = useRef();
    const toast = useToast();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () =>{
        if(showPassword) return setShowPassword(false)
        return setShowPassword(true)
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onRegisterSubmit();
        }
    }
    const onRegisterSubmit = () =>{
        if(!username.current.value){
            return toast({
                title: 'Register Error',
                description: "Username cannot be empty",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        if(!email.current.value){
            return toast({
                title: 'Register Error',
                description: "Email cannot be empty",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        if(!password.current.value){
            return toast({
                title: 'Register Error',
                description: "Password cannot be empty",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        if(!repassword.current.value){
            return toast({
                title: 'Register Error',
                description: "Please confirm your password in Re-enter password",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        if(password.current.value !== repassword.current.value){
            return toast({
                title: 'Register Error',
                description: "Password and Re-Password do not match",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        const data = {
            username : username.current.value,
            email : email.current.value,
            password : password.current.value
        }
        Axios.post(API_URL + "/auth/register", data)
        .then((respond)=>{
            toast({
                title: 'Register Success',
                description: "Have Fun in Diesel Games!",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            navigate("/");
        })
        .catch((error)=>{
            return toast({
                title: 'Register Failed',
                description: error.response.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        })
        console.log(data)
    }
    return(
        <div className='registerContainer'>
            <div className='registerForm w3-animate-opacity'>
                <p className='registerHeader'>
                    Sign Up
                </p>
                <div className='registerInputForm'>
                    <p className='registerInputLabel'>
                        Username
                    </p>
                    <input ref={username} className='registerInputText' placeholder='ex. Amber'>

                    </input>
                </div>
                <div className='registerInputForm'>
                    <p className='registerInputLabel'>
                        Email
                    </p>
                    <input ref={email} className='registerInputText' placeholder='ex. johncena@mail.com'>

                    </input>
                </div>
                <div className='registerInputForm'>
                    <p className='registerInputLabel'>
                        Password
                    </p>
                    <input ref={password} className='registerInputText' type={showPassword?"text":"password"} placeholder='********'>

                    </input>
                    <div className='registerPasswordShowIcon' onClick={toggleShowPassword}>

                    </div>
                </div>
                <div className='registerInputForm'>
                    <p className='registerInputLabel'>
                        Re-enter Password
                    </p>
                    <input ref={repassword} className='registerInputText' onKeyDown={handleKeyDown} type={showPassword?"text":"password"} placeholder='********'>

                    </input>
                    <div className='registerPasswordShowIcon' onClick={toggleShowPassword}>

                    </div>
                </div>
                <button className='registerSubmitButton' onClick={onRegisterSubmit}>
                    Register
                </button>
            </div>
        </div>
    )
}
export default Register;