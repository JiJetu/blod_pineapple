import { useEffect, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { TbRestore } from "react-icons/tb";
import { useHeader } from "../../contexts/HeaderContext";
import { BsFillTrashFill } from "react-icons/bs";

const { Search } = Input;

// Dummy data
const archivedStudents = [
  {
    id: "ID-0001",
    name: "Jonny Little",
    faction: "Bilbies",
    certificates: "03",
    awardLevel: "Bronze",
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
    faction: "Faction 1",
    certificates: "10",
    awardLevel: "Silver",
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
    faction: "Faction 1",
    certificates: "",
    awardLevel: "Faction 1",
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
    faction: "Faction 1",
    certificates: "",
    awardLevel: "Faction 1",
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
    faction: "Faction 1",
    certificates: "",
    awardLevel: "Faction 1",
  },
];

const Archive = () => {
  const { setTitle, setDescription } = useHeader();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTitle("Archive System");
    setDescription("Manage archive students");
  }, [setTitle, setDescription]);

  const filteredStudents = archivedStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.faction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRestore = (student) => {
    console.log("Restore:", student);
  };

  const handleDelete = (student) => {
    console.log("Permanent delete:", student);
  };

  return (
    <div className="bg-[#fbf9f7] min-h-screen p-6 roboto">
      <div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg border-b-0 p-8 border border-primary">
            <p className="text-lg font-medium mb-2">Archive students</p>
            <h2 className="text-5xl font-bold text-[#5F0629]">14</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border-b-0 p-8 border border-primary">
            <p className="text-lg font-medium mb-2">Archived awards</p>
            <h2 className="text-5xl font-bold text-[#5F0629]">24</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border-b-0 p-8 border border-primary">
            <p className="text-lg font-medium mb-2">Archived Certificate</p>
            <h2 className="text-5xl font-bold text-[#5F0629]">3</h2>
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
          {filteredStudents.map((student, index) => (
            <div
              key={index}
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
                  </span>
                </div>

                <p className="text-gray-600 text-base mb-4">{student.id}</p>

                <div className="space-y-3 text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Faction:</span>
                    <span className="font-medium text-gray-800">
                      {student.faction}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Certificates:</span>
                    <span className="font-medium text-gray-800">
                      {student.certificates || "-"}
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
                  className="bg-primary text-white rounded-lg px-6 py-2 font-medium hover:bg-gray-50 flex items-center gap-2 shadow-sm"
                >
                  <TbRestore className="text-xl" />
                  Restore
                </button>

                <BsFillTrashFill
                  onClick={() => handleDelete(student)}
                  className="text-2xl text-primary cursor-pointer hover:opacity-80"
                />
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No archived students found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
