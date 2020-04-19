import React, {Component} from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavigationBar from './navigationBar/navigationBar.jsx';
import HomeDisplay from './homeDisplay/homeDisplay.jsx';

class App extends Component {
  render(){
    const MyComponent = () =>{
      return(
        <>
        <NavigationBar/>
        <HomeDisplay/>
        </>
       /*<Link to="/about">About</Link> */
      );
    }
    return (
      <>
         <Route exact path="/" component={MyComponent}/>
      </>
    );
  }
  
}

export default App;
