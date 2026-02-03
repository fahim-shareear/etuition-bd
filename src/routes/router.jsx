import {createBrowserRouter} from "react-router"
import RootLayout from "../layouts/RootLayout"
import Tuitions from "../pages/Tuitions"
import Home from "../pages/Home"
import Tutors from "../pages/Tutors"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Notfound from "../components/shared/errors/Notfound"

export const router = createBrowserRouter([
    {
        path: "/", Component: RootLayout, ErrorBoundary: Notfound,
        children:[
            {index: true, Component: Home},
            {path: "/tuitions", Component: Tuitions},
            {path: "/tutors", Component: Tutors},
            {path: "/about", Component: About},
            {path: "/contact", Component: Contact},
            {path: "/login", Component: Login},
            {path: "/register", Component: Register}
        ]
    }
])