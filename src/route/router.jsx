import {createBrowserRouter} from "react-router";
import Rootlayout from "../layout/Rootlayout";
import Home from "../pages/Home/Home";
import Tuitions from "../pages/shared/regular/Tuitions";
import Tuitors from "../pages/shared/regular/Tuitors";
import About from "../pages/shared/regular/About";
import Contact from "../pages/shared/regular/Contact";


export const router = createBrowserRouter([
    {
        path: '/', Component: Rootlayout,
        children:[
            {index: true, Component: Home},
            {path: "/tuitions", Component: Tuitions},
            {path: "/tutors", Component: Tuitors},
            {path: "/about", Component: About},
            {path: "/contact", Component: Contact}
        ]
    }
])