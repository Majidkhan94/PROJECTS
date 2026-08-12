import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react"
import { Layout, ProtectedRoute, NotFound404
        ,UserRegisteration, UserLogin, UserProfile
        ,HomePage, Contactus, Categories, CategoryProducts, Products, Aboutus, Support, Faqs, TermsandCondition, PrivacyPolicy
        ,AdminRegisteration, AdminLogin, AdminDashboard, AdminProfileUpdate
        ,Cart, Requesttovendor      

    } from "../Export.js";

    export const Routing = () => {
    return (<>
        <Routes>

-------------------------------------- Without Header / Footer --------------------------------------
            
            {/* NotFound404 */}
            <Route path="*" element={<NotFound404 />} />
            
            
            **************************************** USERS ****************************************
            <Route path="/registeration" element={<UserRegisteration />} />
            <Route path="/login" element={<UserLogin />} />
            ***** USERS Protected Routes *****
            <Route path="/profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>} />

            **************************************** VENDER ****************************************

            **************************************** ADMIN ****************************************
            <Route path="admin/registeration" element={<AdminRegisteration />} />
            <Route path="admin/login" element={<AdminLogin />} />
            ***** ADMIN Protected Routes *****
            <Route path="admin/dashboard" element={<ProtectedRoute allowedRole="Admin"><AdminDashboard /></ProtectedRoute>}/>
            <Route path="admin/adminprofileupdate" element={<ProtectedRoute allowedRole="Admin"><AdminProfileUpdate /></ProtectedRoute>}/>






-------------------------------------- With Header / Footer --------------------------------------
            
            {/* User Routes */}
            <Route path="" element={<Layout />} >
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<Contactus />} />
                <Route path="/Categories" element={<Categories />} />
                <Route path="/categories/:slug" element={<CategoryProducts />} />
                <Route path="/products" element={<Products />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/support" element={<Support />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/termsandcondition" element={<TermsandCondition />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/cart" element={
                <ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/requesttovender" element={
                <ProtectedRoute><Requesttovendor /></ProtectedRoute>} />
                
            </Route>

            
        </Routes>        



    </>)};