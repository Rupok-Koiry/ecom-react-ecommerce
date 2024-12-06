import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLogin } from "../hooks/auth/useLogin";
import Button from "../components/Button";
import { Link } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
}

const schema: yup.ObjectSchema<IFormInput> = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { login, isPending } = useLogin();

  const onSubmit: SubmitHandler<IFormInput> = (data) => login(data);

  return (
    <section className="flex items-center justify-center py-12 px-5">
      <div className="w-full max-w-xl p-6 lg:p-8 bg-primary-white shadow-lg rounded-xl">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-3 text-primary-text">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <Button className="w-full" disabled={isPending} loading={isPending}>
            Submit
          </Button>

          <div className="flex justify-between items-center text-sm text-secondary-text font-medium">
            <a
              href="/forgot-password"
              className="hover:text-primary-orange transition-all duration-300"
            >
              Forgot Password?
            </a>
            <Link
              to="/sign-up"
              className="text-primary-orange hover:text-secondary-orange transition-all duration-300"
            >
              Sign Up Instead
            </Link>
          </div>
        </form>

        <footer className="mt-4 text-center text-sm text-secondary-text font-medium">
          <a
            href="/privacy-policy"
            className="hover:text-primary-orange transition-all duration-300"
          >
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="/terms-of-service"
            className="hover:text-primary-orange transition-all duration-300"
          >
            Terms of Service
          </a>
        </footer>
      </div>
    </section>
  );
};

export default Login;
