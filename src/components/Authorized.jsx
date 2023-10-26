import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./Navbar.jsx"

export const Authorized = () => {
  if (localStorage.getItem("digest_token")) {
    return <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/login' replace />
}
