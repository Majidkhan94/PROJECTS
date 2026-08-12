import { FiGrid, FiUsers, FiShoppingBag, FiBox, FiShoppingCart, FiClipboard, FiUser } from "react-icons/fi";
import { MdContactPhone } from "react-icons/md";
import { LuLetterText } from "react-icons/lu";
import { useState, useEffect } from "react";
import axios from "axios";
import { NewsletterCount } from "../../APIs/NewsletterAPIs.js";
import { ContactusCount } from "../../APIs/ContactusAPIs.js";
import { GETUSERCOUNT } from "../../APIs/UserAPIS.js";
import { CategoriesCount } from "../../APIs/CategoriesAPIs.js";
import { ProductsCount } from "../../APIs/ProductAPIs.js";

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
      { icon: <FiUsers/>,         text: "Total Users",           numbers: user },
      { icon: <FiShoppingBag />,  text: "Total Vendors Request", numbers: "356"},
      { icon: <FiBox />,          text: "Total Categories",      numbers: category },
      { icon: <FiShoppingCart />, text: "Total Products",        numbers: product, },
      { icon: <FiClipboard />,    text: "Total Orders",          numbers: "21,309", },
      { icon: <MdContactPhone/>,  text: "Total Contacts",        numbers: contact    },
      { icon: <LuLetterText/>,    text: "Total Newsletter",      numbers: newsletter },
    ];


    // Fetching Data 

    useEffect(()=>{
          const FetchData = async () => {
              try{
                  setloading(true)
                  
                  const User = await GETUSERCOUNT();
                  if(User.success){ setUser(User?.data?.data);}
                  else {console.log(User.data.message)}
                  
                  
                  
                  const Categories = await CategoriesCount();
                  if(Categories.success){ setCategory(Categories?.data?.data);}
                  else {console.log(Categories?.data?.message)}

                  
                  const Contact = await ContactusCount();
                  if(Contact.success){ setContact(Contact?.data?.data);}
                  else {console.log(Contact?.data?.message)}

                  

                  const Product = await ProductsCount();
                  if(Product.success){ setProduct(Product?.data?.data);}
                  else {console.log(Product?.data?.message)}



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

