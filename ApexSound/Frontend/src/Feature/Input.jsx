export const Input = ({type, placeholder, name, value, onChange, id, accept, className}) => {
    return (<>
    
    <div className="w-full mb-4">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        id={id}
        accept = {accept}
        className={`${className} w-full px-2 py-2 bg-transparent border-b border-hover-bg
                focus:border-white placeholder-hover-bg outline-none`} />
    </div>
    
    </>)}  