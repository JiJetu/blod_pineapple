import { Upload, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const UploadArea = ({ 
  type = "icon", 
  selectedFile, 
  previewUrl, 
  onFileUpload, 
  onRemoveFile 
}) => {
  const isIcon = type === "icon";
  
  const uploadProps = {
    beforeUpload: (file) => {
      return onFileUpload(file);
    },
    showUploadList: false,
    multiple: false,
  };

  if (selectedFile && previewUrl) {
    return (
      <div className="bg-[#f0f8ff] rounded-lg p-6 border border-dashed border-[#5F0629]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-300">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-800">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={onRemoveFile}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          You can click the "Browse here" button to change the image
        </p>
      </div>
    );
  }

  return (
    <Upload.Dragger {...uploadProps} className="bg-[#f0f8ff]">
      <div className={`py-${isIcon ? "8 sm:py-10" : "10 sm:py-16"} text-center`}>
        <p className={`font-medium text-gray-700 mb-${isIcon ? "3" : "4"} ${isIcon ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}`}>
          Drag & drop here
        </p>
        <p className="text-base sm:text-xl text-gray-500 mb-6 sm:mb-8">
          or
        </p>
        <Button
          style={{ color: "#5F0629", borderColor: "#5F0629" }}
          className={`${isIcon ? "px-6 sm:px-8" : "h-11 sm:h-12 px-8 sm:px-12"} text-base sm:text-lg rounded-lg`}
        >
          Browse here
        </Button>
        <p className="text-sm text-gray-500 mt-4">
          Supports JPG, PNG, GIF - Max 2MB
        </p>
      </div>
    </Upload.Dragger>
  );
};

export default UploadArea;