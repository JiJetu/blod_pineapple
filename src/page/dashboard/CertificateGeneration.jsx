import { useEffect, useState } from "react";
import { Checkbox, Button, Select } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { PiStudentBold } from "react-icons/pi";
import { useHeader } from "../../contexts/HeaderContext";

const { Option } = Select;

// Dummy data - replace with real data later
const eligibleStudents = [
  {
    id: "ID-0001",
    name: "Jonny Little",
    faction: "Faction 1",
    certificates: "05",
    awardLevel: "Pinkies",
  },
  {
    id: "ID-0002",
    name: "Jonny Little",
    faction: "Faction 1",
    certificates: "",
    awardLevel: "Faction 1",
  },
  {
    id: "ID-0003",
    name: "Jonny Little",
    faction: "Faction 1",
    certificates: "",
    awardLevel: "Silver",
  },
  {
    id: "ID-0004",
    name: "Jonny Little",
    faction: "Faction 1",
    certificates: "05",
    awardLevel: "Pinkies",
  },
  {
    id: "ID-0005",
    name: "Jonny Little",
    faction: "Faction 1",
    certificates: "",
    awardLevel: "Faction 1",
  },
  {
    id: "ID-0006",
    name: "Jonny Little",
    faction: "Faction 10",
    certificates: "",
    awardLevel: "Silver",
  },
  {
    id: "ID-0007",
    name: "Jonny Little",
    faction: "Faction 1",
    certificates: "05",
    awardLevel: "Pinkies",
  },
  {
    id: "ID-0008",
    name: "Jonny Little",
    faction: "Faction 1",
    certificates: "",
    awardLevel: "Faction 1",
  },
  {
    id: "ID-0009",
    name: "Jonny Little",
    faction: "Faction 1",
    certificates: "",
    awardLevel: "Faction 1",
  },
];

const awardFilters = [
  "All Awards",
  "Pinkies",
  "Certificate",
  "Bronze Badge",
  "Silver Badge",
  "Gold Badge",
  "Bronze Medallion",
  "Silver Medallion",
  "Gold Medallion",
];

const CertificateGeneration = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filterAward, setFilterAward] = useState("All Awards");
  const { setTitle, setDescription } = useHeader();

  useEffect(() => {
      setTitle("Certificate Generation");
      setDescription("Generate & print certificate for eligible students");
    }, [setTitle, setDescription]);

  // Toggle individual student selection
  const toggleStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Select/Deselect All
  const toggleSelectAll = () => {
    if (selectedStudents.length === eligibleStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(eligibleStudents.map((s) => s.id));
    }
  };

  const totalEligible = eligibleStudents.length;
  const totalCertificatesAllTime = 2448; // static or from API

  return (
    <div className="bg-[#fbf9f7] min-h-screen p-6">
      <div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Eligible */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-start justify-between border border-primary">
            <div>
              <p className="text-gray-600 font-medium">Total Eligible</p>
              <div>
                <h2 className="text-4xl font-bold text-primary mt-3">
                  {totalEligible}
                </h2>
                <p className="text-sm text-gray-500">
                  Students with certificate
                </p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                d="M12 9C10.4087 9 8.88258 9.63214 7.75736 10.7574C6.63214 11.8826 6 13.4087 6 15V26.013C8.25049 23.2282 11.5151 21.4515 15.0755 21.0737C18.636 20.6959 22.2007 21.748 24.9855 23.9985C27.7703 26.249 29.547 29.5136 29.9248 33.074C30.3026 36.6345 29.2505 40.1992 27 42.984V45H48C49.5913 45 51.1174 44.3679 52.2426 43.2426C53.3679 42.1174 54 40.5913 54 39V15C54 13.4087 53.3679 11.8826 52.2426 10.7574C51.1174 9.63214 49.5913 9 48 9H12ZM16.5 21C16.1022 21 15.7206 20.842 15.4393 20.5607C15.158 20.2794 15 19.8978 15 19.5C15 19.1022 15.158 18.7206 15.4393 18.4393C15.7206 18.158 16.1022 18 16.5 18H43.5C43.8978 18 44.2794 18.158 44.5607 18.4393C44.842 18.7206 45 19.1022 45 19.5C45 19.8978 44.842 20.2794 44.5607 20.5607C44.2794 20.842 43.8978 21 43.5 21H16.5ZM33 31.5C33 31.1022 33.158 30.7206 33.4393 30.4393C33.7206 30.158 34.1022 30 34.5 30H43.5C43.8978 30 44.2794 30.158 44.5607 30.4393C44.842 30.7206 45 31.1022 45 31.5C45 31.8978 44.842 32.2794 44.5607 32.5607C44.2794 32.842 43.8978 33 43.5 33H34.5C34.1022 33 33.7206 32.842 33.4393 32.5607C33.158 32.2794 33 31.8978 33 31.5ZM16.5 45C13.7152 45 11.0445 43.8938 9.07538 41.9246C7.10625 39.9555 6 37.2848 6 34.5C6 31.7152 7.10625 29.0445 9.07538 27.0754C11.0445 25.1062 13.7152 24 16.5 24C19.2848 24 21.9555 25.1062 23.9246 27.0754C25.8938 29.0445 27 31.7152 27 34.5C27 37.2848 25.8938 39.9555 23.9246 41.9246C21.9555 43.8938 19.2848 45 16.5 45ZM9 45.726C11.2201 47.209 13.8301 48.0003 16.5 48C19.275 48 21.855 47.16 24 45.726V54C24 54.2786 23.9224 54.5516 23.776 54.7886C23.6295 55.0256 23.42 55.2171 23.1708 55.3416C22.9217 55.4662 22.6427 55.519 22.3653 55.4939C22.0878 55.4689 21.8229 55.3671 21.6 55.2L17.4 52.05C17.1404 51.8553 16.8246 51.75 16.5 51.75C16.1754 51.75 15.8596 51.8553 15.6 52.05L11.4 55.2C11.1771 55.3671 10.9122 55.4689 10.6347 55.4939C10.3573 55.519 10.0783 55.4662 9.82918 55.3416C9.58002 55.2171 9.37048 55.0256 9.22402 54.7886C9.07757 54.5516 9 54.2786 9 54V45.726Z"
                fill="#5F0629"
                fill-opacity="0.2"
              />
            </svg>
          </div>

          {/* Selected */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-start justify-between border border-primary">
            <div>
              <p className="text-gray-600 font-medium">Selected</p>
              <div>
                <h2 className="text-4xl font-bold text-primary mt-3">
                  {selectedStudents.length}
                </h2>
                <p className="text-sm text-gray-500">Ready to generate</p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                d="M12.5 52.5C11.125 52.5 9.94833 52.0108 8.97 51.0325C7.99167 50.0542 7.50167 48.8767 7.5 47.5V12.5C7.5 11.125 7.99 9.94833 8.97 8.97C9.95 7.99167 11.1267 7.50167 12.5 7.5H47.5C47.8333 7.5 48.1458 7.53167 48.4375 7.595C48.7292 7.65833 49.0208 7.75167 49.3125 7.875L44.6875 12.5H12.5V47.5H47.5V30.875L52.5 25.875V47.5C52.5 48.875 52.0108 50.0525 51.0325 51.0325C50.0542 52.0125 48.8767 52.5017 47.5 52.5H12.5ZM28.8125 42.5L14.6875 28.375L18.1875 24.875L28.8125 35.5L51.75 12.5625L55.3125 16L28.8125 42.5Z"
                fill="#5F0629"
                fill-opacity="0.2"
              />
            </svg>
          </div>

          {/* Total Certificates */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-start justify-between border border-primary">
            <div>
              <p className="text-gray-600 font-medium">Total Certificate</p>
              <div>
                <h2 className="text-4xl font-bold text-primary mt-3">
                  {totalCertificatesAllTime}
                </h2>
                <p className="text-sm text-gray-500">All Time</p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                d="M12 9C10.4087 9 8.88258 9.63214 7.75736 10.7574C6.63214 11.8826 6 13.4087 6 15V26.013C8.25049 23.2282 11.5151 21.4515 15.0755 21.0737C18.636 20.6959 22.2007 21.748 24.9855 23.9985C27.7703 26.249 29.547 29.5136 29.9248 33.074C30.3026 36.6345 29.2505 40.1992 27 42.984V45H48C49.5913 45 51.1174 44.3679 52.2426 43.2426C53.3679 42.1174 54 40.5913 54 39V15C54 13.4087 53.3679 11.8826 52.2426 10.7574C51.1174 9.63214 49.5913 9 48 9H12ZM16.5 21C16.1022 21 15.7206 20.842 15.4393 20.5607C15.158 20.2794 15 19.8978 15 19.5C15 19.1022 15.158 18.7206 15.4393 18.4393C15.7206 18.158 16.1022 18 16.5 18H43.5C43.8978 18 44.2794 18.158 44.5607 18.4393C44.842 18.7206 45 19.1022 45 19.5C45 19.8978 44.842 20.2794 44.5607 20.5607C44.2794 20.842 43.8978 21 43.5 21H16.5ZM33 31.5C33 31.1022 33.158 30.7206 33.4393 30.4393C33.7206 30.158 34.1022 30 34.5 30H43.5C43.8978 30 44.2794 30.158 44.5607 30.4393C44.842 30.7206 45 31.1022 45 31.5C45 31.8978 44.842 32.2794 44.5607 32.5607C44.2794 32.842 43.8978 33 43.5 33H34.5C34.1022 33 33.7206 32.842 33.4393 32.5607C33.158 32.2794 33 31.8978 33 31.5ZM16.5 45C13.7152 45 11.0445 43.8938 9.07538 41.9246C7.10625 39.9555 6 37.2848 6 34.5C6 31.7152 7.10625 29.0445 9.07538 27.0754C11.0445 25.1062 13.7152 24 16.5 24C19.2848 24 21.9555 25.1062 23.9246 27.0754C25.8938 29.0445 27 31.7152 27 34.5C27 37.2848 25.8938 39.9555 23.9246 41.9246C21.9555 43.8938 19.2848 45 16.5 45ZM9 45.726C11.2201 47.209 13.8301 48.0003 16.5 48C19.275 48 21.855 47.16 24 45.726V54C24 54.2786 23.9224 54.5516 23.776 54.7886C23.6295 55.0256 23.42 55.2171 23.1708 55.3416C22.9217 55.4662 22.6427 55.519 22.3653 55.4939C22.0878 55.4689 21.8229 55.3671 21.6 55.2L17.4 52.05C17.1404 51.8553 16.8246 51.75 16.5 51.75C16.1754 51.75 15.8596 51.8553 15.6 52.05L11.4 55.2C11.1771 55.3671 10.9122 55.4689 10.6347 55.4939C10.3573 55.519 10.0783 55.4662 9.82918 55.3416C9.58002 55.2171 9.37048 55.0256 9.22402 54.7886C9.07757 54.5516 9 54.2786 9 54V45.726Z"
                fill="#5F0629"
                fill-opacity="0.2"
              />
            </svg>
          </div>
        </div>

        {/* Filter & Download */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Select
            value={filterAward}
            onChange={setFilterAward}
            className="w-full sm:w-64 h-11"
            placeholder="Filter by award"
          >
            {awardFilters.map((award) => (
              <Option key={award} value={award}>
                {award}
              </Option>
            ))}
          </Select>

          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            className="h-11 px-6 rounded-lg"
            style={{ background: "#5F0629" }}
            disabled={selectedStudents.length === 0}
          >
            Download list
          </Button>
        </div>

        {/* Eligible Students Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Eligible Students
        </h2>

        {/* Student Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eligibleStudents.map((student) => {
            const isSelected = selectedStudents.includes(student.id);

            return (
              <div
                key={student.id + Math.random()}
                className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-[#5F0629] transition-all ${
                  isSelected ? "ring-4 ring-[#5F0629] ring-opacity-30" : ""
                }`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {student.name}
                    </h4>
                    <div className="text-2xl">
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
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{student.id}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Faction:</span>
                      <span className="font-medium">{student.faction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Certificates:</span>
                      <span className="font-medium">
                        {student.certificates || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Award Level:</span>
                      <span className="font-medium">{student.awardLevel}</span>
                    </div>
                  </div>
                </div>

                {/* Footer with Select Button & Checkbox */}
                <div className="text-white px-4 py-3 flex items-center justify-between">
                  <button
                    onClick={() => toggleStudent(student.id)}
                    className="px-16 lg:px-8 xl:px-16 py-1 text-white bg-primary rounded-md font-medium transition"
                  >
                    Select
                  </button>

                  <Checkbox
                    checked={isSelected}
                    onChange={() => toggleStudent(student.id)}
                    className="text-white"
                  >
                    <span className="text-white"></span>
                  </Checkbox>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional: Select All Button */}
        {eligibleStudents.length > 0 && (
          <div className="mt-8 text-center">
            <Button size="large" onClick={toggleSelectAll} className="px-8">
              {selectedStudents.length === eligibleStudents.length
                ? "Deselect All"
                : "Select All"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateGeneration;
