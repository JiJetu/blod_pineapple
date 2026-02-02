import React, { useEffect, useState } from "react";
import { Select, Spin, message } from "antd";
import { ICONS } from "../../assets";
import { useHeader } from "../../contexts/HeaderContext";
import { useGetYearsQuery } from "../../redux/features/years/years.api";
import { useGetFactionStatsByYearQuery, useGetFactionStatsQuery } from "../../redux/features/factions/factions.api";

const { Option } = Select;

// Function to generate random colors for dynamic factions
const generateRandomColor = (index) => {
  const colors = [
    "#4CAF50", // Green
    "#FFC107", // Yellow/Amber
    "#2196F3", // Blue
    "#F44336", // Red
    "#9C27B0", // Purple
    "#FF5722", // Deep Orange
    "#00BCD4", // Cyan
    "#8BC34A", // Light Green
    "#FF9800", // Orange
    "#3F51B5", // Indigo
  ];
  return colors[index % colors.length];
};

// List of available icons for dynamic factions
const ICON_LIST = [
  ICONS.Bilbies,
  ICONS.Wallabies,
  ICONS.Bandicoots,
  ICONS.Numbats,
  // Add more icons if you have them
];

// Function to get icon for faction (round-robin assignment)
const getFactionIcon = (index) => {
  return ICON_LIST[index % ICON_LIST.length];
};

// Function to process API response and merge with static config
const processFactionData = (apiData, existingConfigs = {}) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((item, index) => {
    const factionName = item.faction?.name || `Faction ${index + 1}`;
    
    // Check if we have existing config for this faction (by name)
    const existingConfig = existingConfigs[factionName];
    
    return {
      id: item.faction?.id || index,
      name: factionName,
      totalAward: item.total_award || 0,
      studentCount: item.total_students || 0,
      bronze: item.Bronze || 0,
      silver: item.Silver || 0,
      gold: item.Gold || 0,
      logo: item.faction?.logo || null,
      // Use existing color if available, otherwise generate
      color: existingConfig?.color || generateRandomColor(index),
      // Use existing icon if available, otherwise assign from list
      icon: existingConfig?.icon || getFactionIcon(index),
    };
  });
};

const Faction = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [factions, setFactions] = useState([]);
  const { setTitle, setDescription } = useHeader();
  const [messageApi, contextHolder] = message.useMessage();

  // Get years list
  const { 
    data: yearsData, 
    isLoading: isLoadingYears,
    isError: isYearsError,
    error: yearsError 
  } = useGetYearsQuery();

  // Get faction stats (all years)
  const { 
    data: allFactionsData, 
    isLoading: isLoadingAllFactions,
    isError: isAllFactionsError,
    error: allFactionsError,
    refetch: refetchAllFactions 
  } = useGetFactionStatsQuery();

  // Get faction stats filtered by year
  const { 
    data: filteredFactionsData,
    isLoading: isLoadingFiltered,
    isError: isFilteredError,
    error: filteredError,
    refetch: refetchFiltered 
  } = useGetFactionStatsByYearQuery(selectedYear, {
    skip: !selectedYear,
  });

  useEffect(() => {
    setTitle("Faction Module");
    setDescription("View faction performance & leaderboard");
  }, [setTitle, setDescription]);

  // Process faction data when API response changes
  useEffect(() => {
    let factionData = [];
    let dataSource = null;

    // Determine which data to use
    if (selectedYear && filteredFactionsData) {
      console.log("Filtered factions data:", filteredFactionsData);
      dataSource = filteredFactionsData;
    } else if (!selectedYear && allFactionsData) {
      console.log("All factions data:", allFactionsData);
      dataSource = allFactionsData;
    }

    // Process the data if available
    if (dataSource && Array.isArray(dataSource)) {
      // First, create a map of existing faction configs to maintain consistency
      const existingConfigMap = {};
      factions.forEach(faction => {
        existingConfigMap[faction.name] = {
          color: faction.color,
          icon: faction.icon
        };
      });

      // Process new data
      factionData = processFactionData(dataSource, existingConfigMap);
      
      // Sort by total award (descending) for leaderboard
      factionData.sort((a, b) => b.totalAward - a.totalAward);
      
      setFactions(factionData);
    } else if (dataSource) {
      console.log("Unexpected data structure:", dataSource);
      setFactions([]);
    }
  }, [allFactionsData, filteredFactionsData, selectedYear]);

  // Handle year filter change
  const handleYearChange = (yearId) => {
    setSelectedYear(yearId);
  };

  // Process years data for dropdown
  const years = yearsData && Array.isArray(yearsData) 
    ? yearsData.map(year => ({
        id: year.id || year._id || year.year_id,
        name: year.name || year.year_name || year.year,
        is_active: year.is_active || false,
      })).filter(year => year.id && year.name)
    : [];

  // Calculate max total for progress bar scaling
  const maxTotal = factions.length > 0 
    ? Math.max(...factions.map((f) => f.totalAward))
    : 0;

  // Loading state
  const isLoading = isLoadingYears || (selectedYear ? isLoadingFiltered : isLoadingAllFactions);

  // Error state
  const isError = isYearsError || (selectedYear ? isFilteredError : isAllFactionsError);
  const error = yearsError || (selectedYear ? filteredError : allFactionsError);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 font-semibold mb-2">Failed to load faction data</p>
          <p className="text-red-500 text-sm">
            {error?.data?.message || error?.data?.detail || "Please check your connection and try again."}
          </p>
          <button 
            onClick={() => {
              if (selectedYear) {
                refetchFiltered();
              } else {
                refetchAllFactions();
              }
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
        <div>
          {/* Filter by Year */}
          <div className="mb-10 flex flex-col gap-4 p-5 bg-white rounded-2xl border border-[#777777] w-full">
            <p className="text-lg font-medium text-gray-700">Filter by Year</p>
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              className="w-full sm:w-64 h-11 border border-gray-300 rounded-md"
              placeholder="Select a year"
              allowClear
              loading={isLoadingYears}
            >
              <Option value={null}>All Years</Option>
              {years.map((year) => (
                <Option key={year.id} value={year.id}>
                  {year.name} {year.is_active && "(Active)"}
                </Option>
              ))}
            </Select>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-12">
            <h2 className="text-xl md:text-2xl font-medium mb-8 md:mb-10 flex items-center gap-4">
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
              </svg>
              Faction Leaderboard - {selectedYear ? years.find(y => y.id === selectedYear)?.name || selectedYear : "All Years"}
            </h2>

            {factions.length > 0 ? (
              <div className="space-y-8">
                {factions.map((faction, index) => {
                  const percentage = maxTotal > 0 ? (faction.totalAward / maxTotal) * 100 : 0;

                  return (
                    <div key={faction.id || index} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                      {/* Icon + Name */}
                      <div className="flex items-center gap-4 min-w-48">
                        <div className="w-12 h-12 flex items-center justify-center">
                          {faction.logo ? (
                            <img
                              src={faction.logo}
                              alt={faction.name}
                              className="w-12 h-12 object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                              }}
                            />
                          ) : null}
                          <img
                            src={faction.icon}
                            alt={faction.name}
                            className={`w-12 h-12 object-contain ${faction.logo ? 'hidden' : ''}`}
                          />
                        </div>
                        <span className="text-xl font-semibold text-gray-800">
                          {faction.name}
                        </span>
                      </div>

                      {/* Thin Progress Bar */}
                      <div className="flex-1 mx-0 md:mx-6">
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
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No faction data available</p>
              </div>
            )}
          </div>

          {/* Summary Cards */}
          {factions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {factions.map((faction, index) => (
                <div
                  key={faction.id || index}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                  style={{ borderTop: `8px solid ${faction.color}` }}
                >
                  <div className="p-4 md:p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      {faction.logo ? (
                        <img
                          src={faction.logo}
                          alt={faction.name}
                          className="w-16 h-16 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                      ) : null}
                      <img
                        src={faction.icon}
                        alt={faction.name}
                        className={`w-16 h-16 object-contain ${faction.logo ? 'hidden' : ''}`}
                      />
                    </div>
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
                          </svg>
                          Students
                        </span>
                        <span className="font-bold">{faction.studentCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Award</span>
                        <span className="font-bold text-base">
                          {faction.totalAward}
                        </span>
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
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">
                No faction data available for {selectedYear ? "the selected year" : "any year"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Faction;