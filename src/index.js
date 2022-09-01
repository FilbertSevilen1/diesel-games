import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore} from 'redux'
import { Provider } from 'react-redux'


// import main component
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { Axios } from 'axios'

const INITIAL_STATE = {
    user : {
      id : "",
      username : "",
      email : "",
      role : "",
      balance : "",
      profilepicture: "",

    },
    gameList : [],
    loading : false
  }

  function Reducer(state = INITIAL_STATE, action){
    if(action.type == 'LOGIN'){
      return {
        ...state,
        user : {
          id : action.payload.user_id,
          username : action.payload.user_username,
          email : action.payload.user_email,
          role : action.payload.user_role,
          balance : action.payload.user_balance,
          profilepicture : action.payload.user_profilepicture
        }
      }
    }
    else if(action.type == 'ADD_WALLET'){
      return{
        ...state,
        user : {
          id : state.user.id,
          username : state.user.username,
          email : state.user.email,
          role : state.user.role,
          balance : action.payload.newBalance,
          profilepicture : state.user.profilepicture
        }
      }
    }
    else if(action.type == 'GAME_SEARCH'){
      return{
        ...state,
        gameList : action.payload.gameList
      }
    }
    else if(action.type == 'LOGOUT'){
      localStorage.removeItem("dieselgames_token")
      return INITIAL_STATE
    }
    else{
      return state;
    }
  }
  const store = createStore(Reducer);

// render main component
ReactDOM.render( 
  <ChakraProvider>
      <BrowserRouter>
          <Provider store = {store}>
              <App/>
          </Provider>
      </BrowserRouter>
    </ChakraProvider>
    ,document.getElementById("root")
)