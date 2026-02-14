import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiFolderDownloadFill, RiEditBoxFill } from "react-icons/ri";
import { FaFilter, FaTrash } from "react-icons/fa";
import { TbTrophyFilled } from "react-icons/tb";
import { message, Popconfirm, Select, Input } from "antd";
import { useHeader } from "../../contexts/HeaderContext";
import AddStudentModal from "../../components/dashboard/AddStudentModal";
import AddAwardModal from "../../components/dashboard/AddAwardModal";
import EditStudentModal from "../../components/dashboard/EditStudentModal";
import {
  useArchiveStudentMutation,
  useDeleteStudentMutation,
  useFilterStudentsQuery,
  useGetStudentsQuery,
} from "../../redux/features/student/student.api";
import { useGetYearsQuery } from "../../redux/features/years/years.api";
import { useGetFactionsQuery } from "../../redux/features/factions/factions.api";

const StudentManagement = () => {
  const { setTitle, setDescription } = useHeader();
  const [isAddAwardOpen, setIsAddAwardOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [awardStudent, setAwardStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedFaction, setSelectedFaction] = useState(null);

  // Sorting state
  const [sortOrder, setSortOrder] = useState("none"); // "none" | "asc" | "desc"

  // API Queries
  const { data: students = [], isLoading, refetch } = useGetStudentsQuery();
  const { data: years = [] } = useGetYearsQuery();
  const { data: factions = [] } = useGetFactionsQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const [archiveStudent] = useArchiveStudentMutation();

  // Filter query
  const filterParams = {
    student_id: searchTerm || undefined,
    year: selectedYear || undefined,
    faction: selectedFaction || undefined,
  };

  const { data: filteredStudents = [] } = useFilterStudentsQuery(filterParams, {
    skip: !searchTerm && !selectedYear && !selectedFaction,
  });

  // Determine which data to display
  let displayStudents =
    searchTerm || selectedYear || selectedFaction ? filteredStudents : students;

  // Apply sorting
  displayStudents = [...displayStudents]; // avoid mutating original array
  if (sortOrder !== "none") {
    displayStudents.sort((a, b) => {
      const nameA = `${a.first_name || ""} ${a.surname || ""}`.trim().toLowerCase();
      const nameB = `${b.first_name || ""} ${b.surname || ""}`.trim().toLowerCase();

      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }

  useEffect(() => {
    setTitle("Student Management");
    setDescription("");
  }, [setTitle, setDescription]);

  const handleAddStudent = (data) => {
    // This will be handled by the modal with API
    setIsModalOpen(false);
  };

  const handleEditStudent = (updatedData) => {
    // This will be handled by the modal with API
  };

  const handleAddAward = (awardData) => {
    // This will be handled by the modal with API
    setIsAddAwardOpen(false);
    setAwardStudent(null);
  };

  const handleArchive = async (student) => {
    try {
      await archiveStudent(student.id).unwrap();
      message.success(
        `${student.first_name} ${student.surname} archived successfully`
      );
      refetch();
    } catch (error) {
      message.error(error?.data?.detail || "Failed to archive student");
    }
  };

  const handleDelete = async (student) => {
    try {
      await deleteStudent(student.id).unwrap();
      message.success(
        `${student.first_name} ${student.surname} deleted successfully`
      );
      refetch();
    } catch (error) {
      message.error(error?.data?.detail || "Failed to delete student");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedYear(null);
    setSelectedFaction(null);
  };

  const toggleSort = () => {
    if (sortOrder === "none") {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("none");
    }
  };

  const sortButtonText =
    sortOrder === "none" ? "Sort A-Z" : sortOrder === "asc" ? "Sort by Default" : "Sort A-Z";

  return (
    <div className="bg-[#fbf9f7] px-6 roboto">
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
            <Input
              type="text"
              placeholder="Search by name and ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11"
              prefix={<FiSearch className="text-gray-500" />}
            />
          </div>
          <Select
            placeholder="All Year"
            value={selectedYear}
            onChange={setSelectedYear}
            className="w-full h-11"
            options={years.map((year) => ({
              value: year.id,
              label: year.name,
            }))}
          />
          <Select
            placeholder="All Faction"
            value={selectedFaction}
            onChange={setSelectedFaction}
            className="w-full h-11"
            options={factions.map((faction) => ({
              value: faction.id,
              label: faction.name,
            }))}
          />
        </div>
        <button
          onClick={clearFilters}
          className="text-primary font-medium border border-[#777777] rounded-md px-4 py-2"
        >
          Clear filter
        </button>
      </div>

      {/* Student List Header */}
      <div className="flex items-center justify-between mb-4 mt-8">
        <h3 className="text-2xl text-black">Student List</h3>
        <button
          onClick={toggleSort}
          className="text-primary flex items-center gap-1 font-medium bg-white border border-[#777777] rounded-md px-4 py-2 hover:bg-gray-50 transition"
        >
          ↑↓ {sortButtonText}
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Loading students...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayStudents.map((student, index) => (
            <div
              key={student.id || index}
              className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-[#5F0629]"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {student.first_name} {student.surname}
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
                  <p className="text-sm text-gray-600">{student.student_id}</p>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Faction:</span>
                    <span className="text-sm font-medium text-gray-800 text-right">
                      {student.faction?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Year:</span>
                    <span className="text-sm font-medium text-gray-800 text-right">
                      {student.year?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Room:</span>
                    <span className="text-sm font-medium text-gray-800 text-right">
                      {student.room?.name || "N/A"}
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
                    description={`Are you sure you want to delete ${student.first_name} ${student.surname}?`}
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
      )}

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
        studentName={
          awardStudent
            ? `${awardStudent.first_name} ${awardStudent.surname}`
            : ""
        }
        studentId={awardStudent?.id}
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
