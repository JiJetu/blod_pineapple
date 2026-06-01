import { useEffect, useState, useMemo } from "react";
import { Select, Spin, message } from "antd";
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

  const { setTitle, setDescription } = useHeader();
  const [messageApi, contextHolder] = message.useMessage();

  const { getFactionColor } = useFactionColors();

  // API hooks
  const { data: yearsData, isLoading: isLoadingYears } = useGetYearsQuery();

  const { data: allFactionsData, isLoading: isLoadingAll } =
    useGetFactionStatsQuery(undefined, {
      skip: !!selectedYear,
    });

  const { data: filteredFactionsData, isLoading: isLoadingFiltered } =
    useGetFactionStatsByYearQuery(selectedYear, {
      skip: !selectedYear,
    });

  useEffect(() => {
    setTitle("Faction Module");
    setDescription("View faction performance & leaderboard");
  }, [setTitle, setDescription]);

  // Process data
  const factions = useMemo(() => {
    let rawData = [];

    if (selectedYear && filteredFactionsData) {
      rawData = filteredFactionsData;
    } else if (allFactionsData) {
      rawData = allFactionsData;
    }

    if (!Array.isArray(rawData)) {
      return [];
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
    return processed.sort((a, b) => b.totalAward - a.totalAward);
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                >
                  <path
                    d="M5 9.75V5H2.5V6.25C2.5 7.04167 2.72917 7.75542 3.1875 8.39125C3.64583 9.02708 4.25 9.48 5 9.75ZM17.5 9.75C18.25 9.47917 18.8542 9.02583 19.3125 8.39C19.7708 7.75417 20 7.04083 20 6.25V5H17.5V9.75ZM10 20V16.125C8.97917 15.8958 8.06792 15.4637 7.26625 14.8287C6.46458 14.1937 5.87583 13.3967 5.5 12.4375C3.9375 12.25 2.63042 11.5679 1.57875 10.3912C0.527083 9.21458 0.000833333 7.83417 0 6.25V5C0 4.3125 0.245 3.72417 0.735 3.235C1.225 2.74583 1.81333 2.50083 2.5 2.5H5C5 1.8125 5.245 1.22417 5.735 0.735C6.225 0.245833 6.81333 0.000833333 7.5 0H15C15.6875 0 16.2763 0.245 16.7663 0.735C17.2563 1.225 17.5008 1.81333 17.5 2.5H20C20.6875 2.5 21.2763 2.745 21.7663 3.235C22.2563 3.725 22.5008 4.31333 22.5 5V6.25C22.5 7.83333 21.9738 9.21375 20.9213 10.3912C19.8688 11.5687 18.5617 12.2508 17 12.4375C16.625 13.3958 16.0367 14.1929 15.235 14.8287C14.4333 15.4646 13.5217 15.8967 12.5 16.125V20H16.25C16.6042 20 16.9013 20.12 17.1413 20.36C17.3813 20.6 17.5008 20.8967 17.5 21.25C17.4992 21.6033 17.3792 21.9004 17.14 22.1412C16.9008 22.3821 16.6042 22.5017 16.25 22.5H6.25C5.89583 22.5 5.59917 22.38 5.36 22.14C5.12083 21.9 5.00083 21.6033 5 21.25C4.99917 20.8967 5.11917 20.6 5.36 20.36C5.60083 20.12 5.8975 20 6.25 20H10Z"
                    fill="#F1B31C"
                  />
                </svg>
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
