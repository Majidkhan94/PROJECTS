import { FaSearch } from "react-icons/fa";
export const Searchbar = ({ type = "text", value, onChange, placeholder = "Search..." }) => {
  return (<>
    <div className="p-5">
      <div className="flex items-center gap-3 bg-background-color rounded-full px-5 py-3">
            <FaSearch size={16} />
            <input type={type} value={value} onChange={onChange} placeholder={placeholder}
              className="bg-transparent outline-none w-full font-main" />
      </div>
    </div>
  </>)};
