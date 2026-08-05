import { FaStore, FaSearch } from "react-icons/fa";
import { useState } from "react";
import {Button, Searchbar} from "../../Export.js";

export const VenderRequest = () => {
  const [search, setSearch] = useState("");

  const vendorRequests = [
    {
      name: "Ali Traders",
      details: [
        { label: "Email", value: "ali.traders@example.com" },
        { label: "Phone", value: "0300-1234567" },
        { label: "Shop Name", value: "Ali Electronics" },
        { label: "Category", value: "Electronics" },
        { label: "Address", value: "House #12, Street 4, Lahore" },
      ],
    },
    {
      name: "Sara Fashion",
      details: [
        { label: "Email", value: "sara.fashion@example.com" },
        { label: "Phone", value: "0321-9876543" },
        { label: "Shop Name", value: "Sara's Boutique" },
        { label: "Category", value: "Clothing" },
        { label: "Address", value: "Flat 5B, Model Town, Karachi" },
      ],
    },
  ];

  const filteredRequests = vendorRequests.filter((vendor) =>
    vendor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-5 mt-5">

      {/* Search bar */}
      <Searchbar type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vendor requests..." />
      

      {/* Vendor request cards */}
      <div className="flex flex-wrap gap-8">
        {filteredRequests.map((vendor, index) => (
          <div
            key={index}
            className="border border-white/10 rounded-2xl p-6 text-white font-main w-[calc(50%-1rem)]"
          >
            {/* Name with icon, underline below */}
            <div className="pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <FaStore size={20} />
                <span className="text-2xl font-semibold">{vendor.name}</span>
              </div>
            </div>

            {/* Fields stacked vertically, "Label: value" */}
            <div className="flex flex-col gap-3">
              {vendor.details.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-white/50 uppercase tracking-wide text-sm w-24">
                    {item.label}:
                  </span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Buttons, left side */}
            <div className="flex justify-start gap-4 mt-6">
              <Button
                text={"Approve"}
                className={"bg-green-700 hover:bg-green-900! hover:text-white!"}
              />
              <Button
                text={"Reject"}
                className={"bg-red-700 hover:bg-red-600! hover:text-white!"}
              />
            </div>
          </div>
        ))}

        {filteredRequests.length === 0 && (
          <p className="text-white/50">No vendor requests found.</p>
        )}
      </div>

    </div>
  );
};