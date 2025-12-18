import { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useHeader } from "../../contexts/HeaderContext";

const labelStyle = {
  color: "#000",
  fontFamily: "Roboto Serif",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "120%",
};

const ChangePassword = () => {
  const { setTitle, setDescription } = useHeader();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    setTitle("Change Password");
    setDescription("Update your account password securely");
  }, [setTitle, setDescription]);

  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    console.log("Password change submitted:", data);
    message.success("Password updated successfully!");
    reset();
  };

  return (
    <div className="bg-[#fbf9f7] min-h-screen p-6 roboto">
      <div className="bg-white rounded-2xl shadow-lg p-10">
        <h2 className="text-xl font-medium text-primary mb-8">
          Change Password
        </h2>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {/* Current Password */}
          <Form.Item
            label={<span style={labelStyle}>Current Password</span>}
            validateStatus={errors.currentPassword ? "error" : ""}
            help={errors.currentPassword?.message}
          >
            <Controller
              name="currentPassword"
              control={control}
              rules={{
                required: "Current password is required",
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Enter current password"
                  size="large"
                  className="h-12 rounded-lg"
                />
              )}
            />
          </Form.Item>

          {/* New Password */}
          <Form.Item
            label={<span style={labelStyle}>New Password</span>}
            validateStatus={errors.newPassword ? "error" : ""}
            help={errors.newPassword?.message}
          >
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Enter new password"
                  size="large"
                  className="h-12 rounded-lg"
                />
              )}
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label={<span style={labelStyle}>Confirm New Password</span>}
            validateStatus={errors.confirmPassword ? "error" : ""}
            help={errors.confirmPassword?.message}
          >
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your new password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Confirm your password"
                  size="large"
                  className="h-12 rounded-lg"
                />
              )}
            />
          </Form.Item>

          {/* Submit Button */}
          <div className="text-right mt-10">
            <Button
              htmlType="submit"
              size="large"
              className="px-16 text-lg font-semibold rounded-md shadow-lg"
              style={{
                background: "#5F0629",
                color: "white",
                border: "none",
              }}
            >
              Update password
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
