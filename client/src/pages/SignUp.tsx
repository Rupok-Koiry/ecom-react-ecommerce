import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/auth/useSignup";
import Button from "../components/Button";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  terms: boolean;
}

const schema: yup.ObjectSchema<IFormInput> = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  phone: yup.string().optional(),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required(),
});

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { signup, isPending } = useSignup();

  const onSubmit: SubmitHandler<IFormInput> = (newUser) => {
    signup(newUser);
  };

  return (
    <section className="flex items-center justify-center  container bg-primary-background py-8 lg:py-10 px-5 mx-auto">
      <div className="w-full max-w-xl  p-6 lg:p-8 bg-primary-white shadow-lg rounded-xl">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-3 text-primary-text">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
            />
            {errors.name && (
              <p className="text-primary-red text-xs">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
            />
            {errors.email && (
              <p className="text-primary-red text-xs">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
            />
            {errors.password && (
              <p className="text-primary-red text-xs">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
            />
            {errors.confirmPassword && (
              <p className="text-primary-red text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="text"
              {...register("phone")}
              className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-orange border outline-none py-1.5 lg:py-2 px-3"
            />
          </div>

          <div className="flex items-center font-medium">
            <input
              type="checkbox"
              {...register("terms")}
              className="w-4 h-4 accent-primary-orange text-primary-orange border-secondary-grey rounded focus:ring-primary-orange"
            />
            <label className="ml-2 block text-sm text-primary-text">
              I agree to the{" "}
              <a
                href="/terms-of-service"
                className="text-primary-orange hover:text-secondary-orange transition-all duration-300"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-primary-red text-xs">{errors.terms.message}</p>
          )}

          <Button className="w-full" disabled={isPending} loading={isPending}>
            Sign Up
          </Button>

          <p className="text-sm text-center text-secondary-text font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-orange hover:text-secondary-orange transition-all duration-300"
            >
              Login Instead
            </Link>
          </p>
        </form>

        <footer className="mt-4 text-center text-sm text-secondary-text font-medium">
          <a
            href="/privacy-policy"
            className="hover:text-secondary-orange transition-all duration-300"
          >
            Privacy Policy
          </a>{" "}
          <span className="text-primary-orange">|</span>{" "}
          <a
            href="/terms-of-service"
            className="hover:text-secondary-orange transition-all duration-300"
          >
            Terms of Service
          </a>
        </footer>
      </div>
    </section>
  );
};

export default SignUp;
