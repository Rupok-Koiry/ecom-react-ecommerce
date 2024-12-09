import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button";
import { useForgotPassword } from "../hooks/auth/useForgotPassword";

interface IFormInput {
  email: string;
}

const schema: yup.ObjectSchema<IFormInput> = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { forgotPassword, isPending } = useForgotPassword();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    forgotPassword(data.email);
  };

  return (
    <section className="flex items-center justify-center py-12 px-5">
      <div className="w-full max-w-xl p-6 lg:p-8 bg-primary-white shadow-lg rounded-xl">
        <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-3 text-primary-text font-playwrite">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
            />
            {errors.email && (
              <p className="text-error-color text-xs">{errors.email.message}</p>
            )}
          </div>

          <Button className="w-full" loading={isPending} disabled={isPending}>
            Submit
          </Button>
        </form>

        <footer className="mt-4 text-center text-sm text-secondary-text font-medium">
          <a
            href="/privacy-policy"
            className="hover:text-primary-brand transition-all duration-300"
          >
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="/terms-of-service"
            className="hover:text-primary-brand transition-all duration-300"
          >
            Terms of Service
          </a>
        </footer>
      </div>
    </section>
  );
};

export default ForgotPassword;
