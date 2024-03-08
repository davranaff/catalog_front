import React, {createContext, useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MenuDetail from "./components/Menu/MenuDetail";
import Home from "./Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/menu/:id',
        element: <MenuDetail/>,
    },
])

export const BaseContext = createContext()

function App() {
    const [globalState, setGlobalState] = useState({id: null, name: '', description: '', type: 'create'})

    return (
        <BaseContext.Provider value={{globalState, setGlobalState}}>
            <RouterProvider router={router}/>
        </BaseContext.Provider>
    );
}

export default App;
