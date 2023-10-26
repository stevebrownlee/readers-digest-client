import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <NavLink to={"/allrocks"}>Book Collection</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink to={"/books/create"}>Add to Library</NavLink>
            </li>
            {
                (localStorage.getItem("digest_token") !== null) ?
                    <li className="navbar__item">
                        <button className="underline text-blue-600 hover:text-purple-700"
                            onClick={() => {
                                localStorage.removeItem("rock_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> : ""
            }
        </ul>
    )
}