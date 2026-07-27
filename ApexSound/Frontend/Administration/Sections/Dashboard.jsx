import { AdminCardComponents } from "../Component/AdminCardComponents";
import { FiGrid, FiUsers, FiShoppingBag, FiBox, FiShoppingCart, FiClipboard, FiUser } from "react-icons/fi";
import { MdContactPhone } from "react-icons/md";
import { LuLetterText } from "react-icons/lu";
import { useState, useEffect } from "react";
import axios from "axios";


export const Dashboard = ()=>{

    const [loading, setloading] = useState(false)
    const [user, setUser] = useState([])
    const [category, setCategory] = useState([])
    const [contact, setContact] = useState([])
    const [newsletter, setNewsletter] = useState([])


    useEffect(()=>{
          const FetchData = async () => {
              try{
                  setloading(true)
                  
                  var User = await axios.get(`${import.meta.env.VITE_USER_GETUSERCOUNT}`)
                  setUser(User.data.data);
                  
                  var Category = await axios.get(`${import.meta.env.VITE_CATEGORY_COUNT}`)
                  setCategory(Category.data.data)

                  var Contactus = await axios.get(`${import.meta.env.VITE_CONTACTUS_COUNT}`)
                  setContact(Contactus.data.data)

                  var Newsletter = await axios.get(`${import.meta.env.VITE_NEWSLETTER_COUNT}`)
                  setNewsletter(Newsletter.data.data)


              }
              catch(err){
                console.log(err.response?.data.error || "Something Went Wrong")
              }
              finally {setloading(false)}

          }
          FetchData();
    },[])

    const DashboardData = [
      { text: "Total Users", numbers: user, icon: FiUsers },
      { text: "Total Vendors Request", numbers: "356", icon: FiShoppingBag },
      { text: "Total Categories", numbers: category, icon: FiBox },
      { text: "Total Products", numbers: "8,924", icon: FiShoppingCart },
      { text: "Total Orders", numbers: "21,309", icon: FiClipboard },
      { text: "Total Contacts", numbers: contact, icon: MdContactPhone },
      { text: "Total Newsletter", numbers: newsletter, icon: LuLetterText },
    ];

    return(<>

    {DashboardData.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-col gap-10">
                  <AdminCardComponents text={item.text} numbers={item.numbers} icon={item.icon} />
                  </div>
                  
                  );})}

    </>)}