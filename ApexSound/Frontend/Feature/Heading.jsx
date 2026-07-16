export const Heading = ({ text, className}) => {
    return (
        <h1 className={`font-main font-semibold text-3xl text-white tracking-tight ${className}`}>
            {text}
        </h1>
    );
};