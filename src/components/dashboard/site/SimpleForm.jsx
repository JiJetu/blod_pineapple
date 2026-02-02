import { Input } from "antd";

const SimpleForm = ({ 
  activeTab, 
  yearValue, 
  setYearValue, 
  roomValue, 
  setRoomValue, 
  quantityValue, 
  setQuantityValue 
}) => {
  const getPlaceholder = () => {
    switch (activeTab) {
      case "year": return "Enter year here";
      case "room": return "Enter room number";
      case "quantity": return "Enter quantity";
      default: return "";
    }
  };

  const getLabel = () => {
    switch (activeTab) {
      case "year": return "Year";
      case "room": return "Room";
      case "quantity": return "Quantity";
      default: return "";
    }
  };

  const getValue = () => {
    switch (activeTab) {
      case "year": return yearValue;
      case "room": return roomValue;
      case "quantity": return quantityValue;
      default: return "";
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    switch (activeTab) {
      case "year": setYearValue(value); break;
      case "room": setRoomValue(value); break;
      case "quantity": setQuantityValue(value); break;
      default: break;
    }
  };

  return (
    <div>
      <label className="text-gray-700 font-medium mb-2 block text-sm sm:text-base">
        {getLabel()}
      </label>
      <Input
        placeholder={getPlaceholder()}
        className="h-11 sm:h-12 rounded-lg text-sm sm:text-base"
        value={getValue()}
        onChange={handleChange}
      />
    </div>
  );
};

export default SimpleForm;