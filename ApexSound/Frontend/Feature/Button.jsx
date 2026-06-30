import { Link } from 'react-router-dom';

export const Button = ({ text, onClick, to }) => {
  const baseStyle = "text-center bg-black text-white hover:bg-white hover:text-black cursor-pointerfont-main font-semibold py-3 rounded-lg transition-all duration-200 block";

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
    <button onClick={onClick} className={baseStyle}>
      {text}
    </button>
  );
};