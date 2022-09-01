import React, { useRef } from 'react'
import "../../css/navigationBar.css"
import diesel from "../../img/diesel.png"
import search from "../../img/search.png"
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useToast} from '@chakra-ui/react'
import formatThousands from 'format-thousands'
import Axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL
function NavigationBar(){
    const user = useSelector((state)=>state.user)
    const gameList = useSelector((state)=>state.gameList)
    const dispatch = useDispatch();
    const gameName = useRef();
    const toast = useToast();

    const searchGame = () =>{
        //cari game masukin global
        Axios.get(API_URL + `/games?_name=${gameName.current.value}`)
        .then((respond)=>{
            dispatch({type:"GAME_SEARCH", payload:{gameList : respond.data}})
            navigate("/games")
        })
        .catch((error)=>{
            console.log(error.response.data)
        })
        
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchGame();
        }
    }
    const logout = () =>{
        dispatch({type:"LOGOUT"})
        toast({
            title: 'Log Out Success',
            description: "Thank you for using Diesel Games",
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    }
    const navigate = useNavigate();
    return (
        <div className='navbarContainer'>
            <div className='navbarLeft'>
                <div className='navbarLeftButton'>
                    <img src={diesel}  className='navbarLogo'/>
                    <button className='navbarTitle' onClick={()=>navigate("/")}>
                        Diesel Games
                    </button>
                </div>
                
                <div className='navbarLeftBox'>
                    <img src={search} className="navbarSearchIcon" />
                    <input ref={gameName} className='navbarSearchBar' onKeyDown={handleKeyDown} placeholder='Find your favorite game here!'/>
                    <button className='navbarSearchButton' onClick={searchGame} >
                        Search
                    </button>
                    {/* <button className='navbarExploreButton' onClick={searchGame}>
                        Categories
                    </button> */}
                </div>
            </div>
            {
                user.username?
                <div className='navbarRight'>
                    <button className='navbarButton signupButton'>
                        {user.username}
                    </button>
                    <button className='navbarFlexButton signupButton' onClick={()=>navigate("/topup")}>
                        Rp. {formatThousands(user.balance,'.')}
                    </button>
                    <button className='navbarButton signupButton' onClick={logout}>
                        Log Out
                    </button>
                </div>
                :
                <div className='navbarRight'>
                    <button className='navbarButton signupButton' onClick={()=>navigate("/register")}>
                        Sign Up
                    </button>
                    <button className='navbarButton loginButton' onClick={()=>navigate("/login")}>
                        Login
                    </button>
                </div>
            }
            
        </div>
    )
}
export default NavigationBar;