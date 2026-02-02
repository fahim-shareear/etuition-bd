import {createBrowserRouter} from "react-router";
import Rootlayout from "../layout/Rootlayout";


export const router = createBrowserRouter([
    {
        path: '/', Component: Rootlayout
    }
])