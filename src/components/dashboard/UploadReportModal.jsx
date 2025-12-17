import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined, FileOutlined } from "@ant-design/icons";
import ReusableModal from "../shared/modal/Modal";

const UploadReportModal = ({ open, onCancel }) => {
  const [fileList, setFileList] = useState([]);

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      const isExcel =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel" ||
        file.name.endsWith(".xls") ||
        file.name.endsWith(".xlsx");

      if (!isExcel) {
        message.error("You can only upload Excel files (.xls, .xlsx)!");
        return Upload.LIST_IGNORE;
      }

      setFileList([file]);
      return false; // Prevent auto upload
    },
    fileList,
    accept: ".xls,.xlsx",
    maxCount: 1,
    showUploadList: false, // Hide default list - we'll show custom feedback if needed
  };

  const handleUpload = () => {
    if (fileList.length === 0) {
      message.warning("Please select an Excel file first!");
      return;
    }

    message.success(`"${fileList[0].name}" uploaded successfully!`);

    // Reset and close
    setFileList([]);
    onCancel();
  };

  return (
    <ReusableModal
      title="Upload Report"
      open={open}
      onCancel={() => {
        setFileList([]);
        onCancel();
      }}
      width={640}
    >
      <div className="py-10">
        {/* Custom Drag & Drop Area */}
        <Upload.Dragger {...uploadProps}>
          <div
            className="border-4 border-dashed rounded-2xl py-8 md:py-20"
            style={{ borderColor: "#5F0629" }}
          >
            <p className="text-3xl font-medium text-gray-800 mb-4">
              Drag & Drop here
            </p>
            <p className="text-xl text-gray-600 mb-8">Or</p>

            <Button
              icon={<FileOutlined />}
              size="large"
              className="h-14 px-12 text-lg font-medium rounded-xl border-2"
              style={{
                borderColor: "#5F0629",
                color: "#5F0629",
              }}
            >
              Browse File
            </Button>
          </div>
        </Upload.Dragger>

        {/* Upload Button */}
        <div className="text-center mt-12">
          <Button
            onClick={handleUpload}
            icon={<UploadOutlined />}
            size="large"
            className="h-16 px-20 text-2xl font-semibold rounded-full shadow-xl"
            style={{ background: "#5F0629", color: "white" }}
          >
            Upload
          </Button>
        </div>
      </div>
    </ReusableModal>
  );
};

export default UploadReportModal;