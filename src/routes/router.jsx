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
import Loader from "../components/shared/Loader"
import AuthLayout from "../layouts/AuthLayout"

export const router = createBrowserRouter([
    {
        path: "/",
        hydrateFallbackElement: <Loader fullPage={true}></Loader>, 
        Component: RootLayout, 
        ErrorBoundary: Notfound,
        children:[
            {index: true, Component: Home},
            {path: "/tuitions", Component: Tuitions},
            {path: "/tutors", Component: Tutors},
            {path: "/about", Component: About},
            {path: "/contact", Component: Contact},
        ]
    },
    {
        path: "/", Component: AuthLayout,
        children:[
            {path: "/login", Component: Login},
            {path: "/register", Component: Register}
        ]
    }
])