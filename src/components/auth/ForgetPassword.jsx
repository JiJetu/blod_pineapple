import { useForm } from "react-hook-form";
import { IMAGES } from "../../assets";
import AuthLayout from "../../components/shared/auth/AuthLayout";



const ForgetPassword = ({ onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Sending OTP to:", data.email);
    // TODO: Call API to send OTP
    onNext(data.email); // Trigger next step
  };

  return (
    <AuthLayout>
      <div className="w-full md:w-1/2 py-8 px-14 flex flex-col roboto">
        <img src={IMAGES.logo} alt="Logo" className="w-20 h-20 rounded-full mb-4" />
        <h2 className="text-3xl font-semibold text-primary mb-2">Forget Password</h2>
        <p className="text-primary mb-6">Please enter your email</p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Send OTP
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgetPassword;