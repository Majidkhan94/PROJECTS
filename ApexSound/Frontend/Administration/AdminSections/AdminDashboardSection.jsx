import { FiUsers, FiShoppingBag, FiBox, FiShoppingCart, FiClipboard } from "react-icons/fi";
import { MdContactPhone } from "react-icons/md";
import { LuLetterText } from "react-icons/lu";
import { useState, useEffect } from "react";
import { NewsletterCount } from "../../APIs/NewsletterAPIs.js";
import { ContactusCount } from "../../APIs/ContactusAPIs.js";
import { GETUSERCOUNT } from "../../APIs/UserAPIS.js";
import { CategoriesCount } from "../../APIs/CategoriesAPIs.js";
import { ProductsCount } from "../../APIs/ProductAPIs.js";
import { GetAllVendorRequests, VenderCount } from "../../APIs/VendersAPIS.js";
import { OrderCount } from "../../APIs/OrderAPIs.js";
import { Loading } from "../../Export.js";

export const AdminDashboardSection = () => {
    const [loading, setloading] = useState(false);
    const [user, setUser] = useState(0);
    const [vendorReq, setVendorReq] = useState(0);      
    const [totalVendors, setTotalVendors] = useState(0);
    const [category, setCategory] = useState(0);
    const [product, setProduct] = useState(0);
    const [order, setOrder] = useState(0);            
    const [contact, setContact] = useState(0);
    const [newsletter, setNewsletter] = useState(0);
    
    const Dashboard = [
      { icon: <FiUsers />, text: "Total Users", numbers: user },
      { icon: <FiShoppingBag />, text: "Vendors Request", numbers: vendorReq },
      { icon: <FiShoppingBag />, text: "Total Vendors", numbers: totalVendors },
      { icon: <FiBox />, text: "All Categories", numbers: category },
      { icon: <FiShoppingCart />, text: "All Product", numbers: product },
      { icon: <FiClipboard />, text: "Total Orders", numbers: order },
      { icon: <MdContactPhone />, text: "Total Contacts", numbers: contact },
      { icon: <LuLetterText />, text: "Newsletter", numbers: newsletter },
    ];

    useEffect(() => {
        const FetchData = async () => {
            try {
                setloading(true);
                
                // 1. Total Users
                const User = await GETUSERCOUNT();
                if (User?.success) { setUser(User?.data?.data ?? User?.data); }

                // 2. Vendors Request
                const VRequests = await GetAllVendorRequests();
                if (VRequests?.success) { 
                    const reqData = VRequests?.data?.data ?? VRequests?.data;
                    setVendorReq(Array.isArray(reqData) ? reqData.length : (reqData ?? 0)); 
                }

                // 3. Total Vendors
                const Vendors = await VenderCount();
                if (Vendors?.success) { 
                    const vCount = Vendors?.data?.data ?? Vendors?.data;
                    setTotalVendors(vCount); 
                }

                // 4. Categories
                const Categories = await CategoriesCount();
                if (Categories?.success) { setCategory(Categories?.data?.data ?? Categories?.data); }

                // 5. Products
                const Product = await ProductsCount();
                if (Product?.success) { setProduct(Product?.data?.data ?? Product?.data); }

                // 6. Total Orders
                const Orders = await OrderCount();
                if (Orders?.success) { setOrder(Orders?.data?.data ?? Orders?.data); }

                // 7. Contact Us
                const Contact = await ContactusCount();
                if (Contact?.success) { setContact(Contact?.data?.data ?? Contact?.data); }

                // 8. Newsletter
                const Newsletter = await NewsletterCount();
                if (Newsletter?.success) { setNewsletter(Newsletter?.data?.data ?? Newsletter?.data); }

            } catch (err) {
                console.log(err.response?.data?.error || "Something Went Wrong");
            } finally {
                setloading(false);
            }
        };
        FetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <>
            {Dashboard.map((item, index) => (
                <section key={index} className="flex flex-col gap-10">
                    <div className="mt-5 mx-5 px-0 md:px-15 py-3 flex items-center gap-4 font-main">
                        <span className="flex items-center gap-3 whitespace-nowrap">
                            <span className="text-lg">{item.icon}</span>
                            {item.text}
                        </span>
                        <span className="flex-1 border-t-2 border-hover-bg"></span>
                        <span className="font-semibold">{item.numbers}</span>
                    </div>
                </section>
            ))}
        </>
    );
};