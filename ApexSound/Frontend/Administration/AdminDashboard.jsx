import { useState, useEffect } from "react";
import { FiGrid, FiUsers, FiShoppingBag, FiBox, FiList, FiPlusCircle, FiPackage, FiShoppingCart, FiClipboard, FiMenu, FiX } from "react-icons/fi";
import { LuLetterText } from "react-icons/lu";
import { MdContactPhone } from "react-icons/md";
import Logo from "../src/Public/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { 
  Button, Paragraph, AdminSlide, AdminAddCategoriesSection, AdminAllCategoriesSection, AdminContactusSection, 
  AdminDashboardSection, Pagetitle, AdminNewsletterSection, AdminOrderManagementSection, 
  AdminAllProductSection, AdminAddProductSection, AdminUserManagementSection, AdminVenderRequestSection 
} from "../Export.js";
import { GETADMINPROFILE } from "../APIs/AdminAPIs.js";

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

// Updated Data List for Left Sidebar
const Data = [
  { key: "dashboard", text: "Dashboard", icon: FiGrid },
  { key: "users", text: "User Management", icon: FiUsers },
  { key: "vendors", text: "Vendor Request", icon: FiShoppingBag },
  { key: "addcategories", text: "Add Categories", icon: FiPlusCircle },
  { key: "categories", text: "All Categories", icon: FiList },
  { key: "addproduct", text: "Add Product", icon: FiPackage },
  { key: "products", text: "All Product", icon: FiShoppingCart },
  { key: "orders", text: "Order Management", icon: FiClipboard },
  { key: "contactus", text: "Contact Us", icon: MdContactPhone },
  { key: "newsletter", text: "Newsletter", icon: LuLetterText },
];

///////////////////////////////// Right Section Data /////////////////////////////////

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("dashboard");
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const adminId = localStorage.getItem("adminId");
      const response = await GETADMINPROFILE(adminId);
      if (response.success) {
        setAdmin(response?.data?.data || {});
      } else {
        setError(response?.message);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminId");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  return (<>
    <Pagetitle title={"Admin Dashboard"} />

    <section className="h-screen w-full flex overflow-hidden relative">
      
      {/* /////////// Mobile Hamburger Button /////////// */}
      <div className="absolute top-4 left-4 z-50 md:hidden">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="p-2 bg-black text-white rounded-lg shadow-md focus:outline-none"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* /////////// Left_Side (Sidebar) /////////// */}
      <div className={`fixed inset-y-0 left-0 z-40 w-70 bg-black flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        {/* 1. Logo */}
        <div className="flex items-center justify-center py-3 border-b border-gray-800">
          <img src={Logo} alt="ApexSound" className="h-15 w-auto object-contain" />
        </div>

        {/* 2. Nav Items */}
        <div className="flex flex-col gap-3 flex-1 justify-start py-3 overflow-y-auto">
          {Data.map((item) => (
            <Navbar 
              key={item.key} 
              text={item.text} 
              icon={item.icon} 
              isActive={active === item.key}
              onClick={() => {
                setActive(item.key);
                setIsSidebarOpen(false);
              }} 
            />
          ))}
        </div>

        {/* 3. Profile */}
        <div>
          <Link to="/admin/adminprofileupdate">
            <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800">
              <img src={admin?.profilePictureUrl || "https://i.pravatar.cc/40?img=12"}
                className="w-10 h-10 rounded-full object-cover" alt="Profile" />
              <div>
                <Paragraph text={admin?.fullname || "Loading..."} />
                <Paragraph text={admin?.role || ""} />
              </div>
            </div>
          </Link>
          <Button text="Logout" onClick={handleLogout} className="text-sm! w-full" />
        </div>

      </div>

      {/* /////////// Right_Side /////////// */}
      <div className="flex-1 relative overflow-y-auto pt-16 md:pt-0">
        {active === "dashboard" && (<AdminSlide key="dashboard"> <AdminDashboardSection /></AdminSlide>)}

        {active === "users" && (<AdminSlide key="users"><AdminUserManagementSection /></AdminSlide>)}

        {active === "vendors" && (<AdminSlide key="vendors"><AdminVenderRequestSection /></AdminSlide>)}
        
       
        {active === "addcategories" && (<AdminSlide key="addcategories"><AdminAddCategoriesSection /></AdminSlide>)}
        {active === "categories" && (<AdminSlide key="categories"><AdminAllCategoriesSection /></AdminSlide>)}
        
        
        {active === "addproduct" && (<AdminSlide key="addproduct"><AdminAddProductSection /></AdminSlide>)}
        {active === "products" && (<AdminSlide key="products"><AdminAllProductSection /></AdminSlide>)}
        
        {active === "orders" && (<AdminSlide key="orders"><AdminOrderManagementSection /></AdminSlide>)}
        
        {active === "contactus" && (<AdminSlide key="contactus"><AdminContactusSection /></AdminSlide>)}

        {active === "newsletter" && (<AdminSlide key="newsletter"><AdminNewsletterSection /></AdminSlide>)}
      </div>
    </section>
  </>);
};