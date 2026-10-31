import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Leaf, ArrowLeft, Home } from "lucide-react";

export const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Pureliva Foods</title>
        <meta name="description" content="The page you requested could not be found." />
      </Helmet>

      <div className="pt-36 pb-28 min-h-[80vh] flex items-center justify-center bg-white px-4">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-pureliva-green/10 text-pureliva-green flex items-center justify-center mx-auto">
            <Leaf size={36} />
          </div>

          <span className="font-script text-3xl text-pureliva-brown">
            Lost in the harvest?
          </span>

          <h1 className="font-heading text-5xl font-extrabold text-pureliva-heading">
            404
          </h1>

          <p className="text-pureliva-body text-sm sm:text-base leading-relaxed">
            The page you are looking for doesn't exist or has been relocated. Let's get you back to pure nutrition.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/"
              className="px-6 py-3 rounded-2xl bg-pureliva-green text-white font-semibold text-sm hover:bg-pureliva-green-hover transition-colors flex items-center gap-2"
            >
              <Home size={16} />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/products"
              className="px-6 py-3 rounded-2xl bg-pureliva-cream border border-stone-200 text-pureliva-heading font-semibold text-sm hover:bg-stone-100 transition-colors"
            >
              <span>Explore Seeds</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

