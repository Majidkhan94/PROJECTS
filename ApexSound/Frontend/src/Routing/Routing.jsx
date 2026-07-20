import { Route, Routes } from "react-router-dom";
//User
import { Userlayout } from "../Layout/Userlayout.jsx";
import { HomePage } from "../Pages/HomePage.jsx"




import {AdminRegisteration} from "../../Administration/AdminRegisteration.jsx";
import {AdminLogin} from "../../Administration/AdminLogin.jsx";
import {AdminDashboard} from "../../Administration/AdminDashboard.jsx";
import {AdminProfileUpdate} from "../../Administration/AdminProfileUpdate.jsx";
import { NotFound404 } from "../NotFound404.jsx";
import { ProtectedRoute } from "../Routing/ProtectedRoute.jsx";



export const Routing = () => {
    return (<>
        
                




        <Routes>

            {/* User Routes */}

            <Route path="" element={<Userlayout />} >
            <Route path="/" element={<HomePage />} />
            </Route>
            
            {/* Vender Routes */}






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
                {/* Users */}





                    {/* With Header / Footer */}
            

            {/* NotFound404 */}
            <Route path="*" element={<NotFound404 />} />
        </Routes>        



    </>)};