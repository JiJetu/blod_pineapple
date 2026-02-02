import { Button } from "antd";
import AwardForm from "./AwardForm";
import FactionForm from "./FactionForm";
import SimpleForm from "./SimpleForm";

const CreateFormCard = ({
  activeTab,
  formData,
  formHandlers,
  fileHandlers,
  awards,
  handleCreate,
}) => {
  const getTitle = () => {
    switch (activeTab) {
      case "award": return "Award Create";
      case "year": return "Year Create";
      case "faction": return "Add new faction";
      case "room": return "Add new Room";
      case "quantity": return "Add Quantity";
      default: return "";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 mb-10">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">
        {getTitle()}
      </h2>

      <div className="space-y-6 sm:space-y-8">
        {activeTab === "award" && (
          <AwardForm
            awardName={formData.awardName}
            setAwardName={formHandlers.setAwardName}
            awardNumber={formData.awardNumber}
            setAwardNumber={formHandlers.setAwardNumber}
            relativeAwardId={formData.relativeAwardId}
            handleRelativeAwardChange={formHandlers.handleRelativeAwardChange}
            selectedFile={fileHandlers.selectedFile}
            previewUrl={fileHandlers.previewUrl}
            handleFileUpload={fileHandlers.handleFileUpload}
            removeSelectedFile={fileHandlers.removeSelectedFile}
            awards={awards}
          />
        )}

        {(activeTab === "year" || activeTab === "room" || activeTab === "quantity") && (
          <SimpleForm
            activeTab={activeTab}
            yearValue={formData.yearValue}
            setYearValue={formHandlers.setYearValue}
            roomValue={formData.roomValue}
            setRoomValue={formHandlers.setRoomValue}
            quantityValue={formData.quantityValue}
            setQuantityValue={formHandlers.setQuantityValue}
          />
        )}

        {activeTab === "faction" && (
          <FactionForm
            factionName={formData.factionName}
            setFactionName={formHandlers.setFactionName}
            selectedFile={fileHandlers.selectedFile}
            previewUrl={fileHandlers.previewUrl}
            handleFileUpload={fileHandlers.handleFileUpload}
            removeSelectedFile={fileHandlers.removeSelectedFile}
          />
        )}
      </div>

      <div className="text-right mt-10">
        <Button
          className="w-full sm:w-auto py-3 sm:py-4 px-12 sm:px-16 text-lg sm:text-xl font-semibold rounded-md shadow-lg"
          style={{ background: "#5F0629", color: "white" }}
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateFormCard;