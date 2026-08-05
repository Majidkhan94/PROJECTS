import { Route, Routes } from "react-router-dom";
import {
        Layout, ProtectedRoute, NotFound404,
        
        UserRegisteration, UserLogin, UserProfile,
        
        HomePage, Contactus, Categories, CategoryProducts, Products, Aboutus,
        
        AdminRegisteration, AdminLogin, AdminDashboard, AdminProfileUpdate,      

    } from "../Export.js";

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
                <Route path="/Categories" element={<Categories />} />
                <Route path="/categories/:slug" element={<CategoryProducts />} />
                <Route path="/products" element={<Products />} />
                <Route path="/aboutus" element={<Aboutus />} />
                
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