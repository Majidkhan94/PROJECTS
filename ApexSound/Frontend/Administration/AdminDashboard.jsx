import { useState, useEffect } from "react";
import axios from "axios";
import { FiGrid, FiUsers, FiShoppingBag, FiBox, FiShoppingCart, FiClipboard, FiUser } from "react-icons/fi";
import { LuLetterText } from "react-icons/lu";
import { MdContactPhone } from "react-icons/md";
import Logo from "../src/Public/Logo.png"
import { Link, useNavigate } from "react-router-dom";
import { Button, Paragraph, Dashboard,AdminSlide,UserManagement, VenderRequest, Categories, ProductManagement, OrderManagement, ContactusSection, NewsletterSection} from "../Export.js";



///////////////////////////////// Left Section Data /////////////////////////////////

// Navbar
const Navbar = ({ text, icon: Icon, isActive, onClick }) => {
  return (
    <button onClick={onClick} className={`flex items-center text-sm cursor-pointer gap-3 px-4 py-3 mx-1 rounded-4xl text-left hover:bg-hover-bg hover:text-white
        ${isActive ? "bg-hover-bg text-white" : "bg-brand-bg text-white"}`}>
      {Icon && <Icon size={18} />} {text}
    </button>
  );
};
// Data
const Data = [
  { key: "dashboard", text: "Dashboard", icon: FiGrid },
  { key: "users", text: "Users Management", icon: FiUsers },
  { key: "vendors", text: "Vendor Requests", icon: FiShoppingBag },
  { key: "categories", text: "Categories", icon: FiBox },
  { key: "products", text: "Products Management", icon: FiShoppingCart },
  { key: "orders", text: "Orders Management", icon: FiClipboard },
  { key: "contactus", text: "Contactus", icon: MdContactPhone },
  { key: "newsletter", text: "NewsLetter", icon: LuLetterText },
  
];

///////////////////////////////// Right Section Data /////////////////////////////////

export const AdminDashboard = () => {

  const navigate = useNavigate();

  const [active, setActive] = useState("dashboard");
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${import.meta.env.VITE_ADMIN_PROFILE}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(response.data);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };
    fetchProfile();
  }, [])

  // Logout
const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("adminId");
  localStorage.removeItem("role");
  navigate("/admin/login");
};

  return (
    <section className="h-screen w-full flex overflow-hidden">
      
                    {/* /////////// Left_Side /////////// */}

      <div className="h-full w-70 bg-black flex flex-col justify-between overflow-y-auto">
        {/* 1. Logo */}
        <div className="flex items-center justify-center py-3 border-b border-gray-800">
          <img src={Logo} alt="ApexSound" className="h-15 w-auto object-contain" />
        </div>

        {/* 2. Nav Items */}
        <div className="flex flex-col gap-5 flex-1 justify-center py-3">
          {Data.map((item) => (
            <Navbar key={item.key} text={item.text} icon={item.icon} isActive={active === item.key}
              onClick={() => setActive(item.key)} />))}
        </div>

        {/* 3. Profile */}
        <Link to="/admin/adminprofileupdate">
          <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800">
            <img src={admin?.profilePictureUrl || "https://i.pravatar.cc/40?img=12"}
              className="w-10 h-10 rounded-full object-cover" />
            <div>
              <Paragraph text={admin?.fullname || "Loading..."} />
              <Paragraph text={admin?.role || ""} />
            </div>
          </div>
        </Link>
        <Button text="Logout" onClick={handleLogout} className="text-sm" />
      </div>

      {/* /////////// Right_Side /////////// */}

      
      <div className="flex-1 relative overflow-y-auto">
        {active === "dashboard" && (<AdminSlide key="dashboard"> <Dashboard /></AdminSlide>)}

        {active === "users" && (<AdminSlide key="users"><UserManagement /></AdminSlide>)}

        {active === "vendors" && (<AdminSlide key="vendors"><VenderRequest /></AdminSlide>)}
        
        {active === "categories" && ( <AdminSlide key="categories"><Categories /></AdminSlide> )}
        
        {active === "products" && (<AdminSlide key="products"><ProductManagement /></AdminSlide>)}
        
        {active === "orders" && (<AdminSlide key="orders"><OrderManagement/></AdminSlide>)}
        
        {active === "contactus" && (<AdminSlide key="contactus"><ContactusSection /></AdminSlide>)}

        {active === "newsletter" && (<AdminSlide key="newsletter"><NewsletterSection /></AdminSlide>)}
      </div>
    </section>
  );
};