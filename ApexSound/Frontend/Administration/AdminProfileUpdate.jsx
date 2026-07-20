import { Heading } from "../src/Feature/Heading.jsx";
import { Paragraph } from "../src/Feature/Paragraph.jsx";
import { Button } from "../src/Feature/Button.jsx";
import { Input } from "../src/Feature/Input.jsx";
import { AiFillProfile } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";

export const AdminProfileUpdate = () => {
  const [fetchdata, setFetchdata] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); 
  
  const [saving, setSaving] = useState(false);

  // FETCHING DATA FROM BACKEND
   const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}admin/profile`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
      );
      setFetchdata(response.data);
      setFormData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect ab sirf itna karta hai: call fetchProfile on load
  useEffect(() => {
    fetchProfile();
  }, []);


  // InputFields Change Handler
  const handleInputChange = (e) =>
    {
        const {name, value} = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value, }));    
    }

// New Image Selection Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  
  // Save button handler
  const handleSave = async () => {
        setSaving(true);
        setError(null);
        setSuccess(null);

        try
        {
                // Form Data
                const form = new FormData();
                // Image 
                if(selectedImage){form.append("ProfilePictureUrl", selectedImage);}
                // More Field
                form.append("Fullname", formData.fullname || "");
                form.append("Email", formData.email || "");
                form.append("Age", formData.age || "");
                form.append("PhoneNumber", formData.phoneNumber || "");
                form.append("Address", formData.address || "");
                form.append("City", formData.city === "null" ? "" : formData.city || "");
                form.append("Gender", formData.gender === "null" ? "" : formData.gender || "");
                form.append("DateOfBirth", formData.dateOfBirth ? formData.dateOfBirth.split("T")[0] : "");

            // Backend ko request bhejein
            await axios.put( `${import.meta.env.VITE_BACKEND_URL}admin/update`, form,
            { headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          }, } );
            
            setSuccess("Profile has been updated");
            setSelectedImage(null);
            setPreviewUrl(null);
            setIsEditing(false);
            
            // Fresh Data Fetch
            fetchProfile();

        }
        catch(err)
        { setError(err.response?.data?.message || err.message); }
        finally { setSaving(false);}
        



    }

// Cancel button handler
    const handleCancel = () => {
        setFormData(fetchdata);
        setIsEditing(false);
        setSelectedImage(null);
        setPreviewUrl(null);
    }


  return (
    <section className="h-screen flex items-center justify-center p-4">
  <div className="shadow-2xl shadow-white p-4 rounded-md w-full max-w-md">
    <Button text="Back to Dashboard" to="/admin/dashboard" className="my-2 bg-black hover:bg-white text-white text-sm px-2 rounded inline-block" />

    <span className="flex justify-center items-center gap-4 text-3xl font-semibold mb-6">
      <AiFillProfile />
      <Heading text="Profile Update" />
    </span>

    {loading && <p className="text-blue-500 text-center mb-2">Loading...</p>}

    {!isEditing ? (
      <>
        {/* ---------- VIEW MODE ---------- */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={
              previewUrl ||
              fetchdata.profilePictureUrl ||
              "https://www.govtmohindracollege.in/wp-content/uploads/2023/10/photo-placeholder.webp"
            }
            alt="Set Profile Picture"
            className="w-24 h-24 rounded-full object-cover border border-hover-bg"
          />

          <div className="flex flex-col gap-1 w-full text-sm">
            <p><span className="text-hover-bg">Full Name:</span> {fetchdata.fullname}</p>
            <p><span className="text-hover-bg">Email:</span> {fetchdata.email}</p>
            <p><span className="text-hover-bg">Age:</span> {fetchdata.age}</p>
            <p><span className="text-hover-bg">Phone Number:</span> {fetchdata.phoneNumber}</p>
            <p><span className="text-hover-bg">Address:</span> {fetchdata.address}</p>
            <p><span className="text-hover-bg">City:</span> {fetchdata.city}</p>
            <p><span className="text-hover-bg">Gender:</span> {fetchdata.gender}</p>
            <p><span className="text-hover-bg">Date of Birth:</span> {fetchdata.dateOfBirth}</p>
          </div>

          <div className="flex gap-2 mt-4 w-full">
            <Button
              text="Update Profile"
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-black hover:bg-white text-white hover:text-black transition font-bold py-2 px-4 rounded border border-hover-bg"
            />
          </div>
        </div>
      </>
    ) : (
      <>
        {/* ---------- EDIT MODE ---------- */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <label htmlFor="profileImageInput" className="cursor-pointer relative group">
            <img
              src={
                previewUrl ||
                fetchdata.profilePictureUrl ||
                "https://www.govtmohindracollege.in/wp-content/uploads/2023/10/photo-placeholder.webp"
              }
              alt="Set Profile Picture"
              className="w-24 h-24 rounded-full object-cover border border-hover-bg"
            />
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition">
              Change
            </div>
          </label>

          <Input
            id="profileImageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <Input type="text" name="fullname" value={formData.fullname || ""} onChange={handleInputChange} placeholder="Full Name" />
          <Input type="email" name="email" value={formData.email || ""} onChange={handleInputChange} placeholder="Email" />
          <Input type="number" name="age" value={formData.age || ""} onChange={handleInputChange} placeholder="Age" />
          <Input type="text" name="phoneNumber" value={formData.phoneNumber || ""} onChange={handleInputChange} placeholder="Phone Number" />
          <Input type="text" name="address" value={formData.address || ""} onChange={handleInputChange} placeholder="Address" />
          <Input type="text" name="city" value={formData.city || ""} onChange={handleInputChange} placeholder="City" />

          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleInputChange}
            className="w-full px-2 py-2 bg-transparent border-b border-hover-bg focus:border-white outline-none text-white"
          >
            <option value="" className="bg-black">Select Gender</option>
            <option value="Male" className="bg-black">Male</option>
            <option value="Female" className="bg-black">Female</option>
            <option value="Other" className="bg-black">Other</option>
          </select>

          <Input type="date" name="dateOfBirth" value={formData.dateOfBirth || ""} onChange={handleInputChange} placeholder="Date of Birth" />

          <div className="flex gap-2 mt-2">
            <Button text="Save" onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" />
            <Button text="Cancel" onClick={handleCancel} className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" />
          </div>
        </form>
      </>
    )}

    {/* Error Message */}
    {error && (
      <div className="bg-black p-4 rounded-2xl text-center mt-2 text-red-500 text-sm font-medium">
        {error}
      </div>
    )}

    {/* Success Message */}
    {success && (
      <div className="bg-black p-4 rounded-2xl text-center mt-2 text-green-500 text-sm font-medium">
        {success}
      </div>
    )}
  </div>
</section>
  )
}