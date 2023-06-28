import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import MealPlans from "./Pages/MealPlans";
import Workouts from "./Pages/Workouts";
import Contact from "./Pages/Contact";
import Authentication from "./Pages/Authentication";
import Locker from "./Pages/Locker";
import NoPage from "./Pages/NoPage";
import "./styles.css";
import ElementAdder from "./Pages/ElementAdder";
import RegisterTrainer from "./Pages/RegisterTrainer";

const NavigationMenu = ({setImage}) =>{

    return (
        <>
            <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout setImage = {setImage}/>}>
                        <Route index element={<Home setImage = {setImage}/>} />
                        <Route path="MealPlans" element={<MealPlans setImage = {setImage}/>} />
                        <Route path="Home" element={<Home setImage = {setImage}/>} />
                        <Route path="Workouts" element={<Workouts setImage = {setImage}/>} />
                        <Route path="Locker" element={<Locker setImage = {setImage}/>} />
                        <Route path="Authentication" element={<Authentication setImage = {setImage}/>} />
                        <Route path="Contact" element={<Contact setImage = {setImage}/>} />
                        <Route path="AddContent" element={<ElementAdder setImage = {setImage}/>} />
                        <Route path="AddTrainer" element={<RegisterTrainer setImage = {setImage}/>} />
                        <Route path="*" element={<NoPage setImage = {setImage}/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
            </div>
        </>
    );
}
export default NavigationMenu;