
import { createBrowserRouter } from "react-router";
import HomePage from '../components/HomePage'
import AppLayout from "../components/AppLayout";
import About from "../components/About"
import Contact from "../components/Contact"
import SingUpVolunteer from "../components/singUp/SingUpVolunteer";
import SingUpOrganization from "../components/singUp/singUpOrganization"
import SingIn from "../components/SingIn/SingIn";
import VolunteeringForm from "../components/VolunteeringForm";
import DetailsVolunteering from "../components/DetailsVolunteering";

const router = createBrowserRouter([
    {
        element: <AppLayout/>, 
        children: [
    {index: true,element: <HomePage />},
    {path:"/about", element:<About/>},
    {path:"/contact", element:<Contact/>},
    {path:"/about", element:<About/>},
    {path:"/signup/volunteer", element:<SingUpVolunteer/>},
    {path:"/signup/organization", element:<SingUpOrganization/>},
    {path:"/signin/volunteer", element:<SingIn/>},
    {path:"/signin/organization", element:<SingIn/>},
    {path:"/addVolunteering", element:<VolunteeringForm/>},
    {path:"/detailsVolunteering/:volunteeringId", element:<DetailsVolunteering/>}
]   
    } 
]);

export default router