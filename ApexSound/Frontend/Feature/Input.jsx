export const Input = ({type, placeholder, name, value, onChange}) => {
    return (<>
    
    <div className="w-full mb-4">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-2 bg-transparent border-b border-hover-bg
         focus:border-white placeholder-hover-bg outline-none" />
    </div>
    
    
    
    
    
    </>)}  