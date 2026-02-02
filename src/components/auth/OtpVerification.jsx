import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AuthLayout from "../shared/auth/AuthLayout";
import { IMAGES } from "../../assets";
import { useVerifyOtpMutation } from "../../redux/features/auth/auth.api";
import { toast } from "sonner";



const OtpVerification = ({ email, onNext }) => {
  const { handleSubmit } = useForm();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async() => {
    const otpCode = otp.join("");
    console.log("Verifying OTP:", otpCode, "for", email);
    const toastId = toast.loading("Verifying OTP...");
    try {
      const response = await verifyOtp({ email, otp: otpCode }).unwrap();
      toast.success("OTP verified successfully!", { id: toastId });
      onNext(response.reset_token);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.detail || "OTP verification failed", { id: toastId });
    }
  };

  const isComplete = otp.every(d => d !== "");

  return (
    <AuthLayout>
      <div className="w-full md:w-1/2 py-8 px-14 flex flex-col roboto">
        <img src={IMAGES.logo} alt="Logo" className="w-20 h-20 rounded-full mb-4" />
        <h2 className="text-3xl font-semibold text-primary mb-2">Enter OTP</h2>
        <p className="text-primary mb-6">
          We sent a 6-digit code to <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <div className="mb-6 flex justify-center gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={(el) => (inputRefs.current[i] = el)}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={!isComplete || isLoading}
            className={`w-full py-3 rounded-md text-white font-medium transition ${
              isComplete
                ? "bg-primary hover:bg-primary-dark"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* <p className="mt-4 text-sm text-center">
          Didn’t receive code? <button className="text-primary font-medium">Resend</button>
        </p> */}
      </div>
    </AuthLayout>
  );
};

export default OtpVerification;