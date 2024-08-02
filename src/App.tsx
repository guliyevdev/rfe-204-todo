import './App.css'
import { useEffect, useReducer, useState } from "react";

const initialState = { todos: [], inputValue: '' }

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] }
        case 'SET_TODOS':
            console.log(action.payload)
            return { todos: action.payload, inputValue: state.inputValue }
        case 'CHANGE_INPUT':
            return { ...state, inputValue: action.payload }
        case 'DELETE_TODO':
            return { ...state, todos: state.todos.filter((todo, index) => index !== action.payload) }
        default:
            return state
    }
}

function App() {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        getTodos()
    }, [])

    const getTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || []
        dispatch({ type: 'SET_TODOS', payload: todos})
        console.log(todos)
    }

    return (
        <>
            <input type="text" value={inputValue} onChange={(event) => {
                dispatch({ type: 'CHANGE_INPUT', payload: event.target.value })
                setInputValue(event.target.value)
            }} />
            <button onClick={() => {
                if (inputValue === '') {
                    window.alert('Please enter a todo')
                }
                else {
                    dispatch({ type: 'ADD_TODO', payload: inputValue })
                    setInputValue('')
                    localStorage.setItem('todos', JSON.stringify([...state.todos, inputValue]))
                }
            }}>Add</button>
            <hr />
            <ul>
                {state.todos.map((todo, index) => {
                    return <li key={index}><span>{todo}</span> <button onClick={() => {
                        dispatch({ type: 'DELETE_TODO', payload: index })
                    }}>Delete</button></li>
                })}
            </ul>
        </>
    )
}

export default App