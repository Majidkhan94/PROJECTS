import { useState, useEffect } from "react";
import axios from "axios";
import { FiGrid, FiUsers, FiShoppingBag, FiBox, FiShoppingCart, FiClipboard } from "react-icons/fi";
import Logo from "../../Public/Logo.png"
import { Link } from "react-router-dom";

const Navbar = ({ text, icon: Icon, isActive, onClick }) => {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-4 py-3 mx-1 rounded-4xl text-left hover:bg-hover-bg hover:text-white
        ${isActive ? "bg-hover-bg text-white" : "bg-brand-bg text-white"}`}>
      {Icon && <Icon size={18} />} {text}
    </button>
  );
};

// Left Section Data
const Data = [
  { key: "dashboard", text: "Dashboard", icon: FiGrid },
  { key: "users", text: "Users Management", icon: FiUsers },
  { key: "vendors", text: "Vendor Requests", icon: FiShoppingBag },
  { key: "categories", text: "Categories", icon: FiBox },
  { key: "products", text: "Products Management", icon: FiShoppingCart },
  { key: "orders", text: "Orders Management", icon: FiClipboard },
];

// Right Section Slide
const Section = ({ className, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${className} w-full h-full transition-all duration-[1000ms]
        ${show ? "translate-y-0" : "translate-y-full"}`}>
      {children}
    </div>
  );
};

export const AdminDashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("https://localhost:7001/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(response.data);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };
    fetchProfile();
  }, [])

  return (
    <section className="h-screen w-full flex overflow-hidden">
      {/* Left_Side */}
      <div className="h-full w-70 bg-black flex flex-col justify-between">
        {/* 1. Logo */}
        <div className="flex items-center justify-center py-3 border-b border-gray-800">
          <img src={Logo} alt="ApexSound" className="h-20 w-auto object-contain" />
        </div>

        {/* 2. Nav Items */}
        <div className="flex flex-col gap-5 flex-1 justify-center">
          {Data.map((item) => (
            <Navbar
              key={item.key}
              text={item.text}
              icon={item.icon}
              isActive={active === item.key}
              onClick={() => setActive(item.key)}
            />
          ))}
        </div>

        {/* 3. Profile */}
        <Link to="/admin/adminprofileupdate">
          <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-800">
            <img
              src={admin?.profilePictureUrl || "https://i.pravatar.cc/40?img=12"}
              alt="Admin"
              className="w-10 h-10 rounded-full object-cover"
          />
            <div>
              <p className="text-sm font-medium text-white">{admin?.fullname || "Loading..."}</p>
              <p className="text-xs text-gray-400">{admin?.role || ""}</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Right_Side */}
      <div className="flex-1 relative overflow-hidden">
        {active === "dashboard" && (
          <Section key="dashboard" className="bg-amber-600">Dashboard</Section>
        )}
        {active === "users" && (
          <Section key="users" className="bg-blue-800">User Management</Section>
        )}
        {active === "vendors" && (
          <Section key="vendors" className="bg-green-400">venderrequest</Section>
        )}
        {active === "categories" && (
          <Section key="categories" className="bg-purple-600">categories</Section>
        )}
        {active === "products" && (
          <Section key="products" className="bg-emerald-700">ProductManagement</Section>
        )}
        {active === "orders" && (
          <Section key="orders" className="bg-amber-950">ordermanagement</Section>
        )}
      </div>
    </section>
  );
};