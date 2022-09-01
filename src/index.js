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
      username : "",
      email : "",
      fullname : "",
      rank : "",
      role : "",
      profilepicture: ""
    },
    loading : false
  }
  function Reducer(state = INITIAL_STATE, action){
    
    if(action.type == 'LOGIN'){
      return {
        ...state,
        user : {
          username : action.payload.username,
          email : action.payload.email,
          fullname : action.payload.fullname,
          rank : action.payload.rank,
          role : action.payload.role,
          profilepicture : action.payload.profilepicture
        }
      }
    }
    else if(action.type == 'LOGOUT'){
      localStorage.removeItem("dragonforce_token")
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