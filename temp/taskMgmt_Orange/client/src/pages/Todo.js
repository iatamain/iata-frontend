import { TodoNavbar } from './TodoNavbar'
import { TodoList } from './TodoList'
import { ListHook, AppendList } from '../hooks/list.hook';
import React , { Component, useContext, forwardRef } from 'react';
import { render } from 'react-dom'
import appendReactDOM from 'append-react-dom';
import styles from './Todo.css';
import styless from './Registration.css';


export const Todo = () => {
    const { request } = ListHook();

    window.onload = async () => {
        try{
            const userId = JSON.parse(localStorage.getItem('userData')).userId
            //console.log('userData: ' , userId ) //Убрать
            //console.log('Окно загрузилось') //Убрать
            const data = await request('/api/list/required', 'POST', {userId})
            console.log(data.message);

            const root = document.querySelector('.todoContainer')

            AppendList(data.message)
        } catch(e) {}
    }

    async function addList() {
        let nameTask = document.querySelector('#nametask').value;
        let descriptionTask = document.querySelector('#descriptiontask').value;
        const dataTask = {
            nameTask: nameTask,
            descriptiontask: descriptionTask,
            userId : JSON.parse(localStorage.getItem('userData')).userId
        }
        console.log(dataTask)
        const data = await request('/api/list/push', 'POST', dataTask)

        window.location.reload()
    }

    return (
        <div>
            <TodoNavbar />
            
            <div className="todoContainer">

            </div>

            <div className="main">       
                <div className="box">
                    <h1> Создание новой задачи </h1>
                    <h2> Название задачи </h2>
                    <input type='text' id='nametask' name='nametask' />
                    <h2> Описание задачи </h2>
                    <input type='text' id='descriptiontask' name='descriptiontask' />
                    <input type='submit' name='' onClick={addList}></input>
                </div>
            </div>
        )
        </div>
    )
} 

