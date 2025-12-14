import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiFolderDownloadFill, RiEditBoxFill } from "react-icons/ri";
import { FaFilter, FaTrash } from "react-icons/fa";
import { TbAwardFilled, TbTrophyFilled, TbStarFilled } from "react-icons/tb";
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

  // Updated dummy data to match the variations in the picture
  const [students, setStudents] = useState([
    {
      id: "ID-0001",
      name: "Jonny Little",
      faction: "Faction 1",
      certificates: "05",
      awardLevel: "Pinkies",
    },
    {
      id: "ID-0001",
      name: "Jonny Little",
      faction: "Faction 1",
      certificates: "",
      awardLevel: "Faction 1",
    },
    {
      id: "ID-0001",
      name: "Jonny Little",
      faction: "Faction 10",
      certificates: "",
      awardLevel: "Silver",
    },
    {
      id: "ID-0001",
      name: "Jonny Little",
      faction: "Faction 1",
      certificates: "05",
      awardLevel: "Pinkies",
    },
    {
      id: "ID-0001",
      name: "Jonny Little",
      faction: "Faction 1",
      certificates: "",
      awardLevel: "Faction 1",
    },
    {
      id: "ID-0001",
      name: "Jonny Little",
      faction: "Faction 10",
      certificates: "",
      awardLevel: "Silver",
    },
  ]);

  const handleAddStudent = (newStudentData) => {
    // Example: create a new student object
    const newStudent = {
      id: newStudentData.studentId,
      name: `${newStudentData.firstName} ${newStudentData.surname}`,
      faction: newStudentData.faction,
      certificates: "",
      awardLevel: "", // or set default
    };

    setStudents((prev) => [...prev, newStudent]);
    setIsModalOpen(false);

    // TODO: replace with actual API call
    console.log("New student added:", newStudent);
  };

  return (
    <div className="bg-[#fbf9f7]">
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
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name and ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F0629] pl-10"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
          {/* Year Dropdown */}
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F0629]">
            <option>All Year</option>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
          {/* Faction Dropdown */}
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5F0629]">
            <option>All faction</option>
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
        {students.map((student, index) => {
          let IconComponent = TbAwardFilled;
          if (student.icon === "trophy") {
            IconComponent = TbTrophyFilled;
          } else if (student.icon === "star") {
            IconComponent = TbStarFilled;
          }

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-[#5F0629]"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {student.name}
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.5 11.278L20 9L17.5 6.722V3.5H14.278L12 1L9.722 3.5H6.5V6.722L4 9L6.5 11.278V14.5H9.722L12 17L14.278 14.5H17.5V11.278Z"
                      stroke="#092F63"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.5 7L12 5L15.5 7V11L12 13L8.5 11V7Z"
                      stroke="#092F63"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 7.5L10.5 9L12 10.5L13.5 9L12 7.5Z"
                      stroke="#092F63"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                <div className="flex gap-2">
                  <RiFolderDownloadFill className="text-xl text-primary" />
                  <RiEditBoxFill
                    onClick={() => {
                      setSelectedStudent(student);
                      setIsEditOpen(true);
                    }}
                    className="text-xl text-primary"
                  />
                  <FaTrash className="text-xl text-primary" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Student Modal */}
      <AddStudentModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
      />

      {/* Add Award Modal */}
      <AddAwardModal
        open={isAddAwardOpen}
        onCancel={() => setIsAddAwardOpen(false)}
        onSubmit={(data) => {
          console.log("Award added to", awardStudent.name, ":", data);
          // TODO: update student awards, certificates, level etc.
          setIsAddAwardOpen(false);
        }}
        studentName={awardStudent?.name}
      />

      {/* Edit Student Modal */}
      <EditStudentModal
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        onSubmit={(updatedData) => {
          setStudents((prev) =>
            prev.map((s) =>
              s.id === updatedData.id ? { ...s, ...updatedData } : s
            )
          );
          console.log("Student updated:", updatedData);
        }}
        student={selectedStudent}
      />
    </div>
  );
};

export default StudentManagement;
