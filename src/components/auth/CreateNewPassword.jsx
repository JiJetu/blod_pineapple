import { useForm } from "react-hook-form";
import AuthLayout from "../shared/auth/AuthLayout";
import { IMAGES } from "../../assets";
import { useResetPasswordMutation } from "../../redux/features/auth/auth.api";
import { toast } from "sonner";

const CreateNewPassword = ({ onSuccess, email, resetToken }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Resetting password...");
    try {
      await resetPassword({
        email,
        reset_token: resetToken,
        password: data.password,
        retype_password: data.confirmPassword,
      }).unwrap();
      toast.success("Password reset successfully!", { id: toastId });
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.detail || "Failed to reset password", { id: toastId });
    }
  };

  return (
    <AuthLayout>
      <div className="w-full md:w-1/2 py-8 px-14 flex flex-col roboto">
        <img
          src={IMAGES.logo}
          alt="Logo"
          className="w-20 h-20 rounded-full mb-4"
        />
        <h2 className="text-3xl font-semibold text-primary mb-2">
          Create New Password
        </h2>
        <p className="text-primary mb-6">Please enter your new password</p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block mb-2">New Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default CreateNewPassword;
