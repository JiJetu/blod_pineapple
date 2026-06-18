import React from "react";
import { Spin, Avatar, Empty } from "antd";
import { useGetStudentAwardsQuery } from "../../redux/features/student/student.api";
import ReusableModal from "../shared/modal/Modal";
import { TbTrophyFilled } from "react-icons/tb";

const StudentDetailsModal = ({ open, onCancel, student }) => {
  const { data: awards = [], isLoading } = useGetStudentAwardsQuery(student?.student_id, {
    skip: !student?.student_id,
  });

  // Calculate statistics
  const totalAwardQuantity = awards.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const uniqueAwardsCount = new Set(awards.map((item) => item.award?.id)).size;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <ReusableModal
      title="Student Details"
      open={open}
      onCancel={onCancel}
      width={680}
    >
      {student && (
        <div className="space-y-6 roboto text-black">
          {/* Header Profile Section */}
          <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
            <Avatar
              size={50}
              style={{ backgroundColor: "#5F0629", verticalAlign: "middle" }}
              className="text-xl font-semibold select-none"
            >
              {student.first_name?.[0]?.toUpperCase()}
              {student.surname?.[0]?.toUpperCase()}
            </Avatar>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {student.first_name} {student.surname}
              </h3>
              <p className="text-gray-600 text-sm">
                ID: {student.student_id}
              </p>
            </div>
          </div>

          {/* Student Info Details */}
          <div className="space-y-3 text-base">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">Faction:</span>
              <span className="font-medium text-gray-800">
                {student.faction?.name || "N/A"}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">Year:</span>
              <span className="font-medium text-gray-800">
                {student.year?.name || "N/A"}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">Room:</span>
              <span className="font-medium text-gray-800">
                {student.room?.name || "N/A"}
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 border border-primary shadow-md">
              <p className="text-base font-medium text-gray-600 mb-1">Total Awards (Qty)</p>
              <h2 className="text-3xl font-bold text-[#5F0629]">{totalAwardQuantity}</h2>
            </div>
            <div className="bg-white rounded-xl p-5 border border-primary shadow-md">
              <p className="text-base font-medium text-gray-600 mb-1">Unique Awards Types</p>
              <h2 className="text-3xl font-bold text-[#5F0629]">{uniqueAwardsCount}</h2>
            </div>
          </div>

          {/* Awards List Section */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <TbTrophyFilled className="text-xl" />
              Award History ({awards.length})
            </h3>

            {isLoading ? (
              <div className="text-center py-10">
                <Spin size="large" />
              </div>
            ) : awards.length > 0 ? (
              <div className="border border-gray-200 rounded-xl overflow-hidden max-h-[300px] overflow-y-auto pr-1">
                <div className="divide-y divide-gray-200">
                  {awards.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="p-4 flex justify-between items-center bg-white hover:bg-[#fbf9f7] transition"
                    >
                      <div className="flex items-center gap-4">
                        {item.award?.icon ? (
                          <img
                            src={item.award.icon}
                            alt={item.award.name}
                            className="w-12 h-12 object-contain rounded p-1 bg-gray-50 border border-gray-100"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded border border-gray-100 text-[#5F0629]">
                            <TbTrophyFilled className="text-xl" />
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-800 text-base">
                            {item.award?.name || "Unnamed Award"}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Date: {formatDate(item.date_awarded)}
                            {item.reason && ` • Reason: ${item.reason}`}
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#5F0629] text-white text-sm font-semibold px-3 py-1 rounded-full">
                        +{item.quantity || 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-200">
                <Empty description="No awards earned yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </div>
        </div>
      )}
    </ReusableModal>
  );
};

export default React.memo(StudentDetailsModal);
