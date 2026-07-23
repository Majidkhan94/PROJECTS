import { AdminCardComponents } from "../Component/AdminCardComponents";
import { FiGrid, FiUsers, FiShoppingBag, FiBox, FiShoppingCart, FiClipboard, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";

export const AdminDashboardSection = ()=>{

    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)


    useEffect(()=>{
          const FetchData = async () => {
              try{
                  setloading(true)
                  var response = await axios.get(`${import.meta.env.VITE_USER_GETUSERCOUNT}`)
                  setData(response.data.data)
                  console.log("Successfull", response.data.data)
              }
              catch(err){
                console.log(err.response?.data.error || "Something Went Wrong")
              }
              finally {setloading(false)}

          }
          FetchData();
    },[])

    const DashboardData = [
      { text: "Total Users", numbers: data, icon: FiUsers },
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