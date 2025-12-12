import { useState } from "react";
import ForgetPassword from "../../components/auth/ForgetPassword";
import OtpVerification from "../../components/auth/OtpVerification";
import CreateNewPassword from "../../components/auth/CreateNewPassword";
import { useNavigate } from "react-router-dom";



const ForgotPasswordFlow = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState(""); // To pass email between steps if needed
  const navigate = useNavigate();

  const handleEmailSubmitted = (submittedEmail) => {
    setEmail(submittedEmail);
    setStep("otp");
  };

  const handleOtpVerified = () => {
    setStep("newPassword");
  };

  const handlePasswordReset = () => {
    // Final success action (e.g., redirect to login)
    // alert("Password reset successfully!");
    navigate("/login")
  };

  return (
    <>
      {step === "email" && <ForgetPassword onNext={handleEmailSubmitted} />}
      {step === "otp" && <OtpVerification email={email} onNext={handleOtpVerified} />}
      {step === "newPassword" && <CreateNewPassword email={email} onSuccess={handlePasswordReset} />}
    </>
  );
};

export default ForgotPasswordFlow;