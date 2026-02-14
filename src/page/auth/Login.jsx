import { useForm } from "react-hook-form";
import { IMAGES } from "../../assets";
import AuthLayout from "../../components/shared/auth/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/features/auth/auth.api";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await login(data).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthLayout>
      {/* Left side: Login Form */}
      <div className="w-full md:w-1/2 py-8 px-14 flex flex-col">
        {/* Logo */}
        <img
          src={IMAGES.logo}
          alt="Techboro Primary School Logo"
          className="w-20 h-20 rounded-full mb-4"
        />
        <h2 className="text-3xl font-semibold text-primary mb-2">Login</h2>
        <p className="text-primary mb-6">Please enter your details</p>

        {/* Form using React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {isError && (
            <p className="text-red-500 text-sm mb-4">
              {error?.data?.detail || "Invalid email or password"}
            </p>
          )}

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link
              to="/forget-password"
              className="text-primary hover:underline"
            >
              Forgot Password
            </Link>
          </div>
          <button
            type="submit"
            
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
             {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
