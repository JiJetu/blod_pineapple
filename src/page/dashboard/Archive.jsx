import { useEffect, useState } from "react";
import { Input, Spin, message, Modal } from "antd";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { TbRestore } from "react-icons/tb";
import { useHeader } from "../../contexts/HeaderContext";
import { BsFillTrashFill } from "react-icons/bs";
import { useDeleteArchivedStudentMutation, useGetArchivedStudentsQuery, useGetArchiveStatsQuery, useRestoreArchivedStudentMutation, useSearchArchivedStudentsQuery } from "../../redux/features/archive/archiveApi";


const { Search } = Input;
const { confirm } = Modal;

const Archive = () => {
  const { setTitle, setDescription } = useHeader();
  const [searchTerm, setSearchTerm] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [stats, setStats] = useState({
    totalArchivedStudents: 0,
    totalArchivedAwards: 0,
    archivedCertificate: 0,
  });

  // API hooks
  const { 
    data: statsData, 
    isLoading: isLoadingStats,
    isError: isStatsError,
    error: statsError,
    refetch: refetchStats 
  } = useGetArchiveStatsQuery();

  const { 
    data: studentsData, 
    isLoading: isLoadingStudents,
    isError: isStudentsError,
    error: studentsError,
    refetch: refetchStudents 
  } = useGetArchivedStudentsQuery();

  const { 
    data: searchData,
    isLoading: isLoadingSearch,
    isError: isSearchError,
    error: searchError 
  } = useSearchArchivedStudentsQuery(searchTerm, {
    skip: searchTerm.length === 0,
  });

  const [restoreStudent, { isLoading: isRestoring }] = useRestoreArchivedStudentMutation();
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteArchivedStudentMutation();

  useEffect(() => {
    setTitle("Archive System");
    setDescription("Manage archive students");
  }, [setTitle, setDescription]);

  // Process stats data
  useEffect(() => {
    if (statsData) {
      setStats({
        totalArchivedStudents: statsData.total_archived_students || 0,
        totalArchivedAwards: statsData.total_achived_awards || 0,
        archivedCertificate: statsData.archived_certificate || 0,
      });
    }
  }, [statsData]);

  // Get the current students list based on search
  const getCurrentStudents = () => {
    if (searchTerm && searchData) {
      return searchData;
    }
    return studentsData || [];
  };

  // Process student data for display
  const processStudents = (data) => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((student) => {
      // Note: Your API response doesn't include certificates or awardLevel
      // We'll need to fetch this from another endpoint or adjust the API
      return {
        id: student.id,
        student_id: student.student_id,
        name: `${student.first_name || ''} ${student.surname || ''}`.trim(),
        faction: student.faction?.name || "N/A",
        year: student.year?.name || "N/A",
        room: student.room?.name || "N/A",
        certificates: "-", // Not available in current API
        awardLevel: "-", // Not available in current API
        rawData: student
      };
    });
  };

  const students = processStudents(getCurrentStudents());
  const isLoading = isLoadingStats || isLoadingStudents || (searchTerm && isLoadingSearch);

  // Handle restore student
  const handleRestore = async (student) => {
    try {
      await restoreStudent(student.id).unwrap();
      
      messageApi.success({
        content: "Student restored successfully",
        duration: 3,
      });
      
      // Refetch data to update the UI
      refetchStats();
      refetchStudents();
    } catch (error) {
      console.error("Failed to restore student:", error);
      messageApi.error({
        content: error?.data?.message || error?.data?.detail || "Failed to restore student",
        duration: 4,
      });
    }
  };

  // Handle delete student
  const handleDelete = (student) => {
    confirm({
      title: "Permanently Delete Student",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to permanently delete ${student.name}? This action cannot be undone.`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteStudent(student.id).unwrap();
          
          messageApi.success({
            content: "Student permanently deleted",
            duration: 3,
          });
          
          // Refetch data to update the UI
          refetchStats();
          refetchStudents();
        } catch (error) {
          console.error("Failed to delete student:", error);
          messageApi.error({
            content: error?.data?.message || error?.data?.detail || "Failed to delete student",
            duration: 4,
          });
        }
      },
    });
  };

  // Error handling
  if (isStatsError || isStudentsError || (searchTerm && isSearchError)) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 font-semibold mb-2">Failed to load archive data</p>
          <p className="text-red-500 text-sm">
            {statsError?.data?.message || studentsError?.data?.message || 
             searchError?.data?.message || "Please check your connection and try again."}
          </p>
          <button 
            onClick={() => {
              refetchStats();
              refetchStudents();
            }} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="bg-[#fbf9f7] min-h-screen p-6 roboto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-2xl shadow-lg border-b-0 p-8 border border-primary">
                <p className="text-lg font-medium mb-2">Archive students</p>
                <h2 className="text-5xl font-bold text-[#5F0629]">
                  {stats.totalArchivedStudents}
                </h2>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border-b-0 p-8 border border-primary">
                <p className="text-lg font-medium mb-2">Archived awards</p>
                <h2 className="text-5xl font-bold text-[#5F0629]">
                  {stats.totalArchivedAwards}
                </h2>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border-b-0 p-8 border border-primary">
                <p className="text-lg font-medium mb-2">Archived Certificate</p>
                <h2 className="text-5xl font-bold text-[#5F0629]">
                  {stats.archivedCertificate}
                </h2>
              </div>
            </div>

            {/* Search Section */}
            <div className="mb-10 border border-[#777777] p-6 rounded-2xl bg-white shadow-md">
              <p className="text-lg font-medium mb-3">Search archived students</p>
              <Input
                placeholder="Search by name, id or class"
                prefix={<SearchOutlined className="text-gray-400 text-xl mr-3" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-lg rounded-xl border-0"
                style={{ backgroundColor: "#F3F8FF" }}
                allowClear
              />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-primary mb-6">
              Archived Student list
            </h2>

            {/* Student Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student, index) => (
                <div
                  key={`${student.id}-${index}`}
                  className="bg-white rounded-2xl shadow-md overflow-hidden border-l-4 border-primary"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        {student.name}
                      </h3>
                      <span className="text-3xl">
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
                      </span>
                    </div>

                    <p className="text-gray-600 text-base mb-4">
                      ID: {student.student_id || student.id}
                    </p>

                    <div className="space-y-3 text-base">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Faction:</span>
                        <span className="font-medium text-gray-800">
                          {student.faction}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year:</span>
                        <span className="font-medium text-gray-800">
                          {student.year}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Room:</span>
                        <span className="font-medium text-gray-800">
                          {student.room}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Certificates:</span>
                        <span className="font-medium text-gray-800">
                          {student.certificates}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Award Level:</span>
                        <span className="font-medium text-gray-800">
                          {student.awardLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Maroon Footer */}
                  <div className="px-6 py-4 flex items-center justify-between">
                    <button
                      onClick={() => handleRestore(student)}
                      disabled={isRestoring || isDeleting}
                      className="bg-primary text-white rounded-lg px-6 py-2 font-medium flex items-center gap-2 shadow-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <TbRestore className="text-xl" />
                      {isRestoring ? "Restoring..." : "Restore"}
                    </button>

                    <BsFillTrashFill
                      onClick={() => handleDelete(student)}
                      disabled={isDeleting || isRestoring}
                      className={`text-2xl text-primary cursor-pointer hover:opacity-90 transition ${
                        isDeleting || isRestoring ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {students.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500">
                  {searchTerm ? "No archived students found matching your search" : "No archived students found"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Archive;