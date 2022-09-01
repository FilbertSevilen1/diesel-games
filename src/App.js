import logo from './logo.svg';
import AOS from 'aos'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/users/Home';
import NotFound from './pages/NotFound';
import './css/index.css'
import NavigationBar from './pages/components/NavigationBar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Login from './pages/users/Login';
import Axios from 'axios';
import Register from './pages/users/Register';
import TopUp from './pages/users/TopUp';
import Games from './pages/users/Games';

const API_URL = process.env.REACT_APP_API_URL
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("dieselgames_token")){
      Axios.get(API_URL + `/user/${localStorage.getItem("dieselgames_token")}`)
      .then((respond)=>{
        dispatch({type:"LOGIN", payload: respond.data})
      })
      .catch((error)=>{
        console.log(error.response.data)
      })
    }
  })
  return (
    <div>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/topup' element={<TopUp/>}/>
        <Route path='/Games' element={<Games/>}></Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
