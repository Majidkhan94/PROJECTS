import { AiFillProfile } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Heading, Paragraph, Button, Input, PageHeader} from "../Export.js";
import { GETADMINPROFILE, PROFILEUPDATE } from "../APIs/AdminAPIs.js"

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
        const adminId = localStorage.getItem("adminId");
        const response = await GETADMINPROFILE(adminId);
        if (response.success) {
            setFetchdata(response?.data?.data || {});
            setFormData(response?.data?.data || {});
        } else {
            setError(response?.message);
        }
    } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
  fetchProfile();
}, []);

  // InputFields Change Handler
  const handleInputChange = (e) =>{ setFormData({...formData, [e.target.name]: e.target.value})}

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

    try {
        const adminId = localStorage.getItem("adminId");

        const form = new FormData();
        if (selectedImage) { form.append("ProfilePictureUrl", selectedImage); }
        form.append("Fullname", formData.fullname || "");
        form.append("Email", formData.email || "");
        form.append("Age", formData.age || "");
        form.append("PhoneNumber", formData.phoneNumber || "");
        form.append("Address", formData.address || "");
        form.append("City", formData.city === "null" ? "" : formData.city || "");
        form.append("Gender", formData.gender === "null" ? "" : formData.gender || "");
        form.append("DateOfBirth", formData.dateOfBirth ? formData.dateOfBirth.split("T")[0] : "");

        const response = await PROFILEUPDATE(adminId, form);

        if (response.success) {
            setSuccess(response?.message || "Profile has been updated");
            setSelectedImage(null);
            setPreviewUrl(null);
            setIsEditing(false);
            fetchProfile();
        } else {
            setError(response?.message);
        }
    }
    catch (err) {
        setError(err?.response?.data?.message || "Something went wrong");
    }
    finally { setSaving(false); }
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
  <div className="bg-background-color p-8 rounded-md w-full max-w-md">

    {!isEditing 
    ? (<>
            {/* View Mode */}
            <div className="flex flex-col items-center gap-5 justify-center mb-4">
                <img src={previewUrl || fetchdata?.profilePictureUrl || "https://www.govtmohindracollege.in/wp-content/uploads/2023/10/photo-placeholder.webp"}
                    className="w-32 h-32 rounded-full object-cover border-4 border-hover-bg" />
                <Heading className={"text-2xl!"} text={`${fetchdata?.fullname}`} />
            
            </div>

            <div className="flex flex-col gap-5 mt-10">
                <Paragraph text={`Email: ${fetchdata?.email}`} />
                <Paragraph text={`Age: ${fetchdata?.age}`} />
                <Paragraph text={`Phone: ${fetchdata?.phoneNumber}`} />
                <Paragraph text={`Gender: ${fetchdata?.gender}`} />
                <Paragraph text={`City: ${fetchdata?.city}`} />
                <Paragraph text={`Address: ${fetchdata?.address}`} />
                <Paragraph text={`Date of Birth: ${fetchdata?.dateOfBirth}`} />
                <Button onClick={() => setIsEditing(true)} text={"Update Profile"} />
                <Link to={"/admin/dashboard"} className="text-center text-[12px]">Back to Dashboard</Link>
                <Link to={"/"} className="text-center text-[12px]">Back to Homepage</Link>
            </div>
        </>
    ) 
    : (<>
            <PageHeader text={"Update profile"}/>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
    {/* Image Upload */}
    <div className="flex justify-center mb-4">
        <div className="relative w-32 h-32">
        <img src={previewUrl || fetchdata?.profilePictureUrl || "https://placehold.co/150"}
        className="w-32 h-32 rounded-full object-cover border-4 border-hover-bg" />

        {/* Camera icon overlay to trigger file input */}
        <label htmlFor="profileImageInput"
            className="absolute bottom-0 right-0 bg-hover-bg rounded-full p-2 cursor-pointer" >
            📷
        </label>

        <input id="profileImageInput" type="file" accept="image/*" className="hidden" 
        onChange={handleImageChange} />
        </div>
    </div>

    {/* Fullname - own line */}
    <Input type="text" name="fullname" placeholder="Full Name" value={formData.fullname || ""}
        onChange={handleInputChange} />

    {/* Age, Phone, DOB - one line */}
    <div className="flex gap-4">
        <Input type="text" name="age" placeholder="Age" value={formData.age || ""}
            onChange={handleInputChange} className="flex-1" />

        <Input type="text" name="phoneNumber" placeholder="Phone" value={formData.phoneNumber || ""}
            onChange={handleInputChange} className="flex-1" />

        <Input type="text" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth || ""}
            onChange={handleInputChange} className="flex-1" />
    </div>

    {/* Gender, City - next line */}
    <div className="flex gap-4">
        <Input type="text" name="gender" placeholder="Gender" value={formData.gender || ""}
            onChange={handleInputChange} className="flex-1" />

        <Input type="text" name="city" placeholder="City" value={formData.city || ""}
            onChange={handleInputChange} className="flex-1" />
    </div>

    {/* Address - next line */}
    <Input type="text" name="address" placeholder="Address" value={formData.address || ""}
        onChange={handleInputChange} />

    <div className="flex gap-5 mt-4">
        {loading 
        ? (<Button text={"...Loading"} className={"flex-1"} disabled />)
        : (<Button type={"submit"} text={"Update"} className={"flex-1"} />)}

        <Button onClick={handleCancel} text={"Close"} className={"flex-1"} />
        
    </div>

</form>
            
        {error   && (<div className="text-red-500 text-sm font-medium text-center pt-3">  {error}  </div>)}
        {success && (<div className="text-green-500 text-sm font-medium text-center pt-3">{success}</div>)}
        </>
    )}
</div>
</section>
  )
}