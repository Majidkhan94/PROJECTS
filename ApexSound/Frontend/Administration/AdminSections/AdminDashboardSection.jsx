import { FiGrid, FiUsers, FiShoppingBag, FiBox, FiShoppingCart, FiClipboard, FiUser } from "react-icons/fi";
import { MdContactPhone } from "react-icons/md";
import { LuLetterText } from "react-icons/lu";
import { useState, useEffect } from "react";
import axios from "axios";
import { NewsletterCount } from "../../APIs/NewsletterAPIs.js";
import { ContactusCount } from "../../APIs/ContactusAPIs.js";
import {Loading} from "../../Export.js"


export const AdminDashboardSection = ()=>{

    // User State
    const [loading, setloading] = useState(false)
    const [user, setUser] = useState([])
    const [category, setCategory] = useState([])
    const [contact, setContact] = useState([])
    const [product, setProduct] = useState([])
    const [newsletter, setNewsletter] = useState([])
    
    // Data APIS
    const Dashboard = [
      { text: "Total Users", numbers: user, icon: <FiUsers/> },
      { text: "Total Vendors Request", numbers: "356", icon: <FiShoppingBag /> },
      { text: "Total Categories", numbers: category, icon: <FiBox /> },
      { text: "Total Products", numbers: product, icon: <FiShoppingCart /> },
      { text: "Total Orders", numbers: "21,309", icon: <FiClipboard /> },
      { icon: <MdContactPhone/>, text: "Total Contacts",   numbers: contact    },
      { icon: <LuLetterText/>,   text: "Total Newsletter", numbers: newsletter },
    ];


    // Fetching Data 

    useEffect(()=>{
          const FetchData = async () => {
              try{
                  setloading(true)
                  
                  var User = await axios.get(`${import.meta.env.VITE_USER_GETUSERCOUNT}`)
                  setUser(User.data.data);
                  
                  var Category = await axios.get(`${import.meta.env.VITE_CATEGORY_COUNT}`)
                  setCategory(Category.data.data)

                  const Contact = await ContactusCount();
                  if(Contact.success){ setContact(Contact?.data?.data);}
                  else {console.log(Contact.data.message)}

                  

                  var Product = await axios.get(`${import.meta.env.VITE_PRODUCT_COUNT}`)
                  setProduct(Product.data.data)



                  const Newsletter = await NewsletterCount();
                  if(Newsletter.success){ setNewsletter(Newsletter?.data?.data);}
                  else {console.log(Newsletter.data.message)}
              }
              catch(err){console.log(err.response?.data.error || "Something Went Wrong")}
              finally {setloading(false)}
          }
          FetchData();},[])

    
    if(loading) return <Loading/>;

    return(<>
      {Dashboard.map((item, index)=>(
            <section key={index} className="flex flex-col gap-10">
              <div className="mt-5 mx-5 px-15 py-3 flex items-center gap-4 font-main">
                <span className="flex items-center gap-3 whitespace-nowrap">
                  <span className="text-lg">{item.icon}</span>
                    {item.text}
                </span>
                <span className="flex-1 border-t-2 border-hover-bg"></span>
                <span className="font-semibold">{item.numbers}</span>
               </div>
            </section>
        ))}
    </>)}

