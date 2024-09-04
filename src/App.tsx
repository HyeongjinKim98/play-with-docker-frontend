import './App.css';

export const App=() =>{
  return (
    <div className="App">
      <div className='App-Container'>
        {process.env.PUBLIC_URL}
      </div>
    </div>
  );
}