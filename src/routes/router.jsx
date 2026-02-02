import {createBrowserRouter} from "react-router"
import RootLayout from "../layouts/RootLayout"
import Tuitions from "../pages/Tuitions"
import Home from "../pages/Home"
import Tutors from "../pages/Tutors"
import About from "../pages/About"
import Contact from "../pages/Contact"

export const router = createBrowserRouter([
    {
        path: "/", Component: RootLayout,
        children:[
            {index: true, Component: Home},
            {path: "/tuitions", Component: Tuitions},
            {path: "/tutors", Component: Tutors},
            {path: "/about", Component: About},
            {path: "/contact", Component: Contact}
        ]
    }
])