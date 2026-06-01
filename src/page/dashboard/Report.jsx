import { useEffect, useState, useMemo } from "react";
import { Checkbox, Button, Spin } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { useHeader } from "../../contexts/HeaderContext";
import UploadReportModal from "../../components/dashboard/UploadReportModal";
import { useGetFactionStatsQuery, useGetFactionYearWiseStatsQuery } from "../../redux/features/factions/factions.api";
import { useDownloadStudentsByFactionMutation, useDownloadStudentsByYearMutation } from "../../redux/features/certificate/certificateApi";


const Report = () => {
  const [activeTab, setActiveTab] = useState("faction");
  const [checkedItems, setCheckedItems] = useState([]);
  const { setTitle, setDescription } = useHeader();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { data: factionStats = [], isLoading: isFactionLoading } = useGetFactionStatsQuery(undefined, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });
  const { data: yearStats = [], isLoading: isYearLoading } = useGetFactionYearWiseStatsQuery(undefined, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
    skip: activeTab !== "year",
  });
  const [downloadByFaction, { isLoading: isDownloadingFaction }] = useDownloadStudentsByFactionMutation();
  const [downloadByYear, { isLoading: isDownloadingYear }] = useDownloadStudentsByYearMutation();

  useEffect(() => {
    setTitle("Reports Module");
    setDescription("View & export detailed award reports");
  }, [setTitle, setDescription]);

  const toggleCheck = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id],
    );
  };

  const factionData = useMemo(() => {
    return (Array.isArray(factionStats) ? factionStats : []).map((item) => ({
      id: item?.faction?.id,
      name: item?.faction?.name || "Unknown",
      logo: item?.faction?.logo || null,
      totalStudents: item?.total_students ?? 0,
      totalAwards: item?.total_award ?? 0,
      Bronze: item?.Bronze ?? 0,
      Silver: item?.Silver ?? 0,
      Gold: item?.Gold ?? 0,
    }));
  }, [factionStats]);

  const yearData = useMemo(() => {
    return (Array.isArray(yearStats) ? yearStats : []).map((item) => ({
      id: item?.year?.id,
      name: item?.year?.name || "Unknown",
      totalStudents: item?.total_students ?? 0,
      totalAwards: item?.total_award ?? 0,
      Bronze: item?.Bronze ?? 0,
      Silver: item?.Silver ?? 0,
      Gold: item?.Gold ?? 0,
    }));
  }, [yearStats]);

  const data = activeTab === "faction" ? factionData : yearData;

  return (
    <div className="bg-[#fbf9f7] min-h-screen p-6 roboto">
      <div>
        {/* Top Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex justify-end md:items-center">
          <Button
            icon={<UploadOutlined />}
            onClick={() => setIsUploadModalOpen(true)}
            className="px-8 rounded-lg md:text-lg"
            style={{ background: "#5F0629", color: "white" }}
          >
            Upload
          </Button>
        </div>

        {/* Pill Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-8 shadow-sm">
          <button
            onClick={() => setActiveTab("faction")}
            className={`flex-1 py-0 px-8 rounded-full text-lg font-semibold transition-all ${
              activeTab === "faction"
                ? "bg-primary text-white shadow-md"
                : "text-primary"
            }`}
          >
            Faction
          </button>
          <button
            onClick={() => setActiveTab("year")}
            className={`flex-1 py-0 px-8 rounded-full text-lg font-semibold transition-all ${
              activeTab === "year"
                ? "bg-primary text-white shadow-md"
                : "text-primary"
            }`}
          >
            Year
          </button>
        </div>

        {/* Individual Cards */}
        {activeTab === "faction" ? (
          isFactionLoading ? (
            <div className="flex justify-center items-center py-24">
              <Spin size="large" />
            </div>
          ) : (
            <div className="space-y-6">
              {data.map((item) => {
                const isChecked = checkedItems.includes(item.id);
                const icon = item.logo;

                return (
                  <div
                    key={item.name}
                    className="bg-white rounded-2xl shadow-md p-8"
                  >
                    
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-6">
                        <Checkbox
                          checked={isChecked}
                          onChange={() => toggleCheck(item.id)}
                          disabled={isFactionLoading}
                        />
                        {icon && (
                          <img src={icon} alt={item.name} className="w-10 h-10" />
                        )}
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.name}
                        </h3>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          Total Student : {item.totalStudents}
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          Total award : {item.totalAwards}
                        </div>
                      </div>
                    </div>

                    
                    <div className="grid grid-cols-3 gap-x-24 gap-y-6 pl-16">
                      <div className="flex justify-between">
                        <span className="text-gray-600 w-32">Bronze</span>
                        <span className="font-bold text-gray-900">{item.Bronze}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 w-32">Silver</span>
                        <span className="font-bold text-gray-900">{item.Silver}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 w-32">Gold</span>
                        <span className="font-bold text-gray-900">{item.Gold}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : isYearLoading ? (
          <div className="flex justify-center items-center py-24">
            <Spin size="large" />
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((item) => {
              const isChecked = checkedItems.includes(item.id);
              return (
                <div
                  key={item.name}
                  className="bg-white rounded-2xl shadow-md p-8"
                >
                  
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-6">
                      <Checkbox
                        checked={isChecked}
                        onChange={() => toggleCheck(item.id)}
                        disabled={isYearLoading}
                      />
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.name}
                      </h3>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        Total Student : {item.totalStudents}
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        Total award : {item.totalAwards}
                      </div>
                    </div>
                  </div>

                  
                  <div className="grid grid-cols-3 gap-x-24 gap-y-6 pl-16">
                    <div className="flex justify-between">
                      <span className="text-gray-600 w-32">Bronze</span>
                      <span className="font-bold text-gray-900">{item.Bronze}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 w-32">Silver</span>
                      <span className="font-bold text-gray-900">{item.Silver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 w-32">Gold</span>
                      <span className="font-bold text-gray-900">{item.Gold}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Download Button */}
        <div className="text-center mt-12">
          <Button
            icon={<DownloadOutlined />}
            size="large"
            className="px-16 rounded-full text-lg font-semibold shadow-lg"
            style={{ background: "#5F0629", color: "white" }}
            disabled={(activeTab === "faction" && (checkedItems.length === 0 || isFactionLoading)) || (activeTab === "year" && (checkedItems.length === 0 || isYearLoading))}
            loading={isDownloadingFaction || isDownloadingYear}
            onClick={async () => {
              try {
                const blob = activeTab === "faction"
                  ? await downloadByFaction(checkedItems).unwrap()
                  : await downloadByYear(checkedItems).unwrap();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = activeTab === "faction" ? "students_by_faction.xlsx" : "students_by_year.xlsx";
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
              } catch (e) {
                console.error("Download failed", e);
              }
            }}
          >
            Download
          </Button>
        </div>
      </div>

      <UploadReportModal
        open={isUploadModalOpen}
        onCancel={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default Report;
