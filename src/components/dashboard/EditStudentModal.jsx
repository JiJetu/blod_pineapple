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
  } = useForm();

  React.useEffect(() => {
    if (student) {
      reset({
        firstName: student.firstName || "",
        surname: student.surname || "",
        studentId: student.id || "", // Now editable
        year: student.year || "",
        faction: student.faction || "",
        room: student.room || "",
      });
    }
  }, [student, reset]);

  const onSubmitForm = (data) => {
    onSubmit({ ...data, id: data.studentId }); // Pass updated ID
    onCancel();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <ReusableModal title="Edit Student Details" open={open} onCancel={handleCancel} width={680}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmitForm)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <Form.Item label="First Name" required>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <Input {...field} placeholder="First Name" className="h-11 rounded-lg" />
              )}
            />
            {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
          </Form.Item>

          {/* Surname */}
          <Form.Item label="Surname" required>
            <Controller
              name="surname"
              control={control}
              rules={{ required: "Surname is required" }}
              render={({ field }) => (
                <Input {...field} placeholder="Surname" className="h-11 rounded-lg" />
              )}
            />
            {errors.surname && <span className="text-red-500 text-sm">{errors.surname.message}</span>}
          </Form.Item>

          {/* Student ID - Now fully editable */}
          <Form.Item label="Student ID" required>
            <Controller
              name="studentId"
              control={control}
              rules={{ required: "Student ID is required" }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter student ID" className="h-11 rounded-lg" />
              )}
            />
            {errors.studentId && <span className="text-red-500 text-sm">{errors.studentId.message}</span>}
          </Form.Item>

          {/* Year */}
          <Form.Item label="Year" required>
            <Controller
              name="year"
              control={control}
              rules={{ required: "Year is required" }}
              render={({ field }) => (
                <Select {...field} placeholder="Select year" className="h-11">
                  {yearOptions.map((y) => (
                    <Option key={y} value={y}>{y}</Option>
                  ))}
                </Select>
              )}
            />
            {errors.year && <span className="text-red-500 text-sm">{errors.year.message}</span>}
          </Form.Item>

          {/* Faction */}
          <Form.Item label="Faction" required>
            <Controller
              name="faction"
              control={control}
              rules={{ required: "Faction is required" }}
              render={({ field }) => (
                <Select {...field} placeholder="Select faction" className="h-11">
                  {factionOptions.map((f) => (
                    <Option key={f} value={f}>{f}</Option>
                  ))}
                </Select>
              )}
            />
            {errors.faction && <span className="text-red-500 text-sm">{errors.faction.message}</span>}
          </Form.Item>

          {/* Room */}
          <Form.Item label="Room" required>
            <Controller
              name="room"
              control={control}
              rules={{ required: "Room is required" }}
              render={({ field }) => (
                <Select {...field} placeholder="Select room" className="h-11">
                  {roomOptions.map((r) => (
                    <Option key={r} value={r}>{r}</Option>
                  ))}
                </Select>
              )}
            />
            {errors.room && <span className="text-red-500 text-sm">{errors.room.message}</span>}
          </Form.Item>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button onClick={handleCancel} className="px-6 py-2 border border-gray-400 text-gray-700 rounded-lg">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="px-6 py-2 rounded-lg"
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