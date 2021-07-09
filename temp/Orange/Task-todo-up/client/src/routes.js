import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Registration} from './pages/Registration'
import {Todo} from './pages/Todo.js'

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return (
            <Switch>
                <Route path="/todo">
                    <Todo/>
                </Route>
                <Redirect to='/todo' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <Registration />
            </Route>
            <Redirect to="/" />
        </Switch>   
    )
}