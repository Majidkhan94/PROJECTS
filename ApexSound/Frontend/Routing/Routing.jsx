import { Route, Routes } from "react-router-dom";
import { Customerlayout } from "../Layout/Customerlayout.jsx";
import {AdminRegisteration} from "../src/Administration/AdminRegisteration.jsx";
import {AdminLogin} from "../src/Administration/AdminLogin.jsx";
import {AdminDashboard} from "../src/Administration/AdminDashboard.jsx";
import {AdminProfileUpdate} from "../src/Administration/AdminProfileUpdate.jsx";
import { NotFound404 } from "../src/NotFound404.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

export const Routing = () => {
    return (<>
        
                




        <Routes>

            {/* Protected routes - role based */}
            <Route path="admin/dashboard" element={
                <ProtectedRoute allowedRole="Admin">
                    <AdminDashboard />
                </ProtectedRoute>}/>

            <Route path="admin/adminprofileupdate" element={
                <ProtectedRoute allowedRole="Admin">
                    <AdminProfileUpdate />
                </ProtectedRoute>}/>


                { /* All Pages */ }
                {/* Without Header / Footer */}
                {/* Administration */}
            
            <Route path="admin/registeration" element={<AdminRegisteration />} />
            <Route path="admin/login" element={<AdminLogin />} />
                {/* Vender */}
                {/* Customer */}




                    {/* With Header / Footer */}
            <Route path="" element={<Customerlayout />} >


                    
            </Route>

            {/* NotFound404 */}
            <Route path="*" element={<NotFound404 />} />
        </Routes>        



    </>)};