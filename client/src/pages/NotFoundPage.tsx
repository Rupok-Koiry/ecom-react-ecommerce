import Button from "../components/Button";
import Lottie from "lottie-react";
import notFound from "../assets/lottie/404.json";

const NotFoundPage = () => {
  return (
    <div className="container  px-5 mx-auto flex flex-col items-center justify-center bg-primary-background text-primary-text">
      <div className="relative">
        <Lottie animationData={notFound} loop={true} />
        <h1
          className="text-5xl lg:text-7xl font-bold text-primary-orange absolute top-1/2 left-1/2 transform 
        -translate-x-1/2 -translate-y-1/2 "
        >
          404
        </h1>
      </div>
      <div className="-mt-12  text-center">
        <h2 className="text-2xl font-semibold text-primary-text">
          Oops! Page not found.
        </h2>
        <p className="text-secondary-text mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center mt-5 mb-8 lg:mb-16">
          <Button href="/">Go back to Home</Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
