import { Link } from 'react-router-dom';

export const Button = ({ text, onClick, to, type, className }) => {
  const baseStyle = `${className} text-center 
  bg-button-color hover:bg-button-hover cursor-pointer font-main font-semibold p-3 rounded-lg transition-all duration-500 block`;

if (to)
{
    return ( <Link to={to} className={baseStyle}> {text} </Link> ); 
}
else
{
  return ( <button onClick={onClick} className={baseStyle} type={type}> {text} </button> );
}
;}
