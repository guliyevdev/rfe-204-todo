import './App.css'
import { useEffect, useReducer, useState, ChangeEvent, MouseEvent } from "react";

interface TodoState {
    todos: string[];
    inputValue: string;
}

type Action =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'SET_TODOS'; payload: string[] }
    | { type: 'CHANGE_INPUT'; payload: string }
    | { type: 'DELETE_TODO'; payload: number };

const initialState: TodoState = { todos: [], inputValue: '' }

const reducer = (state: TodoState, action: Action): TodoState => {
    switch (action.type) {
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] }
        case 'SET_TODOS':
            console.log(action.payload)
            return { todos: action.payload, inputValue: state.inputValue }
        case 'CHANGE_INPUT':
            return { ...state, inputValue: action.payload }
        case 'DELETE_TODO':
            return { ...state, todos: state.todos.filter((_, index) => index !== action.payload) }
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
        const todos = JSON.parse(localStorage.getItem('todos') || '[]') as string[]
        dispatch({ type: 'SET_TODOS', payload: todos })
        console.log(todos)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'CHANGE_INPUT', payload: event.target.value })
        setInputValue(event.target.value)
    }

    const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
        if (inputValue === '') {
            window.alert('Please enter a todo')
        } else {
            dispatch({ type: 'ADD_TODO', payload: inputValue })
            setInputValue('')
            localStorage.setItem('todos', JSON.stringify([...state.todos, inputValue]))
        }
    }

    const handleDelete = (index: number) => {
        dispatch({ type: 'DELETE_TODO', payload: index })
    }

    return (
        <>
            <input type="text" value={inputValue} onChange={handleChange} />
            <button onClick={handleAdd}>Add</button>
            <hr />
            <ul>
                {state.todos.map((todo, index) => {
                    return (
                        <li key={index}>
                            <span>{todo}</span>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default App