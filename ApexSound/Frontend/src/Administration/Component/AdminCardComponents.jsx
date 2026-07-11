export const AdminCardComponents = ({ text = "Total user", numbers = "100", icon: Icon }) => {
  return (
    <div className="text-white mt-5 mx-5 px-15 py-3 flex items-center gap-4 font-main">
      <span className="flex items-center gap-3 whitespace-nowrap">
        {Icon && <Icon size={22} />}
        {text}
      </span>
      <span className="flex-1 border-t-2 border-hover-bg"></span>
      <span className="font-semibold">{numbers}</span>
    </div>
  );
};