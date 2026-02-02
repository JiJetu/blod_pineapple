import { useState } from "react";
import ForgetPassword from "../../components/auth/ForgetPassword";
import OtpVerification from "../../components/auth/OtpVerification";
import CreateNewPassword from "../../components/auth/CreateNewPassword";
import { useNavigate } from "react-router-dom";



const ForgotPasswordFlow = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmitted = (submittedEmail) => {
    setEmail(submittedEmail);
    setStep("otp");
  };

  const handleOtpVerified = (token) => {
    setResetToken(token);
    setStep("newPassword");
  };

  const handlePasswordReset = () => {
    navigate("/login")
  };

  return (
    <>
      {step === "email" && <ForgetPassword onNext={handleEmailSubmitted} />}
      {step === "otp" && <OtpVerification email={email} onNext={handleOtpVerified} />}
      {step === "newPassword" && <CreateNewPassword email={email} resetToken={resetToken} onSuccess={handlePasswordReset} />}
    </>
  );
};

export default ForgotPasswordFlow;