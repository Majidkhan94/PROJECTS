import { Link } from "react-router-dom";
import { FaGhost } from "react-icons/fa6";

export const NotFound404 = () => {
  return (
    <section className="h-screen flex items-center justify-center p-4 bg-black">
      <div className="text-center max-w-md">
        
        <FaGhost className="text-white text-7xl mx-auto mb-6 animate-bounce" />

        <h1 className="text-9xl font-bold text-white mb-2">404</h1>
        
        <p className="text-2xl font-semibold text-white mb-10">
          Page Not Found
        </p>
        
        <Link
          to="/"
          className="inline-block bg-white text-black hover:bg-black hover:text-white border border-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
        >
          Back to Homepage
        </Link>

      </div>
    </section>
    
  );
};