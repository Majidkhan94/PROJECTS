import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react"
import {
        Layout, ProtectedRoute, NotFound404
        
        ,UserRegisteration, UserLogin, UserProfile
        
        ,HomePage, Contactus, Categories, CategoryProducts, Products, Aboutus, Support, Faqs, TermsandCondition, PrivacyPolicy
        
        ,AdminRegisteration, AdminLogin, AdminDashboard, AdminProfileUpdate,      

    } from "../Export.js";


        ////////////////////////////// Page Title ////////////////////////////// 
        const titles = 
    {
        // Pages
        "/": "Apex Sound","/products": "Products",
                        
        
        "/contact": "Contact Us",
                        "/categories": "Categories",
                        
                        "/aboutus": "About Us",
                        "/login": "Login",
                        "/registeration": "Register",
                        "/profile": "My Profile",
                        "/admin/login": "Admin Login",
                        "/admin/registeration": "Admin Register",
                        "/admin/dashboard": "Admin Dashboard",
                        "/admin/adminprofileupdate": "Admin Profile",
    }

        const PageTitle = () => {
            const location = useLocation();
                useEffect(() => {
                     const path = location.pathname.toLowerCase();
                     let title = titles[path];
                    if(!title && path.startsWith("/categories/")) {
                    title = "Category Products";
                }

        document.title = title ? `${title}` : "Apex Sound";
    }, [location.pathname]);

    return null;
}

        ////////////////////////////// Page Title //////////////////////////////







export const Routing = () => {
    return (<>
        <PageTitle />
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
                <Route path="/support" element={<Support />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/termsandcondition" element={<TermsandCondition />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                
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