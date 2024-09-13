import './App.css';
import { Login } from './auth/Login';
import { Prompt } from './Prompt';
import { Callback } from './callback/Callback';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
export const App=() =>{
  return (

    <div className="App">
      <div className='App-Container'>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Prompt/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/auth/kakao/callback' element={<Callback platform={'KAKAO'}/>}/>
          <Route path='/oauth2/code/naver' element={<Callback platform={'NAVER'}/>}/>
        </Routes>
       </BrowserRouter>
      </div>
    </div>
  );
}