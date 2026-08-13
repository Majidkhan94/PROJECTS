import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, PageHeader, Paragraph, Pagetitle } from "../Export.js";
import { Registeration } from "../APIs/AdminAPIs.js"

export const AdminRegisteration = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({ Fullname: "", Email: "", Password: "", Confirmpassword: "" });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.Fullname || !form.Email || !form.Password || !form.Confirmpassword) {
      setError("All fields are required");
      setTimeout(() => { setError(null) }, 1500);return;}

    if (!form.Email.includes("@")) {
      setError("Please enter a valid email address");
      setTimeout(() => { setError(null) }, 1500);return;}

    if (form.Password !== form.Confirmpassword) {
      setError("Passwords do not match");
      setTimeout(() => { setError(null) }, 1500);return;}

    try {
      setLoading(true);

      var Register = await Registeration(form);

      if (Register.success) {
        setSuccess(Register?.message);
        localStorage.setItem("accessToken", Register?.data?.data?.accesstoken);
        localStorage.setItem("adminId", Register?.data?.data?.id);
        localStorage.setItem("Role", Register?.data?.data?.role);

        const timer = setTimeout(() => { navigate("/admin/dashboard"); }, 1500);
        return () => clearTimeout(timer);
      }
      else { setError(Register?.message);}
    }
    catch (err) { setError(err?.response?.data?.message); }
    finally { setLoading(false); }
  }

  return (<>
      <Pagetitle title={"Admin Registeration"}/>
    <section className="h-screen flex items-center justify-center p-4">
      <div className="bg-background-color p-8 rounded-md w-full max-w-md">

        <span className="flex justify-center items-center gap-3 mb-6">
          <PageHeader text={"ADMIN REGISTRATION"} />
        </span>

        <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>

          <Input type="text" name="Fullname" placeholder="Full Name" value={form.Fullname}
            onChange={(e) => setForm({ ...form, Fullname: e.target.value })} />

          <Input type="text" name="Email" placeholder="Email" value={form.Email}
            onChange={(e) => setForm({ ...form, Email: e.target.value })} />

          <Input type="password" name="Password" placeholder="Password" value={form.Password}
            onChange={(e) => setForm({ ...form, Password: e.target.value })} />

          <Input type="password" name="Confirmpassword" placeholder="Confirm Password" value={form.Confirmpassword}
            onChange={(e) => setForm({ ...form, Confirmpassword: e.target.value })} />

          <Button text={loading ? "Registering..." : "Register"} type={"submit"} className={"text-sm!"} />

        </form>

        {/* Login Link */}
        <div className="flex justify-center gap-2 mt-4 text-sm">
          <Paragraph text={"Already have an account?"} />
          <Link to="/admin/login" className="font-semibold hover:underline"> Login here </Link>
        </div>
        <div className="w-full text-center text-[12px] mt-4"><Link to={"/"}>Back to Homepage</Link></div>


        {error && (<div className="text-red-500 text-sm font-medium text-center pt-3">  {error}  </div>)}
        {success && (<div className="text-green-500 text-sm font-medium text-center pt-3">{success}</div>)}
      </div>
    </section>

  </>)
}