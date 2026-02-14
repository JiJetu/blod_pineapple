import React from "react";
import { Form, Input, Select, Button, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import ReusableModal from "../shared/modal/Modal";
import { useEditStudentMutation } from "../../redux/features/student/student.api";
import { useGetYearsQuery } from "../../redux/features/years/years.api";
import { useGetFactionsQuery } from "../../redux/features/factions/factions.api";
import { useGetRoomsQuery } from "../../redux/features/rooms/rooms.api";


const { Option } = Select;

const EditStudentModal = ({ open, onCancel, onSubmit, student }) => {
  const [editStudent, { isLoading }] = useEditStudentMutation();
  const { data: years = [], isLoading: isYearsLoading } = useGetYearsQuery(undefined, { refetchOnFocus: false, refetchOnReconnect: false });
  const { data: factions = [], isLoading: isFactionsLoading } = useGetFactionsQuery(undefined, { refetchOnFocus: false, refetchOnReconnect: false });
  const { data: rooms = [], isLoading: isRoomsLoading } = useGetRoomsQuery(undefined, { refetchOnFocus: false, refetchOnReconnect: false });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    if (student) {
      reset({
        first_name: student.first_name || "",
        surname: student.surname || "",
        student_id: student.student_id || "",
        year: student.year?.id || "",
        faction: student.faction?.id || "",
        room: student.room?.id || "",
      });
    }
  }, [student, reset]);

  const onSubmitForm = async (data) => {
    try {
      const formattedData = {
        first_name: data.first_name,
        surname: data.surname,
        student_id: data.student_id,
        year: data.year,
        faction: data.faction,
        room: data.room,
      };

      await editStudent({ studentId: student.id, studentData: formattedData }).unwrap();
      message.success("Student updated successfully!");
      onSubmit(formattedData); // Call parent onSubmit if needed
      onCancel();
    } catch (error) {
      console.error("Edit student error:", error);
      if (error.data) {
        if (error.data.non_field_errors) {
          message.error(error.data.non_field_errors.join(", "));
        } else if (error.data.student_id) {
          message.error(`Student ID: ${error.data.student_id.join(", ")}`);
        } else {
          message.error("Failed to update student. Please check your inputs.");
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
    <ReusableModal title="Edit Student Details" open={open} onCancel={handleCancel} width={680}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmitForm)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <Form.Item label="First Name" required>
            <Controller
              name="first_name"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <Input {...field} placeholder="First Name" className="h-11 rounded-lg" />
              )}
            />
            {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name.message}</span>}
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

          {/* Student ID */}
          <Form.Item label="Student ID" required>
            <Controller
              name="student_id"
              control={control}
              rules={{ required: "Student ID is required" }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter student ID" className="h-11 rounded-lg" />
              )}
            />
            {errors.student_id && <span className="text-red-500 text-sm">{errors.student_id.message}</span>}
          </Form.Item>

          {/* Year */}
          <Form.Item label="Year" required>
            <Controller
              name="year"
              control={control}
              rules={{ required: "Year is required" }}
              render={({ field }) => (
                <Select {...field} placeholder="Select year" className="h-11" loading={isYearsLoading} virtual>
                  {years.map((y) => (
                    <Option key={y.id} value={y.id}>{y.name}</Option>
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
                <Select {...field} placeholder="Select faction" className="h-11" loading={isFactionsLoading} virtual>
                  {factions.map((f) => (
                    <Option key={f.id} value={f.id}>{f.name}</Option>
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
                <Select {...field} placeholder="Select room" className="h-11" loading={isRoomsLoading} virtual>
                  {rooms.map((r) => (
                    <Option key={r.id} value={r.id}>{r.name}</Option>
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
            loading={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </ReusableModal>
  );
};

export default React.memo(EditStudentModal);
