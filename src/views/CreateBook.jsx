import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const BookForm = () => {
    const initialBookState = {
        title: "",
        isbn_number: "",
        author: "",
        cover_image: ""
    }

    const [book, updateBookProps] = useState(initialBookState)
    const [chosenCategories, updateChosen] = useState(new Set())
    const [categories, changeCategories] = useState([{ id: 1, name: "Fiction" }, { id: 2, name: "Non-Fiction" }])
    const navigate = useNavigate()

    const fetchCategories = async () => {
        const response = await fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("digest_token")).token}`
            }
        })
        const categories = await response.json()
        changeCategories(categories)
    }

    const shelveBook = async (evt) => {
        evt.preventDefault()

        await fetch("http://localhost:8000/books", {
            method: "POST",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("digest_token")).token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...book, categories: Array.from(chosenCategories)})
        })
        await fetchBooks()
        navigate("/books")
    }

    const handleUserInput = (e) => updateBookProps({ ...book, [e.target.id]: e.target.value })

    const formInput = (prop) => <input id={prop} type="text" value={book[prop]}
        className="form-control" onChange={handleUserInput} />

    const handleCategoryChosen = (category) => {
        const copy = new Set(chosenCategories)
        copy.has(category.id) ? copy.delete(category.id) : copy.add(category.id)
        updateChosen(copy)
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <main className="container--login">
            <section>
                <form className="form--login">
                    <h1>Collect a Book</h1>
                    <fieldset>
                        <label htmlFor="title">Name:</label>
                        {formInput("title")}
                    </fieldset>
                    <fieldset>
                        <label htmlFor="author">Author:</label>
                        {formInput("author")}
                    </fieldset>
                    <fieldset>
                        <label htmlFor="image">Cover image:</label>
                        {formInput("cover_image")}
                    </fieldset>
                    <fieldset>
                        <label htmlFor="type"> <strong>Categories</strong> </label>
                        <br />
                        {
                            categories.map(c => <div key={`category-${c.id}`}>
                                <input type="checkbox"
                                    checked={chosenCategories.has(c.id)}
                                    onChange={() => handleCategoryChosen(c)}
                                />{c.name}
                            </div>)
                        }
                    </fieldset>

                    <fieldset>
                        <button type="submit" onClick={shelveBook}>
                            Collect Book
                        </button>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}