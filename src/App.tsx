import './App.css';

export const App=() =>{
  return (
    <div className="App">
      <div className='App-Container'>
        {process.env.REACT_APP_URL}
      </div>
    </div>
  );
}