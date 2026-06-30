import { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined, FileOutlined } from "@ant-design/icons";
import ReusableModal from "../shared/modal/Modal";
import { useBulkImportStudentsMutation } from "../../redux/features/student/student.api";

const UploadReportModal = ({ open, onCancel }) => {
  const [fileList, setFileList] = useState([]);
  const [bulkImportStudents, { isLoading }] = useBulkImportStudentsMutation();

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      const fileName = file.name || "";
      const isExcel =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel" ||
        file.type === "application/vnd.ms-excel.sheet.macroEnabled.12" ||
        /\.(xlsx|xls|xlsm)$/i.test(fileName);

      if (!isExcel) {
        message.error("You can only upload Excel files (.xls, .xlsx, .xlsm)!");
        return Upload.LIST_IGNORE;
      }

      setFileList([file]);
      return false; // Prevent auto upload
    },
    fileList,
    accept: ".xls,.xlsx,.xlsm",
    maxCount: 1,
    showUploadList: false, // Hide default list - we'll show custom feedback if needed
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning("Please select an Excel file first!");
      return;
    }

    const excelFile = fileList[0]?.originFileObj || fileList[0];
    try {
      const res = await bulkImportStudents(excelFile).unwrap();
      const detail = res?.detail || "Students imported successfully.";
      const errorsCount = Array.isArray(res?.errors) ? res.errors.length : 0;
      message.success(detail);
      if (errorsCount > 0) {
        message.warning(`${errorsCount} issue(s) occurred during import.`);
      }
    } catch (err) {
      const fallback = "Failed to import students. Please try again.";
      const serverMsg =
        err?.data?.detail ||
        err?.error ||
        fallback;
      message.error(serverMsg);
      return;
    }

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
            <p className="text-2xl font-medium text-gray-800 mb-4">
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

        {fileList.length > 0 && (
          <div
            className="mt-6 flex items-center justify-between bg-gray-50 border rounded-xl px-6 py-4"
            style={{ borderColor: "#5F0629" }}
          >
            <div className="flex items-center gap-3">
              <FileOutlined style={{ color: "#5F0629" }} />
              <span className="text-base font-medium text-gray-800">
                {fileList[0]?.name || fileList[0]?.originFileObj?.name}
              </span>
              <span className="text-sm text-gray-500">
                {(() => {
                  const size =
                    fileList[0]?.size || fileList[0]?.originFileObj?.size;
                  return size ? `${(size / 1024).toFixed(1)} KB` : "";
                })()}
              </span>
            </div>
            <Button size="small" danger onClick={() => setFileList([])}>
              Remove
            </Button>
          </div>
        )}

        {/* Upload Button */}
        <div className="text-center mt-12">
          <Button
            onClick={handleUpload}
            icon={<UploadOutlined />}
            size="large"
            className="h-14 px-20 text-lg font-semibold rounded-xl shadow-xl"
            style={{ background: "#5F0629", color: "white" }}
            loading={isLoading}
            disabled={isLoading}
          >
            Upload
          </Button>
        </div>
      </div>
    </ReusableModal>
  );
};

export default UploadReportModal;
