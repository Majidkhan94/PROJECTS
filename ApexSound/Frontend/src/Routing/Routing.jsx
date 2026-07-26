import { Route, Routes } from "react-router-dom";
import { Layout } from "../Layout/Layout.jsx";

//User
import { UserRegisteration } from "../../Users/UserRegisteration.jsx"
import { UserLogin } from "../../Users/UserLogin.jsx"
import { UserProfile } from "../../Users/UserProfile.jsx"


// Pages
import { HomePage } from "../Pages/HomePage.jsx"
import { Contactus } from "../Pages/Contactus.jsx"


import {AdminRegisteration} from "../../Administration/AdminRegisteration.jsx";
import {AdminLogin} from "../../Administration/AdminLogin.jsx";
import {AdminDashboard} from "../../Administration/AdminDashboard.jsx";
import {AdminProfileUpdate} from "../../Administration/AdminProfileUpdate.jsx";
import { NotFound404 } from "../NotFound404.jsx";
import { ProtectedRoute } from "../Routing/ProtectedRoute.jsx";



export const Routing = () => {
    return (<>
        
        <Routes>

-------------------------------------- Without Header / Footer --------------------------------------

            ***** USERS *****
            <Route path="/registeration" element={<UserRegisteration />} />
            <Route path="/login" element={<UserLogin />} />
            
            ***** USERS Protected Routes *****
            <Route path="/profile" element={
                <ProtectedRoute>
                    <UserProfile/>
                </ProtectedRoute>} />

-------------------------------------- With Header / Footer --------------------------------------
            
            {/* User Routes */}
            <Route path="" element={<Layout />} >
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<Contactus />} />
                
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

                {/* Administration */}
            
            <Route path="admin/registeration" element={<AdminRegisteration />} />
            <Route path="admin/login" element={<AdminLogin />} />
                {/* Vender */}





                    {/* With Header / Footer */}
            

            {/* NotFound404 */}
            <Route path="*" element={<NotFound404 />} />
        </Routes>        



    </>)};