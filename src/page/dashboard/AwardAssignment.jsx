import { Form, Select, InputNumber, Input, Button, message, Spin, Image, Typography } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHeader } from "../../contexts/HeaderContext";
import { 
  useAssignAwardMutation, 
  useGetAwardRulesQuery, 
  useGetAwardsQuery, 
  useGetStudentsQuery,
} from "../../redux/features/award/awards.api";

const { Option } = Select;
const { Text } = Typography;

const AwardAssignment = () => {
  const { setTitle, setDescription } = useHeader();
  const [messageApi, contextHolder] = message.useMessage();
  
  const { 
    data: awardRulesData, 
    isLoading: isLoadingRules,
    isError: isRulesError,
    error: rulesError 
  } = useGetAwardRulesQuery();
  
  const { 
    data: studentsData, 
    isLoading: isLoadingStudents,
    isError: isStudentsError,
    error: studentsError 
  } = useGetStudentsQuery();

  // Add awards query
  const { 
    data: awardsData, 
    isLoading: isLoadingAwards,
    isError: isAwardsError,
    error: awardsError 
  } = useGetAwardsQuery();

  const [assignAward, { isLoading: isAssigning }] = useAssignAwardMutation();

  const [students, setStudents] = useState([]);
  const [awardRules, setAwardRules] = useState([]);
  const [greeniesAward, setGreeniesAward] = useState(null);

  useEffect(() => {
    setTitle("Award Assignment");
    setDescription("");
  }, [setTitle, setDescription]);

  useEffect(() => {
    if (awardRulesData && Array.isArray(awardRulesData)) {
      setAwardRules(awardRulesData);
    }
  }, [awardRulesData]);

  useEffect(() => {
    // Find Greenies award from the awards data
    if (awardsData) {
      console.log("Processing awards data:", awardsData);
      
      let awardList = [];
      
      // Check different possible response structures (similar to students)
      if (Array.isArray(awardsData)) {
        awardList = awardsData;
      } else if (awardsData.results && Array.isArray(awardsData.results)) {
        awardList = awardsData.results;
      } else if (awardsData.data && Array.isArray(awardsData.data)) {
        awardList = awardsData.data;
      } else if (awardsData.awards && Array.isArray(awardsData.awards)) {
        awardList = awardsData.awards;
      }
      
      // Find the Greenies award by name (case-insensitive)
      const greenies = awardList.find(award => {
        const awardName = (award.name || award.award_name || award.awardName || "").toLowerCase();
        return awardName.includes("green") || awardName.includes("greenies");
      });
      
      console.log("Found Greenies award:", greenies);
      setGreeniesAward(greenies || null);
    }
  }, [awardsData]);

  useEffect(() => {
    if (studentsData) {
      console.log("Processing students data:", studentsData);
      
      let studentList = [];
      
      // Check different possible response structures
      if (Array.isArray(studentsData)) {
        studentList = studentsData;
      } else if (studentsData.results && Array.isArray(studentsData.results)) {
        studentList = studentsData.results;
      } else if (studentsData.data && Array.isArray(studentsData.data)) {
        studentList = studentsData.data;
      } else if (studentsData.students && Array.isArray(studentsData.students)) {
        studentList = studentsData.students;
      }
      
      console.log("Extracted student list:", studentList);
      
      // Process and clean the student data
      const cleanedStudents = studentList.map((student, index) => {
        // Try different possible property names for ID
        const id = student.id || student.student_id || student.studentId || student._id || `temp-${index}`;
        // Try different possible property names for Name
        const name = student.name || student.full_name || student.student_name || student.username || `Student ${index + 1}`;
        
        console.log(`Student ${index}:`, { id, name, raw: student });
        
        return {
          ...student,
          id: String(id).trim(),
          name: String(name).trim(),
        };
      }).filter(student => student.id && student.name);
      
      console.log("Cleaned students:", cleanedStudents);
      setStudents(cleanedStudents);
    }
  }, [studentsData]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      studentId: "",
      quantity: 1,
      reason: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      if (!formData.studentId || !formData.quantity) {
        messageApi.error({
          content: "Please fill all required fields",
          duration: 3,
        });
        return;
      }

      // Check if Greenies award is available
      if (!greeniesAward) {
        messageApi.error({
          content: "Greenies award not found. Please try again later.",
          duration: 3,
        });
        return;
      }

      // Get the Greenies award ID from the found award
      const greeniesId = greeniesAward.id || greeniesAward.award_id || greeniesAward._id;
      
      if (!greeniesId) {
        messageApi.error({
          content: "Invalid Greenies award data. Please contact support.",
          duration: 3,
        });
        return;
      }

      const trimmedData = {
        studentId: String(formData.studentId).trim(),
        awardType: greeniesId, // Use the actual Greenies award ID
        quantity: Number(formData.quantity),
        reason: formData.reason ? String(formData.reason).trim() : "",
      };

      console.log("Submitting award data:", trimmedData);

      const student = students.find(s => s.id === trimmedData.studentId);
      
      await assignAward(trimmedData).unwrap();
      
      messageApi.success({
        content: `Greenies award assigned successfully to ${student?.first_name || "Student"}!`,
        duration: 3,
      });
      
      reset({
        studentId: "",
        quantity: 1,
        reason: "",
      });
      
    } catch (error) {
      console.error("Failed to assign award:", error);
      messageApi.error({
        content: error?.data?.message || error?.data?.detail || "Failed to assign award. Please try again.",
        duration: 4,
      });
    }
  };

  const handleCancel = () => {
    reset({
      studentId: "",
      quantity: 1,
      reason: "",
    });
  };

  // Update loading condition
  if (isLoadingRules || isLoadingStudents || isLoadingAwards) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  // Update error condition
  if (isRulesError || isStudentsError || isAwardsError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 font-semibold mb-2">Failed to load data</p>
          <p className="text-red-500 text-sm">
            {rulesError?.data?.message || studentsError?.data?.message || awardsError?.data?.message || "Please check your connection and try again."}
          </p>
        </div>
      </div>
    );
  }

  const renderAwardIcon = (iconUrl, altText) => {
    if (iconUrl) {
      return <Image src={iconUrl} alt={altText} width={24} height={24} preview={false} />;
    }
    
    if (altText?.toLowerCase().includes("green")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#5F0629">
          <path d="M12.0004 0L14.5039 1.296L17.2909 1.719L18.5539 4.239L20.5594 6.219L20.1004 9L20.5594 11.781L18.5539 13.761L17.2909 16.281L14.5039 16.704L12.0004 18L9.49691 16.704L6.70991 16.281L5.44691 13.761L3.44141 11.781L3.90041 9L3.44141 6.219L5.44691 4.239L6.70991 1.719L9.49691 1.296L12.0004 0Z" />
          <path d="M6 17.6909V23.9999L12 22.4999L18 23.9999V17.6909L14.973 18.1499L12 19.6889L9.027 18.1499L6 17.6909Z" />
        </svg>
      );
    }
    
    return <span className="text-2xl">🏆</span>;
  };

  // Get Greenies award name for display
  const getGreeniesName = () => {
    if (!greeniesAward) return "Greenies";
    
    return greeniesAward.name || 
           greeniesAward.award_name || 
           greeniesAward.awardName || 
           "Greenies";
  };

  // Get Greenies award icon for display
  const getGreeniesIcon = () => {
    if (!greeniesAward) return null;
    
    return greeniesAward.icon_url || 
           greeniesAward.icon || 
           greeniesAward.iconUrl || 
           greeniesAward.image_url;
  };

  return (
    <>
      {contextHolder}
      <div className="p-6 roboto">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border-2 border-[#777777]">
          <h2 className="text-2xl font-bold text-center text-[#5F0629] mb-6">
            Award Rule
          </h2>

          {awardRules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {awardRules.slice(0, Math.ceil(awardRules.length / 2)).map((rule, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {renderAwardIcon(rule.base_award_icon, rule.base_award_name)}
                      <span className="text-lg font-medium">{rule.number}</span>
                    </div>
                    <span className="text-lg">
                      {rule.base_award_name} = 1 {rule.result_award_name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {awardRules.slice(Math.ceil(awardRules.length / 2)).map((rule, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {renderAwardIcon(rule.base_award_icon, rule.base_award_name)}
                      <span className="text-lg font-medium">{rule.number}</span>
                    </div>
                    <span className="text-lg">
                      {rule.base_award_name} = 1 {rule.result_award_name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No award rules found</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-primary mb-8">Assign Award</h2>

          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item className="text-base font-medium" label="Select Student" required>
              <Controller
                name="studentId"
                control={control}
                rules={{ 
                  required: "Please select a student",
                  validate: value => value && String(value).trim() ? true : "Please select a student"
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    placeholder={isLoadingStudents ? "Loading students..." : "Choose a student"}
                    optionFilterProp="children"
                    className="h-11"
                    disabled={isLoadingStudents || students.length === 0 || !greeniesAward}
                    filterOption={(input, option) => {
                      if (!option || !option.children) return false;
                      const searchText = input.toLowerCase();
                      const optionText = String(option.children).toLowerCase();
                      return optionText.includes(searchText);
                    }}
                    allowClear
                    notFoundContent={
                      <div className="p-2 text-center">
                        <p>No students found</p>
                        <p className="text-sm text-gray-500">
                          {studentsData ? `Data received but no students extracted` : "No data received"}
                        </p>
                      </div>
                    }
                  >
                    {students.map((student) => (
                      <Option key={student.id} value={student.id}>
                        {student.first_name}{student.surname} - {student?.year?.name} ({student.student_id || student.id})
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
              <div className="text-xs text-gray-500 mt-1">
                Found {students.length} student(s)
              </div>
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Fixed Award Type - Greenies from API */}
              <Form.Item className="text-base font-medium" label="Award type">
                <div className="flex items-center gap-2 h-11 px-3 border border-gray-300 rounded-lg bg-gray-50">
                  {getGreeniesIcon() ? (
                    <Image 
                      src={getGreeniesIcon()} 
                      alt={getGreeniesName()} 
                      width={18} 
                      height={18} 
                      preview={false}
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#5F0629"
                    >
                      <path d="M12.0004 0L14.5039 1.296L17.2909 1.719L18.5539 4.239L20.5594 6.219L20.1004 9L20.5594 11.781L18.5539 13.761L17.2909 16.281L14.5039 16.704L12.0004 18L9.49691 16.704L6.70991 16.281L5.44691 13.761L3.44141 11.781L3.90041 9L3.44141 6.219L5.44691 4.239L6.70991 1.719L9.49691 1.296L12.0004 0Z" />
                      <path d="M6 17.6909V23.9999L12 22.4999L18 23.9999V17.6909L14.973 18.1499L12 19.6889L9.027 18.1499L6 17.6909Z" />
                    </svg>
                  )}
                  <Text strong className="text-gray-800">
                    {getGreeniesName()}
                  </Text>
                </div>
                {!greeniesAward ? (
                  <p className="text-sm text-red-500 mt-1">
                    Greenies award not found in the system.
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">
                    Only {getGreeniesName()} can be assigned directly. Other awards are earned through conversion.
                  </p>
                )}
              </Form.Item>

              <Form.Item className="text-base font-medium" label="Quantity" required>
                <Controller
                  name="quantity"
                  control={control}
                  rules={{
                    required: "Quantity is required",
                    min: { value: 1, message: "Minimum 1" },
                    validate: value => value > 0 ? true : "Quantity must be greater than 0"
                  }}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      min={1}
                      className="w-full h-11"
                      disabled={isAssigning || !greeniesAward}
                      onChange={(value) => field.onChange(value)}
                      value={field.value}
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
                    disabled={isAssigning || !greeniesAward}
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value || ""}
                  />
                )}
              />
            </Form.Item>

            <div className="flex justify-end gap-4 mt-8">
              <Button
                onClick={handleCancel}
                className="px-8 py-2 h-11 border border-gray-400 text-gray-700 rounded-lg"
                disabled={isAssigning}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="px-8 py-2 h-11 rounded-lg"
                style={{ background: "#5F0629" }}
                loading={isAssigning}
                disabled={isAssigning || students.length === 0 || !greeniesAward}
              >
                {isAssigning ? "Assigning..." : `Assign ${getGreeniesName()}`}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AwardAssignment;