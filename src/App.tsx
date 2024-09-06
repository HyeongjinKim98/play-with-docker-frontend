import './App.css';
import { Login } from './auth/Login';
import { Prompt } from './Prompt';
export const App=() =>{
  return (
    <div className="App">
      <Login/>
      <div className='App-Container'>
        <Prompt/>
      </div>
    </div>
  );
}