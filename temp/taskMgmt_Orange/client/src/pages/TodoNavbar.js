import React , { Component, useContext } from 'react';
import {useHistory, NavLink} from 'react-router-dom'
import {AuthContext} from '../context/auth.context.js'
import styles from './Todo.css';
import styless from './Registration.css';



export const TodoNavbar = () => {


    const history = useHistory();
    const auth = useContext(AuthContext)
    let isCreateWindow = true;

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

        return(
            <div className= "headerMain" >
                <header className = "headerNav"> 
                    <h1> ITracers task-manager</h1>
                    <input className="returnButton" type="button" value="Create List"></input>
                    <input className="returnButton" type="button" value="Exit" onClick={logoutHandler}></input>
                </header>
            </div>

                  
        )
}

