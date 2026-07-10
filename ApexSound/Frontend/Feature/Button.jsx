import { Link } from 'react-router-dom';

export const Button = ({ text, onClick, to, type, className }) => {
  const baseStyle = `${className} text-center bg-black text-white hover:bg-white hover:text-black cursor-pointer font-main font-semibold p-3 rounded-lg transition-all duration-200 block`;

  // Agar 'to' prop diya gaya hai, toh Link render karo
  if (to) {
    return (
      <Link to={to} className={baseStyle}>
        {text}
      </Link>
    );
  }

  // Warna standard button render karo
  return (
    <button onClick={onClick} className={baseStyle} type={type}>
      {text}
    </button>
  );
};