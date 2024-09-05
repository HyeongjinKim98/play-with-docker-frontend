import './App.css';
import { Login } from './auth/Login';
export const App=() =>{
  return (
    <div className="App">
      <div className='App-Container'>
        <Login/>
      </div>
    </div>
  );
}