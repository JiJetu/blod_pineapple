import { Input, Select } from "antd";
import UploadArea from "./UploadArea";

const AwardForm = ({
  awardName,
  setAwardName,
  awardNumber,
  setAwardNumber,
  relativeAwardId,
  handleRelativeAwardChange,
  selectedFile,
  previewUrl,
  handleFileUpload,
  removeSelectedFile,
  awards,
}) => {
  const relativeAwardOptions = [
    { value: null, label: "None" },
    ...awards.map((a) => ({
      value: a.id,
      label: a.name,
    }))
  ];

  return (
    <>
      <div>
        <label className="text-gray-700 font-medium mb-2 block text-sm sm:text-base">
          Name
        </label>
        <Input
          placeholder="Name of award"
          className="h-11 sm:h-12 rounded-lg text-sm sm:text-base"
          value={awardName}
          onChange={(e) => setAwardName(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div>
          <label className="text-gray-700 font-medium mb-2 block text-sm sm:text-base">
            Number
          </label>
          <Input
            placeholder="Enter award number"
            className="h-11 sm:h-12 rounded-lg text-sm sm:text-base"
            value={awardNumber}
            onChange={(e) => setAwardNumber(e.target.value)}
            disabled={!relativeAwardId}
          />
        </div>
        <div>
          <label className="text-gray-700 font-medium mb-2 block text-sm sm:text-base">
            Relative award
          </label>
          <Select
            placeholder="Select relative award"
            className="h-11 sm:h-12 w-full"
            value={relativeAwardId}
            onChange={handleRelativeAwardChange}
            options={relativeAwardOptions}
          />
        </div>
      </div>
      <div>
        <label className="text-gray-700 font-medium mb-4 block text-sm sm:text-base">
          Add award Icon
        </label>
        <UploadArea
          type="icon"
          selectedFile={selectedFile}
          previewUrl={previewUrl}
          onFileUpload={handleFileUpload}
          onRemoveFile={removeSelectedFile}
        />
      </div>
    </>
  );
};

export default AwardForm;