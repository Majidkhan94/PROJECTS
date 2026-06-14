import { Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout/Layout.jsx';
import { Home } from "../src/Pages/Home.jsx"
import { AboutUs } from "../src/Pages/AboutUs.jsx"
import { Blog } from "../src/Pages/Blog.jsx"
import { ContactUs } from "../src/Pages/ContactUs.jsx"
import { Faq } from "../src/Pages/Faq.jsx"
import { PrivacyPolicy } from "../src/Pages/PrivacyPolicy.jsx"
import { Products } from "../src/Pages/Products.jsx"
import { TermandCondition } from "../src/Pages/TermandCondition.jsx"

export const Routing = () => {
    return (

    <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/termandcondition" element={<TermandCondition />} />
            </Route>
        </Routes>

    </>);}


