import { useState, useEffect } from "react";
import { FiGrid, FiPlusCircle, FiList, FiPackage, FiShoppingCart, FiClipboard } from "react-icons/fi";
import Logo from "../src/Public/Logo.png"
import { Link, useNavigate } from "react-router-dom";
import { Button, Paragraph, AdminSlide, Pagetitle, VenderDashboardSection,
  VenderAddCategoriesSection, VenderAllCategoriesSection, VenderAddProductSection,
  VenderAllProductSection, VenderOrderManagement




 } from "../Export.js";
import { GETUSERPROFILE } from "../APIs/UserAPIS.js"


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
  { key: "addcategory", text: "Add Category", icon: FiPlusCircle },
  { key: "allcategories", text: "All Categories", icon: FiList },
  { key: "addproduct", text: "Add Product", icon: FiPackage },
  { key: "allproducts", text: "All Products", icon: FiShoppingCart },
  { key: "orders", text: "Order Management", icon: FiClipboard },
];

///////////////////////////////// Right Section Data /////////////////////////////////

export const VendorsDashboard = () => {

  const navigate = useNavigate();

  const [active, setActive] = useState("dashboard");
  const [vender, setVender] = useState(null);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);


const fetchProfile = async () => {
    setLoading(true);
    try {
        const userId = localStorage.getItem("UserId");
        const response = await GETUSERPROFILE(userId);
        if (response.success) {
            setVender(response?.data?.data || {});
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
  localStorage.removeItem("UserId");
  localStorage.removeItem("Role");
  navigate("/login");
};

  return (<>
    <Pagetitle title={"Vender Dashboard"}/>

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
        <Link to="/profile">
          <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800">
            <img src={vender?.profilePictureUrl || "https://i.pravatar.cc/40?img=12"}
              className="w-10 h-10 rounded-full object-cover" />
            <div>
              <Paragraph text={vender?.fullname || "Loading..."} />
              <Paragraph text={vender?.role || ""} />
            </div>
          </div>
        </Link>
        <Button text="Logout" onClick={handleLogout} className="text-sm" />
      </div>

      {/* /////////// Right_Side /////////// */}

      
      <div className="flex-1 relative overflow-y-auto">
        
        {active === "dashboard" && (<AdminSlide key="dashboard"><VenderDashboardSection /></AdminSlide>)}

        {active === "addcategory" && (<AdminSlide key="addcategory"><VenderAddCategoriesSection/></AdminSlide>)}

        {active === "allcategories" && (<AdminSlide key="allcategories"><VenderAllCategoriesSection/></AdminSlide>)}

        {active === "addproduct" && (<AdminSlide key="addproduct"><VenderAddProductSection/></AdminSlide>)}

        {active === "allproducts" && (<AdminSlide key="allproducts"><VenderAllProductSection/></AdminSlide>)}

        {active === "orders" && (<AdminSlide key="orders"><VenderOrderManagement /></AdminSlide>)}

      </div>
    </section>
  </>);
};