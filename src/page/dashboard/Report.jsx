import React, { useEffect, useState } from "react";
import { Select, Checkbox, Button } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { ICONS } from "../../assets";
import { useHeader } from "../../contexts/HeaderContext";
import UploadReportModal from "../../components/dashboard/UploadReportModal";

const years = ["2023", "2024", "2025", "2026"];

const FACTION_ICONS = {
  Bilbies: ICONS.Bilbies,
  Bandicoots: ICONS.Bandicoots,
  Wallabies: ICONS.Wallabies,
  Numbats: ICONS.Numbats,
};

const factionData = [
  {
    name: "Bilbies",
    totalStudents: 20,
    totalAwards: 34,
    pinky: 245,
    certificate: 16,
    bronze: 1,
    silver: 103,
    gold: 16,
    goldMetal: 1,
    bronzeMedallion: 103,
    silverMedallion: 16,
    goldMedallion: 1,
  },
  {
    name: "Bandicoots",
    totalStudents: 20,
    totalAwards: 34,
    pinky: 245,
    certificate: 16,
    bronze: 1,
    silver: 103,
    gold: 16,
    goldMetal: 1,
    bronzeMedallion: 103,
    silverMedallion: 16,
    goldMedallion: 1,
  },
  {
    name: "Wallabies",
    totalStudents: 20,
    totalAwards: 34,
    pinky: 245,
    certificate: 16,
    bronze: 1,
    silver: 103,
    gold: 16,
    goldMetal: 1,
    bronzeMedallion: 103,
    silverMedallion: 16,
    goldMedallion: 1,
  },
  {
    name: "Numbats",
    totalStudents: 20,
    totalAwards: 34,
    pinky: 245,
    certificate: 16,
    bronze: 1,
    silver: 103,
    gold: 16,
    goldMetal: 1,
    bronzeMedallion: 103,
    silverMedallion: 16,
    goldMedallion: 1,
  },
];

const yearData = [
  {
    name: "Year 1",
    totalStudents: 20,
    totalAwards: 34,
    pinky: 25,
    certificate: 16,
    bronze: 1,
    silver: 103,
    gold: 16,
    goldMetal: 1,
    bronzeMedallion: 103,
    silverMedallion: 16,
    goldMedallion: 1,
  },
  {
    name: "Year 2",
    totalStudents: 20,
    totalAwards: 34,
    pinky: 245,
    certificate: 16,
    bronze: 1,
    silver: 103,
    gold: 16,
    goldMetal: 1,
    bronzeMedallion: 103,
    silverMedallion: 16,
    goldMedallion: 1,
  },
  {
    name: "Year 3",
    totalStudents: 20,
    totalAwards: 34,
    pinky: 245,
    certificate: 16,
    bronze: 1,
    silver: 103,
    gold: 16,
    goldMetal: 1,
    bronzeMedallion: 103,
    silverMedallion: 16,
    goldMedallion: 1,
  },
  {
    name: "Year 4",
    totalStudents: 20,
    totalAwards: 34,
    pinky: 245,
    certificate: 16,
    bronze: 1,
    silver: 103,
    gold: 16,
    goldMetal: 1,
    bronzeMedallion: 103,
    silverMedallion: 16,
    goldMedallion: 1,
  },
];

const Report = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [activeTab, setActiveTab] = useState("faction");
  const [checkedItems, setCheckedItems] = useState([]);
  const { setTitle, setDescription } = useHeader();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    setTitle("Reports Module");
    setDescription("View & export detailed award reports");
  }, [setTitle, setDescription]);

  const toggleCheck = (name) => {
    setCheckedItems((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const data = activeTab === "faction" ? factionData : yearData;

  return (
    <div className="bg-[#fbf9f7] min-h-screen p-6 roboto">
      <div>
        {/* Top Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex gap-4 justify-between md:items-center">
          <div className="flex flex-col gap-4 w-full">
            <span className="text-gray-700 font-medium md:text-lg">
              Filter by Year
            </span>
            <Select
              value={selectedYear}
              onChange={setSelectedYear}
              className="md:w-1/3"
            >
              {years.map((y) => (
                <Select.Option key={y} value={y}>
                  {y}
                </Select.Option>
              ))}
            </Select>
          </div>
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
                ? "bg-[#5F0629] text-white shadow-md"
                : "text-gray-600"
            }`}
          >
            Faction
          </button>
          <button
            onClick={() => setActiveTab("year")}
            className={`flex-1 py-0 px-8 rounded-full text-lg font-semibold transition-all ${
              activeTab === "year"
                ? "bg-[#5F0629] text-white shadow-md"
                : "text-gray-600"
            }`}
          >
            Year
          </button>
        </div>

        {/* Individual Cards */}
        <div className="space-y-6">
          {data.map((item) => {
            const isChecked = checkedItems.includes(item.name);
            const icon =
              activeTab === "faction" ? FACTION_ICONS[item.name] : null;

            return (
              <div
                key={item.name}
                className="bg-white rounded-2xl shadow-md p-8"
              >
                {/* Header: Icon/Name + Totals */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-6">
                    <Checkbox
                      checked={isChecked}
                      onChange={() => toggleCheck(item.name)}
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

                {/* 3-Column Award Grid */}
                <div className="grid grid-cols-3 gap-x-24 gap-y-6 pl-16">
                  {" "}
                  {/* pl-16 to align with name */}
                  {/* Row 1 */}
                  <div className="flex justify-between">
                    <span className="text-gray-600 w-32">Pinky</span>
                    <span className="font-bold text-gray-900">
                      {item.pinky}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 w-32">Silver</span>
                    <span className="font-bold text-gray-900">
                      {item.silver}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#CD7F32] w-40">
                      Bronze Medallion
                    </span>
                    <span className="font-bold text-gray-900">
                      {item.bronzeMedallion}
                    </span>
                  </div>
                  {/* Row 2 */}
                  <div className="flex justify-between">
                    <span className="text-gray-600 w-32">Certificate</span>
                    <span className="font-bold text-gray-900">
                      {item.certificate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 w-32">Gold</span>
                    <span className="font-bold text-gray-900">{item.gold}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#C0C0C0] w-40">
                      Silver Medallion
                    </span>
                    <span className="font-bold text-gray-900">
                      {item.silverMedallion}
                    </span>
                  </div>
                  {/* Row 3 */}
                  <div className="flex justify-between">
                    <span className="text-gray-600 w-32">Bronze</span>
                    <span className="font-bold text-gray-900">
                      {item.bronze}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 w-32">Gold Metal</span>
                    <span className="font-bold text-gray-900">
                      {item.goldMetal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-[#FFD700] w-40">
                      Gold Medallion
                    </span>
                    <span className="font-bold text-gray-900">
                      {item.goldMedallion}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Download Button */}
        <div className="text-center mt-12">
          <Button
            icon={<DownloadOutlined />}
            size="large"
            className="px-16 rounded-full text-lg font-semibold shadow-lg"
            style={{ background: "#5F0629", color: "white" }}
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
