import React from "react";
import { Form, Input, Select, Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import ReusableModal from "../shared/modal/Modal";

const { Option } = Select;

const yearOptions = [
  "Kindergarten",
  "Primary",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
];
const factionOptions = ["Bilbies", "Bandicoots", "Wallabies", "Numbats"];
const roomOptions = ["EC 3", "EC 4", "Room 1", "Room 2"];

const EditStudentModal = ({ open, onCancel, onSubmit, student }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: student?.name || "",
      year: student?.year || "",
      room: student?.room || "",
      faction: student?.faction || "",
    },
  });

  React.useEffect(() => {
    if (student) {
      reset({
        name: student.name,
        year: student.year || "",
        room: student.room || "",
        faction: student.faction,
      });
    }
  }, [student, reset]);

  const onSubmitForm = (data) => {
    onSubmit({ ...data, id: student.id });
    onCancel();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <ReusableModal
      title="Edit Student Details"
      open={open}
      onCancel={handleCancel}
      width={680}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmitForm)}>
        {/* Name */}
        <Form.Item label="Name" required>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <Input
                {...field}
                prefix={
                  <span className="text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10.0612 14.9997C9.33311 14.9997 8.668 14.833 8.0659 14.4997C7.4638 14.1663 6.98073 13.708 6.61667 13.1247C6.53265 12.9858 6.52929 12.8469 6.60659 12.708C6.68388 12.5691 6.80626 12.4997 6.97372 12.4997H13.1487C13.3027 12.4997 13.4218 12.5691 13.5058 12.708C13.5898 12.8469 13.5898 12.9858 13.5058 13.1247C13.1417 13.708 12.6586 14.1663 12.0565 14.4997C11.4544 14.833 10.7893 14.9997 10.0612 14.9997ZM7.96088 11.2497C7.66684 11.2497 7.41816 11.1488 7.21484 10.9472C7.01153 10.7455 6.91015 10.4991 6.91071 10.208C6.91127 9.9169 7.01293 9.67023 7.21568 9.46801C7.41844 9.26579 7.66684 9.16523 7.96088 9.16634C8.25493 9.16745 8.50361 9.26829 8.70692 9.46884C8.91024 9.6694 9.01161 9.91579 9.01105 10.208C9.01049 10.5002 8.90884 10.7469 8.70609 10.948C8.50333 11.1491 8.25493 11.2497 7.96088 11.2497ZM12.1616 11.2497C11.8675 11.2497 11.6188 11.1488 11.4155 10.9472C11.2122 10.7455 11.1108 10.4991 11.1114 10.208C11.112 9.9169 11.2136 9.67023 11.4164 9.46801C11.6191 9.26579 11.8675 9.16523 12.1616 9.16634C12.4556 9.16745 12.7043 9.26829 12.9076 9.46884C13.1109 9.6694 13.2123 9.91579 13.2117 10.208C13.2112 10.5002 13.1095 10.7469 12.9068 10.948C12.704 11.1491 12.4556 11.2497 12.1616 11.2497ZM10.0612 18.333C7.97489 18.333 6.20024 17.6141 4.73728 16.1763C3.27433 14.7386 2.52856 12.9852 2.5 10.9163L4.20128 10.2913C4.18727 10.3886 4.18027 10.4788 4.18027 10.5622V10.833C4.18027 12.458 4.751 13.8366 5.89247 14.9688C7.03393 16.1011 8.42352 16.6669 10.0612 16.6663C11.6989 16.6658 13.0888 16.1 14.2308 14.9688C15.3728 13.8377 15.9433 12.4591 15.9422 10.833C15.9422 10.6108 15.9315 10.3919 15.9103 10.1763C15.889 9.96079 15.8506 9.74912 15.7952 9.54134C14.955 9.44412 14.1602 9.23245 13.4108 8.90634C12.6614 8.58023 11.9723 8.15301 11.3433 7.62467L15.817 5.95801C16.3911 6.62467 16.8358 7.37134 17.1511 8.19801C17.4665 9.02468 17.6236 9.90301 17.6224 10.833C17.6224 11.8747 17.4231 12.8505 17.0243 13.7605C16.6255 14.6705 16.0864 15.4622 15.407 16.1355C14.7276 16.8088 13.9295 17.3436 13.0126 17.7397C12.0958 18.1358 11.112 18.3336 10.0612 18.333ZM2.83605 9.47884C2.73804 9.20106 2.65767 8.91634 2.59494 8.62468C2.53221 8.33301 2.50056 8.0344 2.5 7.72884C2.5 6.46495 2.85706 5.33301 3.57117 4.33301C4.28529 3.33301 5.18844 2.55523 6.28061 1.99967C6.25261 1.94412 6.23524 1.89217 6.22852 1.84384C6.2218 1.79551 6.21816 1.73634 6.2176 1.66634C6.2176 1.43023 6.29825 1.23245 6.45956 1.07301C6.62087 0.913563 6.82026 0.833563 7.05774 0.833008C7.25377 0.833008 7.4218 0.888563 7.56182 0.999675C7.70184 1.11079 7.79986 1.24967 7.85587 1.41634C8.16392 1.3469 8.46861 1.29134 8.76994 1.24967C9.07126 1.20801 9.38267 1.18717 9.70417 1.18717C10.6423 1.18717 11.5351 1.36773 12.3825 1.72884C13.2299 2.08995 13.9754 2.61079 14.619 3.29134L16.4043 2.62467C16.6283 2.54134 16.842 2.54829 17.0453 2.64551C17.2486 2.74273 17.392 2.90245 17.4754 3.12467C17.5589 3.3469 17.5555 3.55884 17.4653 3.76051C17.3752 3.96217 17.2175 4.1044 16.9923 4.18717L2.83605 9.47884Z"
                        fill="#777777"
                      />
                    </svg>
                  </span>
                }
                placeholder="Jonny Little"
                className="h-11 rounded-lg"
              />
            )}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Year */}
          <Form.Item label="Year" required>
            <Controller
              name="year"
              control={control}
              rules={{ required: "Year is required" }}
              render={({ field }) => (
                <Select {...field} placeholder="Year" className="h-11">
                  {yearOptions.map((y) => (
                    <Option key={y} value={y}>
                      {y}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.year && (
              <span className="text-red-500 text-sm">
                {errors.year.message}
              </span>
            )}
          </Form.Item>

          {/* Room */}
          <Form.Item label="Room" required>
            <Controller
              name="room"
              control={control}
              rules={{ required: "Room is required" }}
              render={({ field }) => (
                <Select {...field} placeholder="Select Room" className="h-11">
                  {roomOptions.map((r) => (
                    <Option key={r} value={r}>
                      {r}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.room && (
              <span className="text-red-500 text-sm">
                {errors.room.message}
              </span>
            )}
          </Form.Item>
        </div>

        {/* Faction */}
        <Form.Item label="Faction" required>
          <Controller
            name="faction"
            control={control}
            rules={{ required: "Faction is required" }}
            render={({ field }) => (
              <Select {...field} placeholder="Select faction" className="h-11">
                {factionOptions.map((f) => (
                  <Option key={f} value={f}>
                    {f}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.faction && (
            <span className="text-red-500 text-sm">
              {errors.faction.message}
            </span>
          )}
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
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </ReusableModal>
  );
};

export default EditStudentModal;
