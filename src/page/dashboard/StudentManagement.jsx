import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiFolderDownloadFill, RiEditBoxFill } from "react-icons/ri";
import { FaFilter, FaTrash } from "react-icons/fa";
import { TbTrophyFilled } from "react-icons/tb";
import { message, Popconfirm } from "antd";
import { useHeader } from "../../contexts/HeaderContext";
import AddStudentModal from "../../components/dashboard/AddStudentModal";
import AddAwardModal from "../../components/dashboard/AddAwardModal";
import EditStudentModal from "../../components/dashboard/EditStudentModal";

const StudentManagement = () => {
  const { setTitle, setDescription } = useHeader();
  const [isAddAwardOpen, setIsAddAwardOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [awardStudent, setAwardStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTitle("Student Management");
    setDescription("");
  }, [setTitle, setDescription]);

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

  const [students, setStudents] = useState([
    {
      id: "ID-0001",
      firstName: "Jonny",
      surname: "Little",
      faction: "Faction 1",
      certificates: "05",
      awardLevel: "Pinkies",
    },
    {
      id: "ID-0002",
      firstName: "Jonny",
      surname: "Little",
      faction: "Faction 1",
      certificates: "",
      awardLevel: "Faction 1",
    },
    {
      id: "ID-0003",
      firstName: "Jonny",
      surname: "Little",
      faction: "Faction 10",
      certificates: "",
      awardLevel: "Silver",
    },
    {
      id: "ID-0004",
      firstName: "Jonny",
      surname: "Little",
      faction: "Faction 1",
      certificates: "05",
      awardLevel: "Pinkies",
    },
    {
      id: "ID-0005",
      firstName: "Jonny",
      surname: "Little",
      faction: "Faction 1",
      certificates: "",
      awardLevel: "Faction 1",
    },
    {
      id: "ID-0006",
      firstName: "Jonny",
      surname: "Little",
      faction: "Faction 10",
      certificates: "",
      awardLevel: "Silver",
    },
  ]);

  const handleAddStudent = (data) => {
    const newStudent = {
      id: data.studentId,
      firstName: data.firstName,
      surname: data.surname,
      faction: data.faction,
      year: data.year,
      room: data.room,
      certificates: "",
      awardLevel: "",
    };

    setStudents((prev) => [...prev, newStudent]);
    setIsModalOpen(false);
    console.log("New student added:", newStudent);
  };

  const handleEditStudent = (updatedData) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === updatedData.id
          ? {
              ...s,
              firstName: updatedData.firstName,
              surname: updatedData.surname,
              studentId: updatedData.studentId,
              faction: updatedData.faction,
              year: updatedData.year,
              room: updatedData.room,
            }
          : s
      )
    );
    console.log("Student updated:", updatedData);
  };

  // Handle Add Award - now managed here
  const handleAddAward = (awardData) => {
    const { awardType, quantity } = awardData;

    setStudents((prev) =>
      prev.map((s) =>
        s.id === awardStudent.id
          ? {
              ...s,
              certificates: s.certificates
                ? String(Number(s.certificates) + Number(quantity))
                : String(quantity),
              awardLevel: awardType, // Update award level (can be enhanced later)
            }
          : s
      )
    );

    message.success(
      `${quantity} ${awardType} award(s) added to ${awardStudent.firstName} ${awardStudent.surname}!`
    );

    setIsAddAwardOpen(false);
    setAwardStudent(null);
    console.log("Award added:", awardData, "to student:", awardStudent);
    // TODO: Replace with API call
  };

  const handleArchive = (student) => {
    console.log("Archive student data:", student);
    message.info(`Archiving data for ${student.firstName} ${student.surname}...`);
  };

  const handleDelete = (student) => {
    console.log("Delete student:", student);
    setStudents((prev) => prev.filter((s) => s.id !== student.id));
    message.success(`${student.firstName} ${student.surname} deleted successfully`);
  };

  return (
    <div className="bg-[#fbf9f7] px-6">
      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-center gap-2">
            <FaFilter className="text-gray-600" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Filter & Search
            </h3>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#5F0629] text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <span>+</span> Add Student
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name and ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F0629] pl-10"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F0629]">
            <option>All Year</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F0629]">
            <option>All faction</option>
            {factionOptions.map((faction) => (
              <option key={faction} value={faction}>
                {faction}
              </option>
            ))}
          </select>
        </div>
        <button className="text-primary font-medium border border-[#777777] rounded-md px-4 py-2">
          Clear filter
        </button>
      </div>

      {/* Student List */}
      <div className="flex items-center justify-between mb-4 mt-8">
        <h3 className="text-2xl text-black">Student List</h3>
        <button className="text-primary flex items-center gap-1 font-medium bg-white border border-[#777777] rounded-md px-4 py-2">
          ↑↓ Sort A-Z
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-[#5F0629]"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  {student.firstName} {student.surname}
                </h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17.5 6.722V3.5H14.278L12 1L9.722 3.5H6.5V6.722L4 9L6.5 11.278V14.5H8.5L6.5 23L12 19.5L17.5 23L15.5 14.5H17.5V11.278L20 9L17.5 6.722Z"
                    fill="white"
                  />
                  <path
                    d="M12 5L8.5 7V11L12 13L15.5 11V7L12 5ZM12 10.5L10.5 9L12 7.5L13.5 9L12 10.5ZM14.278 14.5L12 17V19.5L17.5 23L15.5 14.5H14.278Z"
                    fill="#BBD8FF"
                  />
                  <path
                    d="M8.5 14.5L6.5 23L12 19.5L17.5 23L15.5 14.5"
                    stroke="#092F63"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 11.278L20 9L17.5 6.722V3.5H14.278L12 1L9.722 3.5H6.5V6.722L4 9L6.5 11.278V14.5H9.722L12 17L14.278 14.5H17.5V11.278Z"
                    stroke="#092F63"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 7L12 5L15.5 7V11L12 13L8.5 11V7Z"
                    stroke="#092F63"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7.5L10.5 9L12 10.5L13.5 9L12 7.5Z"
                    stroke="#092F63"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">{student.id}</p>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Faction:</span>
                  <span className="text-sm font-medium text-gray-800 text-right">
                    {student.faction}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Certificates:</span>
                  <span className="text-sm font-medium text-gray-800 text-right">
                    {student.certificates || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Award Level:</span>
                  <span className="text-sm font-medium text-gray-800 text-right">
                    {student.awardLevel}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-white px-4 py-2 flex items-center justify-between">
              <button
                onClick={() => {
                  setAwardStudent(student);
                  setIsAddAwardOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-1 xl:px-6 bg-primary rounded-md"
              >
                <TbTrophyFilled className="text-xl" />
                Add Award
              </button>
              <div className="flex gap-4">
                <div
                  className="relative group"
                  onClick={() => handleArchive(student)}
                >
                  <RiFolderDownloadFill className="text-xl text-primary cursor-pointer" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Archive
                  </span>
                </div>

                <RiEditBoxFill
                  onClick={() => {
                    setSelectedStudent(student);
                    setIsEditOpen(true);
                  }}
                  className="text-xl text-primary cursor-pointer"
                />

                <Popconfirm
                  title="Delete Student"
                  description={`Are you sure you want to delete ${student.firstName} ${student.surname}?`}
                  onConfirm={() => handleDelete(student)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ style: { background: "#5F0629" } }}
                >
                  <div className="relative group">
                    <FaTrash className="text-xl text-primary cursor-pointer" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Delete
                    </span>
                  </div>
                </Popconfirm>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <AddStudentModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
      />

      <AddAwardModal
        open={isAddAwardOpen}
        onCancel={() => {
          setIsAddAwardOpen(false);
          setAwardStudent(null);
        }}
        onSubmit={handleAddAward}
        studentName={awardStudent ? `${awardStudent.firstName} ${awardStudent.surname}` : ""}
      />

      <EditStudentModal
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        onSubmit={handleEditStudent}
        student={selectedStudent}
      />
    </div>
  );
};

export default StudentManagement;