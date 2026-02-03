import React, { useEffect, useMemo } from "react";
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
import { Spin } from "antd";
import { useHeader } from "../../contexts/HeaderContext";
import { useFactionColors } from "../../hooks/useFactionColors";
import { useGetDashboardStatsQuery } from "../../redux/features/dashboard/dashboardApi";


const Dashboard = () => {
  const { setTitle, setDescription } = useHeader();
  const { getFactionColor } = useFactionColors();

  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  useEffect(() => {
    setTitle("Analytics");
    setDescription("");
  }, [setTitle, setDescription]);

  // Stats values
  const totalStudents = stats?.total_students || 0;
  const totalAwards = stats?.total_awards_given || 0;
  const availableCertificates = stats?.available_certificates || 0;

  // Year-wise awards (Line Chart) — no color needed
  const yearWiseAwards = useMemo(() => {
    return (stats?.year_wise_total_award || []).map((item) => ({
      year: item.year || "Unknown",
      awards: item.total_awards || 0,
    }));
  }, [stats]);

  // Create a normalized faction map (key = faction name) with consistent color
  const factionMap = useMemo(() => {
    const map = {};

    // Process award percentage data
    (stats?.faction_wise_total_award_in_percentage || []).forEach((item) => {
      const name = item.faction || "Unknown";
      if (!map[name]) {
        map[name] = {
          name,
          total_awards: 0,
          percentage: 0,
          color: getFactionColor(name),
        };
      }
      map[name].total_awards = item.total_awards || 0;
      map[name].percentage = item.percentage || 0;
    });

    // Merge student count & logo
    (stats?.faction_wise_total_student || []).forEach((item) => {
      const name = item.faction || "Unknown";
      if (!map[name]) {
        map[name] = {
          name,
          total_awards: 0,
          percentage: 0,
          color: getFactionColor(name),
        };
      }
      map[name].total_students = item.total_students || 0;
      map[name].logo = item.logo || null;
    });

    return map;
  }, [stats, getFactionColor]);

  // Pie chart data — derived from map (consistent colors)
  const factionWiseAwards = useMemo(() => {
    return Object.values(factionMap).map((f) => ({
      name: f.name,
      value: f.total_awards,
      color: f.color,
    }));
  }, [factionMap]);

  // Summary cards data — also from map (same colors)
  const factionSummary = useMemo(() => {
    return Object.values(factionMap).map((f) => ({
      name: f.name,
      points: f.total_awards,
      color: f.color,
      logo: f.logo,
      total_students: f.total_students || 0,
    }));
  }, [factionMap]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 roboto">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between border border-primary">
          <div>
            <p className="text-gray-600 font-medium">Total Student</p>
            <h2 className="text-4xl font-bold text-primary mt-3">{totalStudents}</h2>
          </div>
          <PiStudentBold className="text-[#5F0629] text-5xl" />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between border border-primary">
          <div>
            <p className="text-gray-600 font-medium">Total Award</p>
            <h2 className="text-4xl font-bold text-primary mt-3">{totalAwards}</h2>
          </div>
          <TbAwardFilled className="text-[#5F0629] text-5xl" />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between border border-primary">
          <div>
            <p className="text-gray-600 font-medium">Available Certificate</p>
            <h2 className="text-4xl font-bold text-primary mt-3">{availableCertificates}</h2>
          </div>
          <TbCertificate className="text-[#5F0629] text-5xl" />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Year Wise Award */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Year wise award</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={yearWiseAwards}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="awards" stroke="#5F0629" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Faction Wise Award */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Faction wise award</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={factionWiseAwards}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
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
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Faction Summary</h3>
        <div className="space-y-4">
          {factionSummary.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex justify-center items-center">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-lg font-bold text-black">
                    {index + 1}
                  </div>
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="font-medium text-gray-800">{item.name}</span>
              </div>
              <div className="flex-1 mx-4">
                <div className="h-1 bg-gray-200 rounded">
                  <div
                    className="h-1 rounded"
                    style={{
                      width: `${item.points > 0 ? (item.points / Math.max(...factionSummary.map(f => f.points || 1))) * 100 : 0}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
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