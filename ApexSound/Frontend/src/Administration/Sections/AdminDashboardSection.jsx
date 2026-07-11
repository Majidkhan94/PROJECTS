import { AdminCardComponents } from "../Component/AdminCardComponents";
import { FiGrid, FiUsers, FiShoppingBag, FiBox, FiShoppingCart, FiClipboard, FiUser } from "react-icons/fi";

export const AdminDashboardSection = ()=>{

    const DashboardData = [
      { text: "Total Users", numbers: "12,480", icon: FiUsers },
      { text: "Total Vendors", numbers: "356", icon: FiShoppingBag },
      { text: "Total Products", numbers: "8,924", icon: FiBox },
      { text: "Total Orders", numbers: "21,309", icon: FiShoppingCart },
      { text: "Pending Vendor Requests", numbers: "14", icon: FiClipboard }
    ];

    return(<>

    {DashboardData.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-col gap-10">
                  <AdminCardComponents text={item.text} numbers={item.numbers} icon={item.icon} />
                  </div>
                  
                  );})}

    </>)}