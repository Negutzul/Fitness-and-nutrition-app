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

const NavigationMenu = () =>{

    return (
        <>
            <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="MealPlans" element={<MealPlans />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Workouts" element={<Workouts />} />
                        <Route path="Locker" element={<Locker />} />
                        <Route path="Authentication" element={<Authentication />} />
                        <Route path="Contact" element={<Contact />} />
                        <Route path="AddContent" element={<ElementAdder />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            </div>
        </>
    );
}
export default NavigationMenu;