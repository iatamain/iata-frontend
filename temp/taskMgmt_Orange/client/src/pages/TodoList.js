import React , { Component, useContext } from 'react';
import styles from './Todo.css';

export const TodoList = () => {

    let nameTask = 'Название таска'
    let descriptionTask = 'Описание таска'
    
    return (
        <div className="todoList"> 
            <header className="todoListHeader">
                {nameTask}
            </header>
            <main className="todoListMain">
                <span> {descriptionTask}</span>
            </main>
        </div>
    )
}