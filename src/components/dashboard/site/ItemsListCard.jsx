import { MinusCircleOutlined } from "@ant-design/icons";

const ItemsListCard = ({ 
  activeTab, 
  currentList, 
  getImageUrl, 
  handleDelete 
}) => {
  const getTitle = () => {
    switch (activeTab) {
      case "award": return "Award list";
      case "year": return "Year list";
      case "faction": return "Faction list";
      case "room": return "Room list";
      case "quantity": return "Quantity list";
      default: return "";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 sm:mb-8">
        {getTitle()}
      </h2>

      <div className="flex flex-wrap gap-3 sm:gap-4">
        {currentList && currentList.map((item, index) => {
          const displayName = item.name || item.number || "Unnamed";
          const imageUrl = getImageUrl(item);

          return (
            <div
              key={item.id || index}
              className="flex items-center justify-between bg-[#e6f7ff] rounded-full px-4 sm:px-5 py-2.5 sm:py-3 shadow-sm hover:shadow transition-shadow min-w-[100px] sm:min-w-[120px]"
            >
              <span className="text-sm sm:text-lg font-medium text-gray-800 flex items-center gap-2 sm:gap-3">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={displayName}
                    className="w-6 h-6 sm:w-7 sm:h-7 object-cover border border-gray-300 rounded-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                {displayName}
              </span>
              <button
                onClick={() => handleDelete(item, activeTab)}
                className="ml-3 sm:ml-4 text-red-500 hover:text-red-700 transition-colors"
              >
                <MinusCircleOutlined className="text-xl sm:text-2xl" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsListCard;