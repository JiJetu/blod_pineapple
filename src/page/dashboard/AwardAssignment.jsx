import { Form, Select, InputNumber, Input, Button } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHeader } from "../../contexts/HeaderContext";

const { Option } = Select;

// Dummy students – replace with your actual students list or fetch from context/store
const students = [
  { id: "ID-0001", name: "Jonny Little" },
  { id: "ID-0002", name: "Sarah Johnson" },
  { id: "ID-0003", name: "Michael Chen" },
  // ... more
];

const awardTypes = [
  "Greenie",
  "Pinkie",
  "Certificate",
  "Bronze Badge",
  "Silver Badge",
  "Gold Badge",
  "Gold Metal Merit Badge",
  "Bronze Medallion",
  "Silver Medallion",
  "Gold Medallion",
  "Andrew Stuart Merit Award",
];

const AwardAssignment = () => {
  const { setTitle, setDescription } = useHeader();

  useEffect(() => {
    setTitle("Award Assignment");
    setDescription("");
  }, [setTitle, setDescription]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      studentId: "",
      awardType: "",
      quantity: 1,
      reason: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Award Assigned:", data);
    // TODO: Send to backend, update student awards/certificates
    reset();
    alert(
      `Award assigned successfully to ${
        students.find((s) => s.id === data.studentId)?.name || "Student"
      }!`
    );
  };

  return (
    <div className="p-6">
      {/* Award Rule Section */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8 border-2 border-[#777777">
        <h2 className="text-2xl font-bold text-center text-[#5F0629] mb-6">
          Award Rule
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12.0004 0L14.5039 1.296L17.2909 1.719L18.5539 4.239L20.5594 6.219L20.1004 9L20.5594 11.781L18.5539 13.761L17.2909 16.281L14.5039 16.704L12.0004 18L9.49691 16.704L6.70991 16.281L5.44691 13.761L3.44141 11.781L3.90041 9L3.44141 6.219L5.44691 4.239L6.70991 1.719L9.49691 1.296L12.0004 0Z"
                    fill="#5F0629"
                  />
                  <path
                    d="M6 17.6909V23.9999L12 22.4999L18 23.9999V17.6909L14.973 18.1499L12 19.6889L9.027 18.1499L6 17.6909Z"
                    fill="#5F0629"
                  />
                </svg>
              </span>
              <span className="text-lg">6 Greenies = 1 Pinky</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 14.475L13.925 15.625C14.1083 15.7417 14.2877 15.7377 14.463 15.613C14.6383 15.4883 14.7007 15.3173 14.65 15.1L14.15 12.925L15.85 11.45C16.0167 11.3 16.0667 11.121 16 10.913C15.9333 10.705 15.7833 10.5923 15.55 10.575L13.325 10.4L12.45 8.325C12.3667 8.125 12.2167 8.025 12 8.025C11.7833 8.025 11.6333 8.125 11.55 8.325L10.675 10.4L8.45 10.575C8.21667 10.5917 8.06667 10.7043 8 10.913C7.93333 11.1217 7.98333 11.3007 8.15 11.45L9.85 12.925L9.35 15.1C9.3 15.3167 9.36267 15.4877 9.538 15.613C9.71333 15.7383 9.89233 15.7423 10.075 15.625L12 14.475ZM8.65 20H6C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15.35L2.075 13.4C1.89167 13.2 1.75 12.9793 1.65 12.738C1.55 12.4967 1.5 12.2507 1.5 12C1.5 11.7493 1.55 11.5037 1.65 11.263C1.75 11.0223 1.89167 10.8013 2.075 10.6L4 8.65V6C4 5.45 4.196 4.97933 4.588 4.588C4.98 4.19667 5.45067 4.00067 6 4H8.65L10.6 2.075C10.8 1.89167 11.021 1.75 11.263 1.65C11.505 1.55 11.7507 1.5 12 1.5C12.2493 1.5 12.4953 1.55 12.738 1.65C12.9807 1.75 13.2013 1.89167 13.4 2.075L15.35 4H18C18.55 4 19.021 4.196 19.413 4.588C19.805 4.98 20.0007 5.45067 20 6V8.65L21.925 10.6C22.1083 10.8 22.25 11.021 22.35 11.263C22.45 11.505 22.5 11.7507 22.5 12C22.5 12.2493 22.45 12.4953 22.35 12.738C22.25 12.9807 22.1083 13.2013 21.925 13.4L20 15.35V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H15.35L13.4 21.925C13.2 22.1083 12.9793 22.25 12.738 22.35C12.4967 22.45 12.2507 22.5 12 22.5C11.7493 22.5 11.5037 22.45 11.263 22.35C11.0223 22.25 10.8013 22.1083 10.6 21.925L8.65 20Z"
                    fill="#1B5B04"
                  />
                </svg>
              </span>
              <span className="text-lg">6 Pinkies = 1 Certificate</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6 3.5C6 3.36739 6.05268 3.24021 6.14645 3.14645C6.24021 3.05268 6.36739 3 6.5 3H17.5C17.6326 3 17.7598 3.05268 17.8536 3.14645C17.9473 3.24021 18 3.36739 18 3.5V4H20.5C20.6326 4 20.7598 4.05268 20.8536 4.14645C20.9473 4.24021 21 4.36739 21 4.5V7.5C21 8.16304 20.7366 8.79893 20.2678 9.26777C19.7989 9.73661 19.163 10 18.5 10H17.6585C17.301 11.0085 16.6807 11.9032 15.8618 12.5918C15.0428 13.2804 14.0549 13.7379 13 13.917V17H16C16.1326 17 16.2598 17.0527 16.3536 17.1464C16.4473 17.2402 16.5 17.3674 16.5 17.5V20.5C16.5 20.6326 16.4473 20.7598 16.3536 20.8536C16.2598 20.9473 16.1326 21 16 21H8C7.86739 21 7.74021 20.9473 7.64645 20.8536C7.55268 20.7598 7.5 20.6326 7.5 20.5V17.5C7.5 17.3674 7.55268 17.2402 7.64645 17.1464C7.74021 17.0527 7.86739 17 8 17H11V13.917C9.94513 13.7379 8.95719 13.2804 8.13824 12.5918C7.31929 11.9032 6.69902 11.0085 6.3415 10H5.5C4.83696 10 4.20107 9.73661 3.73223 9.26777C3.26339 8.79893 3 8.16304 3 7.5V4.5C3 4.36739 3.05268 4.24021 3.14645 4.14645C3.24021 4.05268 3.36739 4 3.5 4H6V3.5ZM18 8V5H20V7.5C20 7.89782 19.842 8.27936 19.5607 8.56066C19.2794 8.84196 18.8978 9 18.5 9H18V8ZM6 5H4V7.5C4 7.89782 4.15804 8.27936 4.43934 8.56066C4.72064 8.84196 5.10218 9 5.5 9H6V5Z"
                    fill="#FF0C0C"
                  />
                </svg>
              </span>
              <span className="text-lg">3 Certificates = 1 Bronze Badge</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12.0004 0L14.5039 1.296L17.2909 1.719L18.5539 4.239L20.5594 6.219L20.1004 9L20.5594 11.781L18.5539 13.761L17.2909 16.281L14.5039 16.704L12.0004 18L9.49691 16.704L6.70991 16.281L5.44691 13.761L3.44141 11.781L3.90041 9L3.44141 6.219L5.44691 4.239L6.70991 1.719L9.49691 1.296L12.0004 0Z"
                    fill="#5F0629"
                  />
                  <path
                    d="M6 17.6909V23.9999L12 22.4999L18 23.9999V17.6909L14.973 18.1499L12 19.6889L9.027 18.1499L6 17.6909Z"
                    fill="#5F0629"
                  />
                </svg>
              </span>
              <span className="text-lg">12 Certificates = 1 Silver Badge</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 14.475L13.925 15.625C14.1083 15.7417 14.2877 15.7377 14.463 15.613C14.6383 15.4883 14.7007 15.3173 14.65 15.1L14.15 12.925L15.85 11.45C16.0167 11.3 16.0667 11.121 16 10.913C15.9333 10.705 15.7833 10.5923 15.55 10.575L13.325 10.4L12.45 8.325C12.3667 8.125 12.2167 8.025 12 8.025C11.7833 8.025 11.6333 8.125 11.55 8.325L10.675 10.4L8.45 10.575C8.21667 10.5917 8.06667 10.7043 8 10.913C7.93333 11.1217 7.98333 11.3007 8.15 11.45L9.85 12.925L9.35 15.1C9.3 15.3167 9.36267 15.4877 9.538 15.613C9.71333 15.7383 9.89233 15.7423 10.075 15.625L12 14.475ZM8.65 20H6C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15.35L2.075 13.4C1.89167 13.2 1.75 12.9793 1.65 12.738C1.55 12.4967 1.5 12.2507 1.5 12C1.5 11.7493 1.55 11.5037 1.65 11.263C1.75 11.0223 1.89167 10.8013 2.075 10.6L4 8.65V6C4 5.45 4.196 4.97933 4.588 4.588C4.98 4.19667 5.45067 4.00067 6 4H8.65L10.6 2.075C10.8 1.89167 11.021 1.75 11.263 1.65C11.505 1.55 11.7507 1.5 12 1.5C12.2493 1.5 12.4953 1.55 12.738 1.65C12.9807 1.75 13.2013 1.89167 13.4 2.075L15.35 4H18C18.55 4 19.021 4.196 19.413 4.588C19.805 4.98 20.0007 5.45067 20 6V8.65L21.925 10.6C22.1083 10.8 22.25 11.021 22.35 11.263C22.45 11.505 22.5 11.7507 22.5 12C22.5 12.2493 22.45 12.4953 22.35 12.738C22.25 12.9807 22.1083 13.2013 21.925 13.4L20 15.35V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H15.35L13.4 21.925C13.2 22.1083 12.9793 22.25 12.738 22.35C12.4967 22.45 12.2507 22.5 12 22.5C11.7493 22.5 11.5037 22.45 11.263 22.35C11.0223 22.25 10.8013 22.1083 10.6 21.925L8.65 20Z"
                    fill="#1B5B04"
                  />
                </svg>
              </span>
              <span className="text-lg">18 Certificates = 1 Gold Badge</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏅</span>
              <span className="text-lg">
                24 Certificates = 1 Gold Metal Merit Badge
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥉</span>
              <span className="text-lg">
                30 Certificates = 1 Bronze Medallion
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥈</span>
              <span className="text-lg">
                36 Certificates = 1 Silver Medallion
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥇</span>
              <span className="text-lg">
                42 Certificates = 1 Gold Medallion
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <span className="text-lg">
                48 Certificates = 1 Andrew Stuart Merit Award
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Award Form */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-primary mb-8">Assign Award</h2>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {/* Select Student */}
          <Form.Item className="text-base font-medium" label="Select Student" required>
            <Controller
              name="studentId"
              control={control}
              rules={{ required: "Please select a student" }}
              render={({ field }) => (
                <Select
                  {...field}
                  showSearch
                  placeholder="Choose a student"
                  optionFilterProp="children"
                  className="h-11"
                >
                  {students.map((student) => (
                    <Option key={student.id} value={student.id}>
                      {student.name} ({student.id})
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.studentId && (
              <span className="text-red-500 text-sm">
                {errors.studentId.message}
              </span>
            )}
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Award Type */}
            <Form.Item className="text-base font-medium" label="Award type" required>
              <Controller
                name="awardType"
                control={control}
                rules={{ required: "Please select an award type" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Greenie"
                    className="h-11"
                    prefix={
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="19"
                          viewBox="0 0 14 19"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.16228 17.715L7.15311 17.7167L7.09394 17.7459L7.07728 17.7492L7.06561 17.7459L7.00645 17.7167C6.99756 17.7139 6.99089 17.7153 6.98645 17.7209L6.98311 17.7292L6.96895 18.0859L6.97311 18.1025L6.98145 18.1134L7.06811 18.175L7.08061 18.1784L7.09061 18.175L7.17728 18.1134L7.18728 18.1L7.19061 18.0859L7.17644 17.73C7.17422 17.7211 7.1695 17.7161 7.16228 17.715ZM7.38311 17.6209L7.37228 17.6225L7.21811 17.7L7.20978 17.7084L7.20728 17.7175L7.22228 18.0759L7.22645 18.0859L7.23311 18.0917L7.40061 18.1692C7.41117 18.172 7.41922 18.1698 7.42478 18.1625L7.42811 18.1509L7.39978 17.6392C7.397 17.6292 7.39144 17.6231 7.38311 17.6209ZM6.78728 17.6225C6.78361 17.6203 6.77922 17.6196 6.77503 17.6205C6.77083 17.6214 6.76716 17.624 6.76478 17.6275L6.75978 17.6392L6.73145 18.1509C6.732 18.1609 6.73672 18.1675 6.74561 18.1709L6.75811 18.1692L6.92561 18.0917L6.93395 18.085L6.93728 18.0759L6.95145 17.7175L6.94895 17.7075L6.94061 17.6992L6.78728 17.6225Z"
                            fill="#777777"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.66771 8.16704e-08C8.04892 -3.49959e-07 9.39604 0.429005 10.5229 1.22773C11.6497 2.02645 12.5007 3.15546 12.9581 4.45873C13.4156 5.76199 13.4569 7.17516 13.0765 8.50295C12.6961 9.83073 11.9126 11.0076 10.8344 11.8708V15.7125C10.8344 15.8606 10.7985 16.0065 10.7298 16.1377C10.6611 16.2689 10.5616 16.3815 10.4399 16.4658C10.3182 16.5502 10.1778 16.6038 10.0309 16.6221C9.88393 16.6404 9.73472 16.6228 9.59604 16.5708L6.66771 15.4742L3.73938 16.5725C3.60063 16.6245 3.45135 16.6421 3.30433 16.6238C3.1573 16.6054 3.01691 16.5517 2.89517 16.4673C2.77344 16.3828 2.67399 16.2701 2.60535 16.1388C2.53671 16.0075 2.50092 15.8615 2.50104 15.7133V11.8717C1.4225 11.0085 0.638735 9.8316 0.258087 8.50366C-0.122561 7.17572 -0.0812905 5.76233 0.376194 4.45886C0.833679 3.1554 1.68478 2.02624 2.81185 1.22747C3.93892 0.428705 5.28629 -0.000216089 6.66771 8.16704e-08ZM9.16771 12.8492C8.37323 13.1697 7.52441 13.3341 6.66771 13.3333C5.81101 13.3341 4.96219 13.1697 4.16771 12.8492V14.6308L6.08271 13.9125C6.4599 13.7711 6.87552 13.7711 7.25271 13.9125L9.16771 14.6308V12.8492ZM6.66771 1.66667C5.34163 1.66667 4.06986 2.19345 3.13218 3.13113C2.19449 4.06881 1.66771 5.34058 1.66771 6.66667C1.66771 7.99275 2.19449 9.26452 3.13218 10.2022C4.06986 11.1399 5.34163 11.6667 6.66771 11.6667C7.99379 11.6667 9.26556 11.1399 10.2032 10.2022C11.1409 9.26452 11.6677 7.99275 11.6677 6.66667C11.6677 5.34058 11.1409 4.06881 10.2032 3.13113C9.26556 2.19345 7.99379 1.66667 6.66771 1.66667ZM6.66771 3.33333C7.55176 3.33333 8.39961 3.68452 9.02473 4.30964C9.64985 4.93476 10.001 5.78261 10.001 6.66667C10.001 7.55072 9.64985 8.39857 9.02473 9.02369C8.39961 9.64881 7.55176 10 6.66771 10C5.78366 10 4.93581 9.64881 4.31069 9.02369C3.68557 8.39857 3.33438 7.55072 3.33438 6.66667C3.33438 5.78261 3.68557 4.93476 4.31069 4.30964C4.93581 3.68452 5.78366 3.33333 6.66771 3.33333ZM6.66771 5C6.22568 5 5.80176 5.17559 5.4892 5.48816C5.17664 5.80072 5.00104 6.22464 5.00104 6.66667C5.00104 7.10869 5.17664 7.53262 5.4892 7.84518C5.80176 8.15774 6.22568 8.33333 6.66771 8.33333C7.10974 8.33333 7.53366 8.15774 7.84622 7.84518C8.15878 7.53262 8.33438 7.10869 8.33438 6.66667C8.33438 6.22464 8.15878 5.80072 7.84622 5.48816C7.53366 5.17559 7.10974 5 6.66771 5Z"
                            fill="#777777"
                          />
                        </svg>
                      </span>
                    }
                  >
                    {awardTypes.map((type) => (
                      <Option key={type} value={type}>
                        {type}
                      </Option>
                    ))}
                  </Select>
                )}
              />
              {errors.awardType && (
                <span className="text-red-500 text-sm">
                  {errors.awardType.message}
                </span>
              )}
            </Form.Item>

            {/* Quantity */}
            <Form.Item className="text-base font-medium" label="Quantity" required>
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
                    defaultValue={1}
                    className="w-full h-11"
                    prefix={
                      <span className="text-gray-500">
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
          </div>

          {/* Reason */}
          <Form.Item className="text-base font-medium" label="Reason of the award">
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
              onClick={() => reset()}
              className="px-8 py-2 h-11 border border-gray-400 text-gray-700 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="px-8 py-2 h-11 rounded-lg"
              style={{ background: "#5F0629" }}
            >
              Assign Award
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AwardAssignment;
