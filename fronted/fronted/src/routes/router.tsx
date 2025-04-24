
import { createBrowserRouter } from "react-router";
import HomePage from '../components/HomePage'
import AppLayout from "../components/AppLayout";
import About from "../components/About"
import Contact from "../components/Contact"
import MyProfile from "../components/singIn V/MyProfil";
import OrgProfile from "../components/singIn V/singUpOrganization"
const router = createBrowserRouter([
    {
        element: <AppLayout/>, 
        children: [
    {index: true,element: <HomePage />},
    {path:"/about", element:<About/>},
    {path:"/contact", element:<Contact/>},
    {path:"/about", element:<About/>},
    {path:"/signup/volunteer", element:<MyProfile/>},
    {path:"/signup/organization", element:<OrgProfile/>}
]   
    } 
]);

export default router