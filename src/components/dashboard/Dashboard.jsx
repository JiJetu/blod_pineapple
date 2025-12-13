import { PiStudentBold } from "react-icons/pi";
import { TbCertificate } from "react-icons/tb";
import { TbAwardFilled } from "react-icons/tb";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { useEffect } from "react";
import { useHeader } from "../../contexts/HeaderContext";
import { ICONS } from "../../assets";

const Dashboard = ({ data }) => {
  const { setTitle, setDescription } = useHeader();

  useEffect(() => {
    setTitle("Analytics");
    setDescription("");
  }, [setTitle, setDescription]);

  const {
    totalStudents = 1200,
    totalAwards = 120,
    availableCertificates = 3200,
    yearWiseAwards = [
      { year: "2023", awards: 400 },
      { year: "2024", awards: 450 },
      { year: "2025", awards: 300 },
    ],
    factionWiseAwards = [
      { name: "Bilbies", value: 1025, color: "#4CAF50" }, // Green
      { name: "Bandicoots", value: 1025, color: "#2196F3" }, // Blue
      { name: "Wallabies", value: 1025, color: "#FFC107" }, // Yellow
      { name: "Numbats", value: 1025, color: "#F44336" }, // Red
    ],
    factionSummary = [
      {
        rank: 1,
        icon: ICONS.Bilbies,
        name: "Bilbies",
        points: 1025,
        color: "#4CAF50",
      },
      {
        rank: 2,
        icon: ICONS.Bandicoots,
        name: "Bandicoots",
        points: 1025,
        color: "#2196F3",
      },
      {
        rank: 3,
        icon: ICONS.Wallabies,
        name: "Wallabies",
        points: 1025,
        color: "#FFC107",
      },
      {
        rank: 4,
        icon: ICONS.Numbats,
        name: "Numbats",
        points: 1025,
        color: "#F44336",
      },
    ],
  } = data || {};

  return (
    <div className="p-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between border border-primary">
          <div>
            <p className="text-gray-600 font-medium">Total Student</p>
            <h2 className="text-4xl font-bold text-primary mt-3">
              {totalStudents}
            </h2>
          </div>
          <PiStudentBold className="text-[#5F0629] text-5xl" />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between border border-primary">
          <div>
            <p className="text-gray-600 font-medium">Total Award</p>
            <h2 className="text-4xl font-bold text-primary mt-3">
              {totalAwards}
            </h2>
          </div>
          <TbAwardFilled className="text-[#5F0629] text-5xl" />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between border border-primary">
          <div>
            <p className="text-gray-600 font-medium">Available Certificate</p>
            <h2 className="text-4xl font-bold text-primary mt-3">
              {availableCertificates}
            </h2>
          </div>
          <TbCertificate className="text-[#5F0629] text-5xl" />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Year Wise Award - Line Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Year wise award
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={yearWiseAwards}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="awards"
                stroke="#5F0629"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Faction Wise Award - Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Faction wise award
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={factionWiseAwards}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {factionWiseAwards.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Faction Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Faction Summary
        </h3>
        <div className="space-y-4">
          {factionSummary.map((item) => (
            <div key={item.rank} className="flex items-center">
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex justify-center items-center">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-lg font-bold text-black"
                    //   style={{ backgroundColor: item.color }}
                  >
                    {item.rank}
                  </div>
                  <img
                    className="w-6 h-6 rounded-full flex items-center justify-center text-lg font-bold text-white"
                    style={{ backgroundColor: item.color }}
                    src={item.icon}
                  />
                </div>

                <span className="font-medium text-gray-800">{item.name}</span>
              </div>
              <div className="flex-1 mx-4">
                <div
                  className="h-1"
                  style={{ backgroundColor: item.color }}
                ></div>
              </div>
              <span className="font-medium text-gray-800 flex-shrink-0">
                {item.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
