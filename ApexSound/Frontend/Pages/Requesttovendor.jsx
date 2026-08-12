import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input, Button, Heading, Paragraph, PageHeader, Pagetitle } from "../Export.js";
import { AddVendorRequest } from "../APIs/VendersAPIS.js";


export const Requesttovendor = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    VendorName: "",
    Email: "",
    Phone: "",
    Product: "",
    Message: ""
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      var request = await AddVendorRequest(form);
      if (request.success) {
        setSuccess(request?.message);
        var timer = setTimeout(() => { navigate("/"); }, 1500);
        return () => clearTimeout(timer);
      }
      else {
        setError(request?.message);
        setTimeout(() => { setError(null); }, 1500);
      }
    }
    catch (err) { setError(err?.response?.data); }
    finally { setLoading(false); }
  }

  return (
    <>
      <Pagetitle title={"Request To Vendor"} />
      <section className="h-screen flex items-center justify-center p-4">
        <div className="bg-background-color p-8 rounded-md w-full max-w-md">
          <PageHeader text={"Request To Vendor"} />
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>

            <Input type="text" name="VendorName" placeholder="Vendor Name" value={form.VendorName}
              onChange={(e) => setForm({ ...form, VendorName: e.target.value })} />

            <Input type="email" name="Email" placeholder="Email" value={form.Email}
              onChange={(e) => setForm({ ...form, Email: e.target.value })} />

            <Input type="text" name="Phone" placeholder="Phone Number" value={form.Phone}
              onChange={(e) => setForm({ ...form, Phone: e.target.value })} />

            <Input type="text" name="Product" placeholder="Product / Service Needed" value={form.Product}
              onChange={(e) => setForm({ ...form, Product: e.target.value })} />

            <Input type="text" name="Message" placeholder="Message / Details" value={form.Message}
              onChange={(e) => setForm({ ...form, Message: e.target.value })} />

            <Button text={loading ? "Submitting..." : "Submit Request"} type={"submit"} />
          </form>

          <div className="w-full text-center text-[12px] mt-4">
            <Link to={"/"}>Back to Homepage</Link>
          </div>

          {error && (<div className="text-red-500 text-sm font-medium text-center pt-3">{error}</div>)}
          {success && (<div className="text-green-500 text-sm font-medium text-center pt-3">{success}</div>)}
        </div>
      </section>
    </>
  )
}