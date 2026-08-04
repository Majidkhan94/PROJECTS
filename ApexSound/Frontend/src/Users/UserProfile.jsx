import { Input } from "../src/Feature/Input.jsx"
import { Button } from "../src/Feature/Button.jsx"
import { Heading } from "../src/Feature/Heading.jsx"
import { Paragraph } from "../src/Feature/Paragraph.jsx"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
    const navigate = useNavigate();

    const [getData, SetGetdata] = useState(null);
    const [isEdit, setIsedit] = useState(false);

    const [form, setForm] = useState({ Fullname: "", Age: "", PhoneNumber: "", Gender: "", Address: "", City: "", DateOfBirth: ""});
    const [success, setSuccess] = useState(null);
    const [error, seterror] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Fetch profile data on load
    useEffect(() => {
        var userid = localStorage.getItem("UserId");

        var Fetchdata = async (Id) => {
            try {
                setLoading(true);
                var response = await axios.get(`${import.meta.env.VITE_USER_GETUSERPROFILE}/${Id}`);
                SetGetdata(response.data.data);

                // ✅ Form ko fetched data se prefill karo
                setForm({
                    Fullname: response.data.data.fullname || "",
                    Age: response.data.data.age || "",
                    PhoneNumber: response.data.data.phoneNumber || "",
                    Gender: response.data.data.gender || "",
                    Address: response.data.data.address || "",
                    City: response.data.data.city || "",
                    DateOfBirth: response.data.data.dateOfBirth || ""
                });

                console.log("Fetch Data Successfully", response.data.data);
            } catch (err) {
                console.log("Fetch Data Failed", err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userid) { Fetchdata(userid); }
    }, []);

    // Profile update submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        seterror(null);
        setSuccess(null);

        try {
            setLoading(true);

            var userid = localStorage.getItem("UserId");
            var token = localStorage.getItem("accessToken");

            // ✅ Consistent naming: formData (pehle formdata/formData mismatch tha)
            var formData = new FormData();
            formData.append("Fullname", form.Fullname);
            formData.append("Age", form.Age);
            formData.append("PhoneNumber", form.PhoneNumber);
            formData.append("Gender", form.Gender);
            formData.append("Address", form.Address);
            formData.append("City", form.City);
            formData.append("DateOfBirth", form.DateOfBirth);

            // ✅ await add kiya
            var response = await axios.put(
                `${import.meta.env.VITE_USER_PROFILE}/${userid}`,
                formData, {headers:{
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`}});

            setSuccess(response.data.message);
            SetGetdata(response.data.data);
            setIsedit(false);

        } 
        catch (err) {
            if (err.response){seterror(err.response.data.error || "Update Failed!");}
            else {seterror("Something went wrong. Please try again.");}
        }
        finally{setLoading(false);}};

    return (
        <>
            <section className="h-screen flex items-center justify-center p-4">
                <div className="shadow-2xl shadow-white p-8 rounded-md w-full max-w-md">

                    {!isEdit 
                    ? (<>
                            {/* View Mode */}
                            <div className="flex justify-center mb-4">
                                <img
                                    src={previewUrl || getData?.profilePictureUrl || "https://via.placeholder.com/150"}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-hover-bg" />
                            </div>

                            <div className="flex flex-col gap-5 mt-10">
                                <Heading className={"text-2xl!"} text={`Full Name: ${getData?.fullname}`} />
                                <Paragraph text={`Age: ${getData?.age}`} />
                                <Paragraph text={`Phone: ${getData?.phoneNumber}`} />
                                <Paragraph text={`Gender: ${getData?.gender}`} />
                                <Paragraph text={`City: ${getData?.city}`} />
                                <Paragraph text={`Address: ${getData?.address}`} />
                                <Paragraph text={`Date of Birth: ${getData?.dateOfBirth}`} />

                                <Button onClick={() => setIsedit(true)} text={"Update Profile"} />
                            </div>
                        </>
                    ) 
                    : (<>
                            <div className="flex justify-center items-center gap-4 text-3xl font-semibold mb-6">
                                <Heading text="UPDATE PROFILE" className={"text-md"} />
                            </div>

                            <form onSubmit={handleSubmit}>
                            {/* Image Upload */}
                            <div className="flex justify-center mb-4">
                                <div className="relative w-32 h-32">
                                <img src={previewUrl || getData?.profilePictureUrl || "https://via.placeholder.com/150"}
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
                                <Input type="text" name="Fullname" placeholder="Full Name" value={form.Fullname}
                                    onChange={(e) => setForm({ ...form, Fullname: e.target.value })} />

                                <Input type="text" name="Age" placeholder="Age" value={form.Age}
                                    onChange={(e) => setForm({ ...form, Age: e.target.value })} />

                                <Input type="text" name="PhoneNumber" placeholder="Phone" value={form.PhoneNumber}
                                    onChange={(e) => setForm({ ...form, PhoneNumber: e.target.value })} />

                                <Input type="text" name="Gender" placeholder="Gender" value={form.Gender}
                                    onChange={(e) => setForm({ ...form, Gender: e.target.value })} />

                                <Input type="text" name="City" placeholder="City" value={form.City}
                                    onChange={(e) => setForm({ ...form, City: e.target.value })} />

                                <Input type="text" name="Address" placeholder="Address" value={form.Address}
                                    onChange={(e) => setForm({ ...form, Address: e.target.value })} />

                                <Input type="text" name="DateOfBirth" placeholder="Date of Birth" value={form.DateOfBirth}
                                    onChange={(e) => setForm({ ...form, DateOfBirth: e.target.value })} />

                                <div className="flex gap-5 mt-4">
                                    {loading 
                                    ? (<Button text={"...Loading"} className={"flex-1"} disabled />)
                                    : (<Button type={"submit"} text={"Update"} className={"flex-1"} />)}

                                    <Button onClick={() => setIsedit(false)} text={"Close"} className={"flex-1"} />
                                </div>
                            </form>

                            {error && (
                                <div className="bg-black p-4 rounded-2xl text-center mt-2 text-red-500 text-sm font-medium">
                                    {error}
                                </div>)}

                            {success && (
                                <div className="bg-black p-4 rounded-2xl text-center mt-2 text-green-500 text-sm font-medium">
                                    {success}
                                </div>)}
                        </>
                    )}
                </div>
            </section>
        </>);};