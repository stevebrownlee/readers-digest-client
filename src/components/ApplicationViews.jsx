import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../views/Login.jsx"
import { Register } from '../views/Register.jsx'
import { BookForm } from '../views/CreateBook.jsx'


export const ApplicationViews = () => {
    const [booksState, setBooksState] = useState([{
        id: 1,
        name: "Sample",
        type: {
            id: 1,
            label: "Volcanic"
        }
    }])

    const fetchBooksFromAPI = async () => {
        const response = await fetch("http://localhost:8000/books",
            {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
                }
            })
        const books = await response.json()
        setBooksState(books)
    }

    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={
                    <div>
                        <h1>Welcome to Reader's Digest</h1>
                    </div>
                } />
                <Route path="/books/create" element={ <BookForm /> } />
            </Route>
        </Routes>
    </BrowserRouter>
}