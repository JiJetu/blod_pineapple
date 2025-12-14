import React, { useState } from "react";
import { Select } from "antd";
import { ICONS } from "../../assets";

const { Option } = Select;

// === STATIC FACTION CONFIGURATION ===
// Colors and icons are fixed forever – defined once here
const FACTION_CONFIG = [
  {
    name: "Bilbies",
    icon: ICONS.Bilbies,
    color: "#4CAF50", // Green
  },
  {
    name: "Wallabies",
    icon: ICONS.Wallabies,
    color: "#FFC107", // Yellow/Amber
  },
  {
    name: "Bandicoots",
    icon: ICONS.Bandicoots,
    color: "#2196F3", // Blue
  },
  {
    name: "Numbats",
    icon: ICONS.Numbats,
    color: "#F44336", // Red
  },
];

// Sample data (replace with real API data later)
const getFactionData = (year) => [
  {
    name: "Bilbies",
    totalAward: 120,
    studentCount: 26,
    bronze: 103,
    silver: 16,
    gold: 1,
  },
  {
    name: "Wallabies",
    totalAward: 120,
    studentCount: 26,
    bronze: 103,
    silver: 16,
    gold: 1,
  },
  {
    name: "Bandicoots",
    totalAward: 120,
    studentCount: 26,
    bronze: 103,
    silver: 16,
    gold: 1,
  },
  {
    name: "Numbats",
    totalAward: 120,
    studentCount: 26,
    bronze: 103,
    silver: 16,
    gold: 1,
  },
];

const years = ["2023", "2024", "2025", "2026"];

const Faction = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const factionData = getFactionData(selectedYear);

  // Merge static config with dynamic data
  const factions = FACTION_CONFIG.map((config) => ({
    ...config,
    ...(factionData.find((d) => d.name === config.name) || {}),
  }));

  // Calculate max total for progress bar scaling
  const maxTotal = Math.max(...factions.map((f) => f.totalAward));

  return (
    <div className="bg-[#fbf9f7] min-h-screen p-6 roboto">
      <div>
        {/* Filter by Year */}
        <div className="mb-10 flex flex-col gap-4 p-5 bg-white rounded-2xl border border-[#777777] w-full">
          <p className="text-lg font-medium text-gray-700">Filter by Year</p>
          <Select
            value={selectedYear}
            onChange={setSelectedYear}
            className="w-1/3 h-8 border border-gray-300 rounded-md"
          >
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl shadow-md p-10 mb-12">
          <h2 className="text-xl font-medium mb-10 flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M8.75 13.5V8.75H6.25V10C6.25 10.7917 6.47917 11.5054 6.9375 12.1413C7.39583 12.7771 8 13.23 8.75 13.5ZM21.25 13.5C22 13.2292 22.6042 12.7758 23.0625 12.14C23.5208 11.5042 23.75 10.7908 23.75 10V8.75H21.25V13.5ZM13.75 23.75V19.875C12.7292 19.6458 11.8179 19.2137 11.0163 18.5787C10.2146 17.9437 9.62583 17.1467 9.25 16.1875C7.6875 16 6.38042 15.3179 5.32875 14.1412C4.27708 12.9646 3.75083 11.5842 3.75 10V8.75C3.75 8.0625 3.995 7.47417 4.485 6.985C4.975 6.49583 5.56333 6.25083 6.25 6.25H8.75C8.75 5.5625 8.995 4.97417 9.485 4.485C9.975 3.99583 10.5633 3.75083 11.25 3.75H18.75C19.4375 3.75 20.0263 3.995 20.5163 4.485C21.0063 4.975 21.2508 5.56333 21.25 6.25H23.75C24.4375 6.25 25.0263 6.495 25.5163 6.985C26.0063 7.475 26.2508 8.06333 26.25 8.75V10C26.25 11.5833 25.7238 12.9637 24.6713 14.1412C23.6188 15.3187 22.3117 16.0008 20.75 16.1875C20.375 17.1458 19.7867 17.9429 18.985 18.5787C18.1833 19.2146 17.2717 19.6467 16.25 19.875V23.75H20C20.3542 23.75 20.6513 23.87 20.8913 24.11C21.1313 24.35 21.2508 24.6467 21.25 25C21.2492 25.3533 21.1292 25.6504 20.89 25.8912C20.6508 26.1321 20.3542 26.2517 20 26.25H10C9.64583 26.25 9.34917 26.13 9.11 25.89C8.87083 25.65 8.75083 25.3533 8.75 25C8.74917 24.6467 8.86917 24.35 9.11 24.11C9.35083 23.87 9.6475 23.75 10 23.75H13.75Z"
                fill="#F1B31C"
              />
            </svg>{" "}
            Faction Leaderboard - {selectedYear}
          </h2>

          <div className="space-y-8">
            {factions.map((faction) => {
              const percentage =
                maxTotal > 0 ? (faction.totalAward / maxTotal) * 100 : 0;

              return (
                <div key={faction.name} className="flex items-center gap-6">
                  {/* Icon + Name */}
                  <div className="flex items-center gap-4 min-w-48">
                    <img
                      src={faction.icon}
                      alt={faction.name}
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-xl font-semibold text-gray-800">
                      {faction.name}
                    </span>
                  </div>

                  {/* Thin Progress Bar (same as Dashboard) */}
                  <div className="flex-1 mx-6">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: faction.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Total Award */}
                  <div className="w-32 text-right">
                    <div className="text-xl font-bold text-gray-800">
                      {faction.totalAward}
                    </div>
                    <div className="text-sm text-gray-600">Total Award</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {factions.map((faction) => (
            <div
              key={faction.name}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
              style={{ borderTop: `8px solid ${faction.color}` }}
            >
              <div className="p-6 text-center">
                <img
                  src={faction.icon}
                  alt={faction.name}
                  className="w-16 h-16 mx-auto mb-4 object-contain"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  {faction.name}
                </h3>

                <div className="space-y-4 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M13.333 6.6665C13.333 8.50817 11.8413 9.99984 9.99967 9.99984C8.15801 9.99984 6.66634 8.50817 6.66634 6.6665L6.75801 5.88317L4.16634 4.58317L9.99967 1.6665L15.833 4.58317V8.74984H14.9997V4.99984L13.2413 5.88317L13.333 6.6665ZM9.99967 11.6665C13.683 11.6665 16.6663 13.1582 16.6663 14.9998V16.6665H3.33301V14.9998C3.33301 13.1582 6.31634 11.6665 9.99967 11.6665Z"
                          fill="black"
                        />
                      </svg>{" "}
                      Student
                    </span>
                    <span className="font-bold">{faction.studentCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Award</span>
                    <span className="font-bold text-base">{faction.totalAward}</span>
                  </div>

                  <hr className="my-4 border-gray-200" />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bronze</span>
                      <span className="font-medium">{faction.bronze}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Silver</span>
                      <span className="font-medium">{faction.silver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gold</span>
                      <span className="font-medium">{faction.gold}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faction;
