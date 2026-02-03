import React, { useEffect, useState } from "react";
import { Select, Spin, message } from "antd";
import { ICONS } from "../../assets";
import { useHeader } from "../../contexts/HeaderContext";
import { useGetYearsQuery } from "../../redux/features/years/years.api";
import {
  useGetFactionStatsQuery,
  useGetFactionStatsByYearQuery,
} from "../../redux/features/factions/factions.api";
import { useFactionColors } from "../../hooks/useFactionColors";

const { Option } = Select;

const Faction = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [factions, setFactions] = useState([]);

  const { setTitle, setDescription } = useHeader();
  const [messageApi, contextHolder] = message.useMessage();

  const { getFactionColor } = useFactionColors();

  // API hooks
  const { data: yearsData, isLoading: isLoadingYears } = useGetYearsQuery();

  const { data: allFactionsData, isLoading: isLoadingAll } =
    useGetFactionStatsQuery();

  const { data: filteredFactionsData, isLoading: isLoadingFiltered } =
    useGetFactionStatsByYearQuery(selectedYear, {
      skip: !selectedYear,
    });
  
  useEffect(() => {
    setTitle("Faction Module");
    setDescription("View faction performance & leaderboard");
  }, [setTitle, setDescription]);

  // Process data
  useEffect(() => {
    let rawData = [];

    if (selectedYear && filteredFactionsData) {
      rawData = filteredFactionsData;
    } else if (allFactionsData) {
      rawData = allFactionsData;
    }

    if (!Array.isArray(rawData)) {
      setFactions([]);
      return;
    }

    const processed = rawData.map((item, index) => {
      const factionName = item.faction?.name || `Faction ${index + 1}`;

      return {
        id: item.faction?.id || index,
        name: factionName,
        totalAward: item.total_award || 0,
        studentCount: item.total_students || 0,
        bronze: item.Bronze || 0,
        silver: item.Silver || 0,
        gold: item.Gold || 0,
        logo: item.faction?.logo || null,
        color: getFactionColor(factionName),
      };
    });

    // Sort by total award descending
    processed.sort((a, b) => b.totalAward - a.totalAward);

    setFactions(processed);
  }, [allFactionsData, filteredFactionsData, selectedYear, getFactionColor]);

  const handleYearChange = (yearId) => {
    setSelectedYear(yearId);
  };

  const years =
    yearsData
      ?.map((y) => ({
        id: y.id || y.year_id || y._id,
        name: y.name || y.year_name || y.year,
        is_active: y.is_active || false,
      }))
      .filter(Boolean) || [];

  const maxTotal =
    factions.length > 0 ? Math.max(...factions.map((f) => f.totalAward)) : 1;

  const isLoading =
    isLoadingYears || (selectedYear ? isLoadingFiltered : isLoadingAll);

  return (
    <>
      {contextHolder}
      <div className="bg-[#fbf9f7] min-h-screen p-6 roboto">
        {/* Filter */}
        <div className="mb-10 flex flex-col gap-4 p-5 bg-white rounded-2xl border border-[#777777]">
          <p className="text-lg font-medium text-gray-700">Filter by Year</p>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            className="w-full sm:w-64 h-11"
            placeholder="Select Year"
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

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : factions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">
            <p className="text-gray-500">No faction data available</p>
          </div>
        ) : (
          <>
            {/* Leaderboard */}
            <div className="bg-white rounded-2xl shadow-md p-10 mb-12">
              <h2 className="text-2xl font-medium mb-10 flex items-center gap-4">
                <svg /* your trophy SVG */ />
                Faction Leaderboard{" "}
                {selectedYear &&
                  ` - ${years.find((y) => y.id === selectedYear)?.name || selectedYear}`}
              </h2>

              <div className="space-y-8">
                {factions.map((faction) => {
                  const percentage =
                    maxTotal > 0 ? (faction.totalAward / maxTotal) * 100 : 0;

                  return (
                    <div key={faction.id} className="flex items-center gap-6">
                      <div className="flex items-center gap-4 min-w-48">
                        {faction.logo ? (
                          <img
                            src={faction.logo}
                            alt={faction.name}
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                            style={{ backgroundColor: faction.color }}
                          >
                            {faction.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-xl font-semibold">
                          {faction.name}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: faction.color,
                            }}
                          />
                        </div>
                      </div>

                      <div className="w-32 text-right">
                        <div className="text-2xl font-bold">
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
                  key={faction.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                  style={{ borderTop: `8px solid ${faction.color}` }}
                >
                  <div className="p-6 text-center">
                    {faction.logo ? (
                      <img
                        src={faction.logo}
                        alt={faction.name}
                        className="w-16 h-16 mx-auto mb-4 object-contain"
                      />
                    ) : (
                      <div
                        className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                        style={{ backgroundColor: faction.color }}
                      >
                        {faction.name.charAt(0)}
                      </div>
                    )}

                    <h3 className="text-xl font-bold mb-6">{faction.name}</h3>

                    <div className="space-y-4 text-left">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Students</span>
                        <span className="font-bold">
                          {faction.studentCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Award</span>
                        <span className="font-bold">{faction.totalAward}</span>
                      </div>
                      <hr className="my-4" />
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Bronze</span>
                          <span>{faction.bronze}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Silver</span>
                          <span>{faction.silver}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gold</span>
                          <span>{faction.gold}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Faction;
