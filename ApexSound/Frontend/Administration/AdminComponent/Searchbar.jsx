import { FaSearch } from "react-icons/fa";
export const Searchbar = ({ type, value, onChange, placeholder = "Search..." }) => {
  return (<>
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-3 mb-8 w-full">
            <FaSearch className="text-white/50" size={16} />
            <input type={type} value={value} onChange={onChange} placeholder={placeholder}
              className="bg-transparent outline-none text-white placeholder-white/40 w-full font-main" />
          </div>
  </>)};
