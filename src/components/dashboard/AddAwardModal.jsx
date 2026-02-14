import { Form, Input, InputNumber, Select, Button, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import ReusableModal from "../shared/modal/Modal";
import { useAddStudentAwardMutation } from "../../redux/features/student/student.api";
import { useGetAwardsQuery } from "../../redux/features/award/awards.api";

const { Option } = Select;

const AddAwardModal = ({
  open,
  onCancel,
  onSubmit,
  studentName = "Student",
  studentId,
}) => {
  const [addStudentAward, { isLoading }] = useAddStudentAwardMutation();
  const { data: awards = [], isLoading: isAwardsLoading } = useGetAwardsQuery(undefined, { refetchOnFocus: false, refetchOnReconnect: false });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      award: "",
      quantity: 1,
      reason: "",
    },
  });

  const onSubmitForm = async (data) => {
    if (!studentId) {
      message.error("Student ID is required");
      return;
    }

    try {
      const awardData = {
        award_type: data.award,
        quantity: data.quantity,
        reason: data.reason || "",
      };

      await addStudentAward({ studentId, awardData }).unwrap();
      
      message.success(`Award added to ${studentName} successfully!`);
      reset();
      onSubmit(data); // Call parent onSubmit if needed
    } catch (error) {
      console.error("Add award error:", error);
      if (error.data) {
        if (error.data.non_field_errors) {
          message.error(error.data.non_field_errors.join(", "));
        } else {
          message.error("Failed to add award. Please check your inputs.");
        }
      } else {
        message.error("Network error. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <ReusableModal
      title="Add Award"
      open={open}
      onCancel={handleCancel}
      width={520}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmitForm)}>
        {/* Award Type */}
        <Form.Item label="Award type" required>
          <Controller
            name="award"
            control={control}
            rules={{ required: "Please select an award type" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select award type"
                className="h-11"
                loading={isAwardsLoading}
                virtual
                prefix={
                  <span className="text-gray-500 mr-2 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org2000/svg"
                      width="14"
                      height="17"
                      viewBox="0 0 14 17"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.66771 8.16704e-08C8.04892 -3.49959e-07 9.39604 0.429005 10.5229 1.22773C11.6497 2.02645 12.5007 3.15546 12.9581 4.45873C13.4156 5.76199 13.4569 7.17516 13.0765 8.50295C12.6961 9.83073 11.9126 11.0076 10.8344 11.8708V15.7125C10.8344 15.8606 10.7985 16.0065 10.7298 16.1377C10.6611 16.2689 10.5616 16.3815 10.4399 16.4658C10.3182 16.5502 10.1778 16.6038 10.0309 16.6221C9.88393 16.6404 9.73472 16.6228 9.59604 16.5708L6.66771 15.4742L3.73938 16.5725C3.60063 16.6245 3.45135 16.6421 3.30433 16.6238C3.1573 16.6054 3.01691 16.5517 2.89517 16.4673C2.77344 16.3828 2.67399 16.2701 2.60535 16.1388C2.53671 16.0075 2.50092 15.8615 2.50104 15.7133V11.8717C1.4225 11.0085 0.638735 9.8316 0.258087 8.50366C-0.122561 7.17572 -0.0812905 5.76233 0.376194 4.45886C0.833679 3.1554 1.68478 2.02624 2.81185 1.22747C3.93892 0.428705 5.28629 -0.000216089 6.66771 8.16704e-08ZM9.16771 12.8492C8.37323 13.1697 7.52441 13.3341 6.66771 13.3333C5.81101 13.3341 4.96219 13.1697 4.16771 12.8492V14.6308L6.08271 13.9125C6.4599 13.7711 6.87552 13.7711 7.25271 13.9125L9.16771 14.6308V12.8492ZM6.66771 1.66667C5.34163 1.66667 4.06986 2.19345 3.13218 3.13113C2.19449 4.06881 1.66771 5.34058 1.66771 6.66667C1.66771 7.99275 2.19449 9.26452 3.13218 10.2022C4.06986 11.1399 5.34163 11.6667 6.66771 11.6667C7.99379 11.6667 9.26556 11.1399 10.2032 10.2022C11.1409 9.26452 11.6677 7.99275 11.6677 6.66667C11.6677 5.34058 11.1409 4.06881 10.2032 3.13113C9.26556 2.19345 7.99379 1.66667 6.66771 1.66667ZM6.66771 3.33333C7.55176 3.33333 8.39961 3.68452 9.02473 4.30964C9.64985 4.93476 10.001 5.78261 10.001 6.66667C10.001 7.55072 9.64985 8.39857 9.02473 9.02369C8.39961 9.64881 7.55176 10 6.66771 10C5.78366 10 4.93581 9.64881 4.31069 9.02369C3.68557 8.39857 3.33438 7.55072 3.33438 6.66667C3.33438 5.78261 3.68557 4.93476 4.31069 4.30964C4.93581 3.68452 5.78366 3.33333 6.66771 3.33333ZM6.66771 5C6.22568 5 5.80176 5.17559 5.4892 5.48816C5.17664 5.80072 5.00104 6.22464 5.00104 6.66667C5.00104 7.10869 5.17664 7.53262 5.4892 7.84518C5.80176 8.15774 6.22568 8.33333 6.66771 8.33333C7.10974 8.33333 7.53366 8.15774 7.84622 7.84518C8.15878 7.53262 8.33438 7.10869 8.33438 6.66667C8.33438 6.22464 8.15878 5.80072 7.84622 5.48816C7.53366 5.17559 7.10974 5 6.66771 5Z"
                        fill="#777777"
                      />
                    </svg>
                  </span>
                }
              >
                {awards.map((award) => (
                  <Option key={award.id} value={award.id}>
                    {award.name}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.award && (
            <span className="text-red-500 text-sm">
              {errors.award.message}
            </span>
          )}
        </Form.Item>

        {/* Quantity */}
        <Form.Item label="Quantity" required>
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "Quantity is required",
              min: { value: 1, message: "Minimum 1" },
            }}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1}
                placeholder="1"
                className="w-full h-11"
                prefix={
                  <span className="text-gray-500 mr-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M11.5 4.6875L15.9922 6.9375V13.0469L11.5 15.2969L7 13.0625V10.5547L4.5 11.7969L0 9.5625L0.0078125 3.4375L4.5 1.1875L8.99219 3.4375L9 5.94531L11.5 4.6875ZM14.375 7.24219L11.5 5.8125L8.625 7.24219L11.5 8.67969L14.375 7.24219ZM7.375 3.74219L4.5 2.3125L1.625 3.74219L4.5 5.17969L7.375 3.74219ZM1.00781 4.55469L1 8.9375L4 10.4297V6.04688L1.00781 4.55469ZM5 10.4297L7.00781 9.4375V6.9375L8 6.44531L7.99219 4.55469L5 6.04688V10.4297ZM8.00781 8.05469L8 12.4375L11 13.9297V9.54688L8.00781 8.05469ZM12 13.9297L14.9922 12.4297V8.05469L12 9.54688V13.9297Z"
                        fill="#777777"
                      />
                    </svg>
                  </span>
                }
              />
            )}
          />
          {errors.quantity && (
            <span className="text-red-500 text-sm">
              {errors.quantity.message}
            </span>
          )}
        </Form.Item>

        {/* Reason */}
        <Form.Item label="Reason of the award">
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                rows={4}
                placeholder="Enter reason here"
                className="rounded-lg"
              />
            )}
          />
        </Form.Item>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button
            onClick={handleCancel}
            className="px-6 py-1 border border-gray-400 text-gray-700 rounded-lg"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="px-6 py-1 rounded-lg"
            style={{ background: "#5F0629" }}
            loading={isLoading}
          >
            Add
          </Button>
        </div>
      </Form>
    </ReusableModal>
  );
};

export default AddAwardModal;
