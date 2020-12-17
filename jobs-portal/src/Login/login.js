import React, { useDebugValue } from 'react';
import './login.css';

const Login=(props)=>{
    return <div>
        Functional Component <br/>
        Email : <input type="text" onChange={props.onNameChangeHandler} value={props.email}></input><br/>
        Password : <input type="password" onChange={props.onPasswordChangeHandler} value={props.password}></input><br/>
        <button style={props.buttonStyle}>Login</button>
        {props.email}
        {props.password}
    </div>
}

export default Login;