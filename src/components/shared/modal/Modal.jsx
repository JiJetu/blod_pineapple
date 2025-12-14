import { Modal } from "antd";

const ReusableModal = ({
  title = "Modal Title",
  open,
  onCancel,
  children,
  width = 600,
  footer = null,
  closable = true,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={footer}
      width={width}
      closable={closable}
      closeIcon={<span className="text-2xl text-gray-600">×</span>}
      maskStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)", 
      }}
      style={{
        top: 40, // Slight offset from top for better look
      }}
      bodyStyle={{
        padding: "32px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
      }}
      wrapClassName="custom-reusable-modal"
      transitionName="ant-fade"
      maskTransitionName="ant-fade"
    >
      {/* Custom Header */}
      <div className="mb-6 -mt-2">
        <h2 className="text-2xl font-semibold text-primary roboto">{title}</h2>
      </div>

      {/* Children Content (Form, Text, etc.) */}
      <div>{children}</div>
    </Modal>
  );
};

export default ReusableModal;
