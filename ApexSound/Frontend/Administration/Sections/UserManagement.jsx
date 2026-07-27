import { FaUser, FaSearch } from "react-icons/fa";
import { Button } from "../../src/Feature/Button.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

export const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
          var FetchData = async () =>{
              try{
                  setLoading(true)
                 var response = await axios.get(`${import.meta.env.VITE_USER_GETUSERLIST}`);
                 setData(response.data.data)
              }
              catch(err){
                console.log(err.response.data.error || "Something Went Wrong")
              }
              finally{setLoading(false)}
          }
          FetchData();
  },[])

 const users = data.map((user) => ({
  id: user.id,
  name: user.fullname,
  role: user.role,
  details: [
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phoneNumber },
    { label: "Address", value: user.address },
    { label: "DOB", value: user.dateOfBirth },
    { label: "Age", value: user.age },
    { label: "City", value: user.city },
    { label: "Gender", value: user.gender },
  ],
}));

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );


    const handleDelete = async (Id) => {
  try {
    setLoading(true);
    await axios.delete(`${import.meta.env.VITE_USER_DELETE}/${Id}`);
    setData((prev) => prev.filter((item) => item.id !== Id));
  } catch (err) {
    console.log(err.response?.data?.message || "Something Went Wrong");
  } finally {
    setLoading(false);
  }
};
          

  return (
    <div className="mx-5 mt-5">

      {/* Search bar */}
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-3 mb-8 w-full">
        <FaSearch className="text-white/50" size={16} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..." className="bg-transparent outline-none text-white w-full font-main"/>
      </div>

      {/* User cards */}
      <div className="flex flex-wrap gap-5">
        {filteredUsers.map((user, index) => (
          <div key={index} className="border border-white/10 rounded-2xl p-6 text-white font-main w-[calc(50%-1rem)]" >
            {/* Name with icon, underline below */}
            <div className="pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <FaUser size={20} />
                <span className="text-lg font-semibold">{user.name} [ {user.role} ]</span>
              </div>
            </div>

            {/* Fields stacked vertically, "Label: value" */}
            <div className="flex flex-col gap-2">
              {user.details.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-white/50 uppercase tracking-wide text-sm w-20">
                    {item.label}:
                  </span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Buttons, left side */}
            <div className="flex justify-start gap-4 mt-6">
              {/* <Button
                text={"Update"}
                className={"bg-green-700 hover:bg-green-900! hover:text-white!"}
              /> */}
              <Button onClick={()=> handleDelete(user.id)}
                text={"Delete"}
                className={"w-full hover:bg-red-600! hover:text-white!"}
              />
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-white/50">No users found.</p>
        )}
      </div>

    </div>
  );
};