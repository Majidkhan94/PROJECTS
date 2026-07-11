import { FaUser } from "react-icons/fa";

export const AdminUserManagement = () => {

  const users = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      age: "24",
      phone: "0300-1234567",
      address: "House #12, Street 4",
      city: "Lahore",
      gender: "Male",
      dob: "01-01-2000",
    },
    // ... baaki users isi shape mein
  ];

  const fields = ["email", "age", "phone", "address", "city", "gender", "dob"];

  return (
    <div className="flex flex-col gap-8 mx-5 mt-5">
      {users.map((user, index) => (
        <div key={index} className="border border-white/10 rounded-2xl p-6 text-white font-main">

          {/* Name with icon, on top */}
          <div className="flex items-center gap-3 mb-5">
            <FaUser size={26} />
            <span className="text-xl font-semibold">{user.name}</span>
          </div>

          {/* Labels row */}
          <div className="grid grid-cols-7 gap-4 text-white/50 text-sm uppercase tracking-wide mb-1">
            {fields.map((field) => (
              <span key={field}>{field}</span>
            ))}
          </div>

          {/* Values row */}
          <div className="grid grid-cols-7 gap-4 font-medium">
            {fields.map((field) => (
              <span key={field}>{user[field]}</span>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}; 