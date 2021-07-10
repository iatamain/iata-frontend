import {useState, useCallback} from 'react'

export const ListHook = () => {
    const request = useCallback( async( url, 
                                        method='GET', 
                                        body = null, 
                                        headers= {}) => {


        try {
            if(body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if(!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            return data

        } catch(e) {    
            console.log('catch e ', e.message)
            throw e
        }

    }, [])
    
    return { request }
}

export const AppendList = (data) => {
    for(let i = 0; i < data.length; i++) {
        let component = document.createElement('div');
        component.className = 'todoList'

        let header = document.createElement('header')
        header.className = 'todoListHeader'
        header.innerText = data[i].nametask

        let main = document.createElement('main')
        main.className = 'todoListMain'

        let span = document.createElement('span')
        span.innerText = data[i].descriptiontask

        main.appendChild(span)

        component.appendChild(header)
        component.appendChild(main)

        console.log(component)

        let root = document.querySelector('.todoContainer')
        root.appendChild(component)
    }
}