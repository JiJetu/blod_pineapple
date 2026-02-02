const PillTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["Award", "Year", "Faction", "Room", "Quantity"];
  
  return (
    <div className="flex flex-wrap bg-gray-100 rounded-full p-1 mb-8 shadow-sm gap-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab.toLowerCase())}
          className={`flex-1 min-w-[80px] py-2 px-3 text-sm sm:text-lg font-semibold rounded-full transition-all ${
            activeTab === tab.toLowerCase()
              ? "bg-[#5F0629] text-white shadow-md"
              : "text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default PillTabs;