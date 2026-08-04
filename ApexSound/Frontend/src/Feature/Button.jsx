import { Link } from 'react-router-dom';

export const Button = ({ text, onClick, to, type, className }) => {
  const baseStyle = `${className} text-center 
  bg-button-main text-brand-color hover:bg-white/10 hover:text-text-color cursor-pointer font-main font-semibold p-3 rounded-lg transition-all duration-200 block`;

if (to)
{
    return ( <Link to={to} className={baseStyle}> {text} </Link> ); 
}
else
{
  return ( <button onClick={onClick} className={baseStyle} type={type}> {text} </button> );
}
;}
