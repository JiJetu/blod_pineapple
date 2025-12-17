import React, { useEffect, useState } from "react";
import { Input, Select, Upload, Button, message } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { useHeader } from "../../contexts/HeaderContext";

const Site = () => {
  const { setTitle, setDescription } = useHeader();
  const [activeTab, setActiveTab] = useState("award");

  useEffect(() => {
    setTitle("Site Settings");
    setDescription("Manage awards, years, factions, rooms and quantities");
  }, [setTitle, setDescription]);

  // States for lists
  const [awards, setAwards] = useState([
    { name: "Greenies", imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/030/565/701/small_2x/ai-generative-women-s-face-with-the-colorful-glowing-digital-light-lines-free-photo.JPG", number: "", relative: "" },
    { name: "Pinkies", imageUrl: null, number: "", relative: "" },
    { name: "Certificates", imageUrl: null, number: "", relative: "" },
    { name: "Bronze Badge", imageUrl: null, number: "", relative: "" },
    { name: "Silver Badge", imageUrl: null, number: "", relative: "" },
    { name: "Gold Badge", imageUrl: null, number: "", relative: "" },
    { name: "Bronze Medallion", imageUrl: null, number: "", relative: "" },
    { name: "Silver Medallion", imageUrl: null, number: "", relative: "" },
    { name: "Gold Medallion", imageUrl: null, number: "", relative: "" },
    { name: "Andrew Stuart Merit Award", imageUrl: null, number: "", relative: "" }
  ]);

  const [years, setYears] = useState(["Primary", "Kindergarten", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"]);
  const [factions, setFactions] = useState([
    { name: "Bilbies", imageUrl: null },
    { name: "Bandicoots", imageUrl: null },
    { name: "Wallabies", imageUrl: null },
    { name: "Numbats", imageUrl: null }
  ]);
  const [rooms, setRooms] = useState(["EC1", "EC2", "EC3", "EC4", "EC5", "Room 4", "Room 5", "Room 6", "Room 7"]);
  const [quantities, setQuantities] = useState(["1", "2", "6", "10", "12", "16", "18", "20", "22"]);

  // Form states
  const [awardName, setAwardName] = useState("");
  const [awardNumber, setAwardNumber] = useState("");
  const [relativeAward, setRelativeAward] = useState("");
  const [factionName, setFactionName] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [roomValue, setRoomValue] = useState("");
  const [quantityValue, setQuantityValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDelete = (item, tab) => {
    let itemName = typeof item === "string" ? item : item.name;
    switch (tab) {
      case "award":
        setAwards(awards.filter(a => a.name !== itemName));
        break;
      case "year":
        setYears(years.filter(y => y !== itemName));
        break;
      case "faction":
        setFactions(factions.filter(f => f.name !== itemName));
        break;
      case "room":
        setRooms(rooms.filter(r => r !== itemName));
        break;
      case "quantity":
        setQuantities(quantities.filter(q => q !== itemName));
        break;
    }
    console.log(`Delete ${tab}:`, itemName);
    // TODO: API call later
  };

  const handleCreate = () => {
    let imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;
    switch (activeTab) {
      case "award":
        if (!awardName) return message.error("Name is required");
        setAwards([...awards, { name: awardName, imageUrl, number: awardNumber, relative: relativeAward }]);
        setAwardName(""); setAwardNumber(""); setRelativeAward("");
        break;
      case "faction":
        if (!factionName) return message.error("Name is required");
        setFactions([...factions, { name: factionName, imageUrl }]);
        setFactionName("");
        break;
      case "year":
        if (!yearValue) return message.error("Year is required");
        setYears([...years, yearValue]);
        setYearValue("");
        break;
      case "room":
        if (!roomValue) return message.error("Room is required");
        setRooms([...rooms, roomValue]);
        setRoomValue("");
        break;
      case "quantity":
        if (!quantityValue) return message.error("Quantity is required");
        setQuantities([...quantities, quantityValue]);
        setQuantityValue("");
        break;
    }
    setSelectedFile(null);
    console.log("Created new item in", activeTab);
  };

  const uploadProps = {
    beforeUpload: (file) => {
      if (!file.type.startsWith("image/")) {
        message.error("You can only upload image files!");
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange: (info) => {
      if (info.file.originFileObj) {
        setSelectedFile(info.file.originFileObj);
        message.success(`${info.file.name} selected`);
      }
    },
    showUploadList: false,
  };

  const currentList = {
    award: awards,
    year: years,
    faction: factions,
    room: rooms,
    quantity: quantities,
  }[activeTab];

  return (
    <div className="bg-[#fbf9f7] min-h-screen p-6 roboto">
      <div>
        {/* Pill Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-10 shadow-sm">
          {["Award", "Year", "Faction", "Room", "Quantity"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`flex-1 py-1 px-6 rounded-full text-lg font-semibold transition-all ${
                activeTab === tab.toLowerCase()
                  ? "bg-[#5F0629] text-white shadow-md"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Create Form Card */}
        <div className="bg-white rounded-2xl shadow-md p-10 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {activeTab === "award" && "Award Create"}
            {activeTab === "year" && "Year Create"}
            {activeTab === "faction" && "Add new faction"}
            {activeTab === "room" && "Add new Room"}
            {activeTab === "quantity" && "Add Quantity"}
          </h2>

          <div className="space-y-8">
            {activeTab === "award" && (
              <>
                <div>
                  <label className="text-gray-700 font-medium mb-2 block">Name</label>
                  <Input placeholder="Name of award" className="h-12 rounded-lg" value={awardName} onChange={(e) => setAwardName(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-gray-700 font-medium mb-2 block">Number</label>
                    <Select placeholder="Select number" className="h-12 w-full" value={awardNumber} onChange={setAwardNumber}
                      options={quantities.map(q => ({ value: q, label: q }))} />
                  </div>
                  <div>
                    <label className="text-gray-700 font-medium mb-2 block">Relative award</label>
                    <Select placeholder="List of award" className="h-12 w-full" value={relativeAward} onChange={setRelativeAward}
                      options={awards.map(a => ({ value: a.name, label: a.name }))} />
                  </div>
                </div>
                <div>
                  <label className="text-gray-700 font-medium mb-4 block">Add award Icon</label>
                  <Upload.Dragger {...uploadProps} className="bg-[#f0f8ff]">
                    <div className="py-10 text-center">
                      <p className="text-xl font-medium text-gray-700 mb-4">Drag & drop here</p>
                      <p className="text-xl text-gray-500 mb-8">or</p>
                      <Button style={{ color: "#5F0629", borderColor: "#5F0629" }} className="px-8 text-lg rounded-lg">
                        Browse here
                      </Button>
                    </div>
                  </Upload.Dragger>
                </div>
              </>
            )}

            {(activeTab === "year" || activeTab === "room" || activeTab === "quantity") && (
              <div>
                <label className="text-gray-700 font-medium mb-2 block">
                  {activeTab === "year" ? "Year" : activeTab === "room" ? "Room" : "Quantity"}
                </label>
                <Input
                  placeholder={
                    activeTab === "year" ? "Enter year here" :
                    activeTab === "room" ? "Enter room number" :
                    "Enter quantity"
                  }
                  className="h-12 rounded-lg"
                  value={activeTab === "year" ? yearValue : activeTab === "room" ? roomValue : quantityValue}
                  onChange={(e) => {
                    if (activeTab === "year") setYearValue(e.target.value);
                    else if (activeTab === "room") setRoomValue(e.target.value);
                    else setQuantityValue(e.target.value);
                  }}
                />
              </div>
            )}

            {activeTab === "faction" && (
              <>
                <div>
                  <label className="text-gray-700 font-medium mb-2 block">Name</label>
                  <Input placeholder="Enter faction name" className="h-12 rounded-lg" value={factionName} onChange={(e) => setFactionName(e.target.value)} />
                </div>
                <div>
                  <label className="text-gray-700 font-medium mb-4 block">Add faction Logo</label>
                  <Upload.Dragger {...uploadProps} className="bg-[#f0f8ff]">
                    <div className="py-16 text-center">
                      <p className="text-2xl font-medium text-gray-700 mb-4">Drag & drop here</p>
                      <p className="text-xl text-gray-500 mb-8">or</p>
                      <Button className="h-12 px-12 text-lg rounded-lg" style={{ borderColor: "#5F0629", color: "#5F0629" }}>
                        Browse here
                      </Button>
                    </div>
                  </Upload.Dragger>
                </div>
              </>
            )}
          </div>

          <div className="text-right mt-12">
            <Button
              className="py-4 px-16 text-xl font-semibold rounded-md shadow-lg"
              style={{ background: "#5F0629", color: "white" }}
              onClick={handleCreate}
            >
              Create
            </Button>
          </div>
        </div>

        {/* List Card - Now matches the design perfectly */}
        <div className="bg-white rounded-2xl shadow-md p-10">
          <h2 className="text-xl font-bold text-gray-800 mb-8">
            {activeTab === "award" && "Award list"}
            {activeTab === "year" && "Year list"}
            {activeTab === "faction" && "Faction list"}
            {activeTab === "room" && "Room list"}
            {activeTab === "quantity" && "Quantity list"}
          </h2>

          <div className="flex flex-wrap gap-4">
            {currentList.map((item, index) => {
              const displayName = typeof item === "string" ? item : item.name;
              const imageUrl = typeof item === "string" ? null : item.imageUrl;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#e6f7ff] rounded-full px-5 py-3 shadow-sm hover:shadow transition-shadow min-w-[120px]"
                >
                  <span className="text-lg font-medium text-gray-800 flex items-center gap-3">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={displayName}
                        className="w-7 h-7 rounded-full object-cover border border-gray-300"
                      />
                    )}
                    {displayName}
                  </span>
                  <button
                    onClick={() => handleDelete(item, activeTab)}
                    className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <MinusCircleOutlined className="text-2xl" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Site;