import { Input } from "antd";
import UploadArea from "./UploadArea";

const FactionForm = ({
  factionName,
  setFactionName,
  selectedFile,
  previewUrl,
  handleFileUpload,
  removeSelectedFile,
}) => {
  return (
    <>
      <div>
        <label className="text-gray-700 font-medium mb-2 block text-sm sm:text-base">
          Name
        </label>
        <Input
          placeholder="Enter faction name"
          className="h-11 sm:h-12 rounded-lg text-sm sm:text-base"
          value={factionName}
          onChange={(e) => setFactionName(e.target.value)}
        />
      </div>
      <div>
        <label className="text-gray-700 font-medium mb-4 block text-sm sm:text-base">
          Add faction Logo
        </label>
        <UploadArea
          type="logo"
          selectedFile={selectedFile}
          previewUrl={previewUrl}
          onFileUpload={handleFileUpload}
          onRemoveFile={removeSelectedFile}
        />
      </div>
    </>
  );
};

export default FactionForm;