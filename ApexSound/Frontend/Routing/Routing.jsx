import { Route, Routes } from "react-router-dom";
import { Customerlayout } from "../Layout/Customerlayout.jsx";
import {AdminRegisteration} from "../src/Administration/AdminRegisteration.jsx";
import {AdminLogin} from "../src/Administration/AdminLogin.jsx";
import {AdminDashboard} from "../src/Administration/AdminDashboard.jsx";


export const Routing = () => {
    return (<>
        
                




        <Routes>
                            {/* Administration */}
            <Route path="admin/registeration" element={<AdminRegisteration />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin/dashboard" element={<AdminDashboard />} />


            <Route path="" element={<Customerlayout />} >



            </Route>
        </Routes>        



    </>)};