
import { createBrowserRouter } from "react-router";
import HomePage from '../components/HomePage'
import AppLayout from "../components/AppLayout";
import About from "../components/About"
import GuidePage from "../components/GuidePage"
import SignUpVolunteer from "../components/singUp/SignUpVolunteer";
import SignUpOrganization from "../components/singUp/SignUpOrganization"
import SignIn from "../components/SingIn/SignIn";
import VolunteeringForm from "../components/VolunteeringForm";
import DetailsVolunteering from "../components/DetailsVolunteering";
import VolunteeringList from "../components/VolunteeringList";


const router = createBrowserRouter([
    {
        element: <AppLayout/>, 
        children: [
    {index: true,element: <HomePage />},
    {path:"/about", element:<About/>},
    {path:"/contact", element:<GuidePage/>},
    {path:"/about", element:<About/>},
    {path:"/signup/volunteer", element:<SignUpVolunteer/>},
    {path:"/signup/organization", element:<SignUpOrganization/>},
    {path:"/signin/:userModeLog", element:<SignIn/>},
    {path:"/addVolunteering", element:<VolunteeringForm/>},
    {path:"/detailsVolunteering/:volunteeringId", element:<DetailsVolunteering/>},
    {path:"/VolunteeringList/:filterByCitiesSkill", element:<VolunteeringList/>} 
]   
    } 
]);

export default router