import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button";
import { useResetPassword } from "../hooks/auth/useResetPassword";
import { useParams } from "react-router";

interface IFormInput {
  password: string;
  confirmPassword: string;
}
const schema: yup.ObjectSchema<IFormInput> = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { resetPassword, isPending } = useResetPassword();
  const { token } = useParams();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    resetPassword({
      password: data.password,
      token: token as string,
    });
  };

  return (
    <section className="flex items-center justify-center py-12 px-5">
      <div className="w-full max-w-xl p-6 lg:p-8 bg-primary-white shadow-lg rounded-xl">
        <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-3 text-primary-text font-playwrite">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-text mb-2">
              New Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
            />
            {errors.password && (
              <p className="text-error-color text-xs">
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
              className="w-full mb-0.5 border-secondary-grey rounded-md shadow-sm focus:border-primary-brand border outline-none py-1.5 lg:py-2 px-3"
            />
            {errors.confirmPassword && (
              <p className="text-error-color text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button className="w-full" disabled={isPending} loading={isPending}>
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

export default ResetPassword;
