import { FaUser, FaSearch } from "react-icons/fa";
import { Button } from "../../../Feature/Button";
import { useState } from "react";

export const AdminUserManagement = () => {
  const [search, setSearch] = useState("");

  const users = [
    {
      name: "John Doe",
      details: [
        { label: "Email", value: "john.doe@example.com" },
        { label: "Phone", value: "0300-1234567" },
        { label: "Address", value: "House #12, Street 4" },
        { label: "DOB", value: "01-01-2000" },
        { label: "Age", value: "24" },
        { label: "City", value: "Lahore" },
        { label: "Gender", value: "Male" },
      ],
    },
    {
      name: "Ayesha Khan",
      details: [
        { label: "Email", value: "ayesha.khan@example.com" },
        { label: "Phone", value: "0321-9876543" },
        { label: "Address", value: "Flat 5B, Model Town" },
        { label: "DOB", value: "15-05-1996" },
        { label: "Age", value: "28" },
        { label: "City", value: "Karachi" },
        { label: "Gender", value: "Female" },
      ],
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-5 mt-5">

      {/* Search bar */}
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-3 mb-8 w-full">
        <FaSearch className="text-white/50" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="bg-transparent outline-none text-white placeholder-white/40 w-full font-main"
        />
      </div>

      {/* User cards */}
      <div className="flex flex-wrap gap-8">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="border border-white/10 rounded-2xl p-6 text-white font-main w-[calc(50%-1rem)]"
          >
            {/* Name with icon, underline below */}
            <div className="pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <FaUser size={20} />
                <span className="text-2xl font-semibold">{user.name}</span>
              </div>
            </div>

            {/* Fields stacked vertically, "Label: value" */}
            <div className="flex flex-col gap-3">
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
              <Button
                text={"Update"}
                className={"bg-green-700 hover:bg-green-900! hover:text-white!"}
              />
              <Button
                text={"Delete"}
                className={"bg-red-700 hover:bg-red-600! hover:text-white!"}
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