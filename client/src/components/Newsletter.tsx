import toast from "react-hot-toast";
import { useCreateNewsletter } from "../hooks/newsletters/useCreateNewsletter";
import SectionTitle from "./SectionTitle";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { create } = useCreateNewsletter();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    await create({ email });
    setEmail("");
  };
  return (
    <div className="newsletter  py-10 lg:py-14 px-5 ">
      <section className="container mx-auto">
        {" "}
        <SectionTitle
          title="Stay in the Loop"
          description="Stay updated with the latest trends and exclusive offers"
        />
        <form
          className="flex flex-col md:flex-row justify-center items-center gap-4 w-full"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-3/5 px-6 py-4 rounded-full bg-primary-white text-primary-text border border-primary-grey shadow-md focus:outline-none focus:ring-2 focus:ring-primary-brand transition-all"
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-full bg-primary-brand hover:bg-secondary-brand text-primary-white font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            Subscribe
          </button>
        </form>
        <p className="text-sm text-secondary-text my-3 text-center">
          No spam, we promise! Unsubscribe anytime.
        </p>
      </section>
    </div>
  );
};

export default Newsletter;
