import { useState, useEffect } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Button, Heading, Paragraph, Loading, PageHeader } from "../Export.js"
import {GETUSERPROFILE, PROFILEUPDATE} from "../APIs/UserAPIS.js"

export const UserProfile = () => {
    const navigate = useNavigate();

    const [getData, SetGetdata] = useState(null);
    const [isEdit, setIsedit] = useState(false);
    const [form, setForm] = useState({ Fullname: "", Age: "", PhoneNumber: "", Gender: "", Address: "", City: "", DateOfBirth: ""});
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Fetch Profile Data
useEffect(() => {
    var userid = localStorage.getItem("UserId");

    var Fetchdata = async (Id) => {
        try {
            setLoading(true);
            var response = await GETUSERPROFILE(Id);
            if (response.success) {
                SetGetdata(response?.data?.data);

                setForm({
                    Fullname: response?.data?.data?.fullname || "",
                    Age: response?.data?.data?.age || "",
                    PhoneNumber: response?.data?.data?.phoneNumber || "",
                    Gender: response?.data?.data?.gender || "",
                    Address: response?.data?.data?.address || "",
                    City: response?.data?.data?.city || "",
                    DateOfBirth: response?.data?.data?.dateOfBirth || ""
                });
            } else {
                setError(response.message);
            }
        }
        catch (err) { setError(err?.response?.data?.message); }
        finally { setLoading(false); }
    };

    if (userid) { Fetchdata(userid); }
}, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
        setLoading(true);
        var userid = localStorage.getItem("UserId");

        var formData = new FormData();
        formData.append("Fullname", form.Fullname);
        formData.append("Age", form.Age);
        formData.append("PhoneNumber", form.PhoneNumber);
        formData.append("Gender", form.Gender);
        formData.append("Address", form.Address);
        formData.append("City", form.City);
        formData.append("DateOfBirth", form.DateOfBirth);

        if (form.ProfilePicture) {
            formData.append("ProfilePicture", form.ProfilePicture);
        }

        var response = await PROFILEUPDATE(userid, formData);

        if (response.success) {
            setSuccess(response?.message);
            SetGetdata(response?.data?.data);
            setIsedit(false);
        } else {
            setError(response?.message);
        }
    }
    catch (err) { setError(err?.response?.data?.message); }
    finally { setLoading(false); }
};


        if(loading) return <Loading />
    return (
        <>
            <section className="h-screen flex items-center justify-center p-4">
            <div className="bg-background-color p-8 rounded-md w-full max-w-md">

        {!isEdit 
        ? (<>
                {/* View Mode */}
                <div className="flex flex-col items-center gap-5 justify-center mb-4">
                    <img src={previewUrl || getData?.profilePictureUrl || "https://www.govtmohindracollege.in/wp-content/uploads/2023/10/photo-placeholder.webp"}
                        className="w-32 h-32 rounded-full object-cover border-4 border-hover-bg" />
                    <Heading className={"text-2xl!"} text={`${getData?.fullname}`} />
                
                </div>

                <div className="flex flex-col gap-5 mt-10">
                    <Paragraph text={`Age: ${getData?.age}`} />
                    <Paragraph text={`Phone: ${getData?.phoneNumber}`} />
                    <Paragraph text={`Gender: ${getData?.gender}`} />
                    <Paragraph text={`City: ${getData?.city}`} />
                    <Paragraph text={`Address: ${getData?.address}`} />
                    <Paragraph text={`Date of Birth: ${getData?.dateOfBirth}`} />
                    <Button onClick={() => setIsedit(true)} text={"Update Profile"}/>
                    <Link to={"/"} className="text-center text-[12px]">Back to Homepage</Link>
                </div>
            </>
        ) 
        : (<>
                <PageHeader text={"Update profile"}/>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Image Upload */}
                <div className="flex justify-center mb-4">
                    <div className="relative w-32 h-32">
                    <img src={previewUrl || getData?.profilePictureUrl || "https://placehold.co/150"}
                    className="w-32 h-32 rounded-full object-cover border-4 border-hover-bg" />

            {/* Camera icon overlay to trigger file input */}
<label htmlFor="profileImageInput"
    className="absolute bottom-0 right-0 bg-hover-bg rounded-full p-2 cursor-pointer" >
    📷
</label>

<input id="profileImageInput" type="file" accept="image/*" className="hidden" 
onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, ProfilePicture: file });
            setPreviewUrl(URL.createObjectURL(file));
        }}} />
            </div>
            </div>

                    {/* Fullname - own line */}
                    <Input type="text" name="Fullname" placeholder="Full Name" value={form.Fullname}
                        onChange={(e) => setForm({ ...form, Fullname: e.target.value })} />

                    {/* Age, Phone, DOB - one line */}
                    <div className="flex gap-4">
                        <Input type="text" name="Age" placeholder="Age" value={form.Age}
                            onChange={(e) => setForm({ ...form, Age: e.target.value })} className="flex-1" />

                        <Input type="text" name="PhoneNumber" placeholder="Phone" value={form.PhoneNumber}
                            onChange={(e) => setForm({ ...form, PhoneNumber: e.target.value })} className="flex-1" />

                        <Input type="text" name="DateOfBirth" placeholder="Date of Birth" value={form.DateOfBirth}
                            onChange={(e) => setForm({ ...form, DateOfBirth: e.target.value })} className="flex-1" />
                    </div>

                    {/* Gender, City - next line */}
                    <div className="flex gap-4">
                        <Input type="text" name="Gender" placeholder="Gender" value={form.Gender}
                            onChange={(e) => setForm({ ...form, Gender: e.target.value })} className="flex-1" />

                        <Input type="text" name="City" placeholder="City" value={form.City}
                            onChange={(e) => setForm({ ...form, City: e.target.value })} className="flex-1" />
                    </div>

                    {/* Address - next line */}
                    <Input type="text" name="Address" placeholder="Address" value={form.Address}
                        onChange={(e) => setForm({ ...form, Address: e.target.value })} />

                    <div className="flex gap-5 mt-4">
                        {loading 
                        ? (<Button text={"...Loading"} className={"flex-1"} disabled />)
                        : (<Button type={"submit"} text={"Update"} className={"flex-1"} />)}

                        <Button onClick={() => setIsedit(false)} text={"Close"} className={"flex-1"} />
                        
                    </div>



                </form>
                
            {error   && (<div className="text-button-redhover text-sm font-medium text-center pt-3">  {error}  </div>)}
            {success && (<div className="text-button-greenhover text-sm font-medium text-center pt-3">{success}</div>)}
            </>
        )}
    </div>
</section>
        </>);};