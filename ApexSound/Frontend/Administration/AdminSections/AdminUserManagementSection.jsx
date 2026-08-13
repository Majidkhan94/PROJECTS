import { FaUser, FaAddressCard } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Button, Searchbar, Paragraph, Loading, PageHeader } from "../../Export.js";
import { GETUSERLIST, USERDELETE } from "../../APIs/UserAPIS.js";

export const AdminUserManagementSection = () => {
  
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    var FetchData = async () => {
      try {
        setLoading(true);
        var response = await GETUSERLIST();
        if (response.success) {
          setData(response?.data?.data || []);
        }
      } catch (err) {
        console.log(err?.response?.data?.message || "Something Went Wrong");
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, []);

  const users = data.map((user) => ({
    id: user.id, name: user.fullname, role: user.role,
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
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (Id) => {
    try {
      setLoading(true);
      var response = await USERDELETE(Id);
      if (response.success) {
        setData((prev) => prev.filter((item) => item.id !== Id));
      }
    } catch (err) {
      console.log(err?.response?.data?.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

    if(loading) return <Loading />
  return (
    <div className="mx-5 mt-5">
      {/* Search bar */}
      <Searchbar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contact by name..."/>

      {/* User cards */}
      <div className="flex flex-col md:flex-row flex-wrap gap-5 mt-6">
        {filteredUsers.map((user, index) => (
          <div key={index} className="bg-background-color rounded-2xl p-6 w-full md:w-[calc(33.333%-1.34rem)]">
            {/* Header with icon, underline below */}
            <div className="pb-4 mb-5 border-b">
              <div className="flex items-center gap-3">
                <FaAddressCard size={20} />
                <span className="text-lg font-semibold">
                {user.name} {user.role && `[ ${user.role} ]`}
                </span>
              </div>
            </div>

            {/* Fields stacked vertically */}
            <div className="flex flex-col gap-2">
              {user.details.map((item, i) => (
                <div key={i}>
                 <Paragraph text={`${item.label}: ${item.value}`} />
                </div>
              ))}
            </div>

            {/* Delete button */}
            <div className="mt-6">
              <Button onClick={() => handleDelete(user.id)} text={"Delete"}
                className={"w-full text-sm! hover:bg-button-redhover"}/>
            </div>
          </div>
        ))}

        
      </div>
      {filteredUsers.length === 0 && (
          <PageHeader text={"No users found."} className={"text-button-redhover"}/>
        )}
    </div>
  );
};