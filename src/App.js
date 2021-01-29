import React from 'react';
import Main from './components/MainComponent'
import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'



class App extends Component{

render(){
  return (
    <>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
    </>
  );
}
}
export default App;

