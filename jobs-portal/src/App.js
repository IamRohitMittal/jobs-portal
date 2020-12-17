import React, { Component } from 'react';
import './App.css';
import Login from './Login/login';

class App extends Component {
  state={
    email:"",
    password:"",
    style:{
      backGroundColor:'white',
      font:'inherit',
      border:'1px solid blue',
      padding:'8px',
      cursor:'pointer'
    }
  }

  render() {
    return (
      <div className="App">
        <Login 
          email={this.state.email} 
          password={this.state.password} 
          onNameChangeHandler={(event)=>{this.setState({email:event.target.value})}} 
          onPasswordChangeHandler={(event)=>{this.setState({password:event.target.value})}}
          buttonStyle={this.state.style}/>
      </div>
    );
  }
}

export default App;
