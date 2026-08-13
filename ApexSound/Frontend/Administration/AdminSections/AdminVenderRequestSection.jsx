import { FaStore } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Button, Searchbar, Paragraph, Loading, PageHeader } from "../../Export.js";
import { GetAllVendorRequests, ApproveVendorRequest, DeleteVendorRequest } from "../../APIs/VendersAPIS.js";

export const AdminVenderRequestSection = () => {

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Vender List
  useEffect(() => {
    var FetchData = async () => {
      try {
        setLoading(true);
        var response = await GetAllVendorRequests();
        if (response.success){setData(response?.data?.data || []);}
        }
        catch (err) {console.log(err?.response?.data?.message || "Something Went Wrong");}
        finally {setLoading(false);}
    }; FetchData();
  }, []);

  const vendorRequests = data.map((vendor) => ({
    id: vendor.id, name: vendor.vendorName,
    details: [
      { label: "Email", value: vendor.email },
      { label: "Phone", value: vendor.phone },
      { label: "Message", value: vendor.message },
      { label: "Created At", value: vendor.createdAt },
    ],}));

    // SearchBar
  const filteredRequests = vendorRequests.filter((vendor) =>
    vendor.name?.toLowerCase().includes(search.toLowerCase()));

  // Vender Approve
  const handleApprove = async (Id) => {
    try {
      setLoading(true);
      var response = await ApproveVendorRequest(Id);
      if (response.success) { setData((prev) => prev.filter((item) => item.id !== Id)); }
      }
      catch (err){console.log(err?.response?.data?.message || "Something Went Wrong");} 
      finally{setLoading(false);}};

      // Vender Reject
  const handleReject = async (Id) => {
    try {
      setLoading(true);
      var response = await DeleteVendorRequest(Id);
      if (response.success) {setData((prev) => prev.filter((item) => item.id !== Id));}
      }
      catch (err){console.log(err?.response?.data?.message || "Something Went Wrong");}
      finally{ setLoading(false); }};

  if (loading) return <Loading />

  return (
    <div className="mx-5 mt-5">
      {/* Search bar */}
      <Searchbar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vendor requests..." />

      {/* Vendor request cards */}
      <div className="flex flex-col md:flex-row flex-wrap gap-5 mt-6">
        {filteredRequests.map((vendor, index) => (
          <div key={index} className="bg-background-color rounded-2xl p-6 w-full md:w-[calc(33.333%-1.34rem)]">
            {/* Header with icon, underline below */}
            <div className="pb-4 mb-5 border-b">
              <div className="flex items-center gap-3">
                <FaStore size={20} />
                <span className="text-lg font-semibold">
                  {vendor.name}
                </span>
              </div>
            </div>

            {/* Fields stacked vertically */}
            <div className="flex flex-col gap-2">
              {vendor.details.map((item, i) => (
                <div key={i}>
                  <Paragraph text={`${item.label}: ${item.value}`} />
                </div>
              ))}
            </div>

            {/* Approve / Reject buttons */}
            <div className="flex gap-3 mt-6">
              <Button onClick={() => handleApprove(vendor.id)} text={"Approve"} className={"w-full text-sm! hover:bg-button-greenhover!"}/>
              <Button onClick={() => handleReject(vendor.id)} text={"Reject"} className={"w-full text-sm! hover:bg-button-redhover"} />
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <PageHeader text={"No vendor requests found."} className={"text-button-redhover"} />
      )}
    </div>
  );
};