import { useEffect, useState } from "react";
import { message } from "antd";
import { useHeader } from "../../contexts/HeaderContext";
import {
  useCreateAwardMutation,
  useDeleteAwardMutation,
  useGetAwardsQuery,
} from "../../redux/features/award/awards.api";
import {
  useCreateYearMutation,
  useDeleteYearMutation,
  useGetYearsQuery,
} from "../../redux/features/years/years.api";
import {
  useCreateFactionMutation,
  useDeleteFactionMutation,
  useGetFactionsQuery,
} from "../../redux/features/factions/factions.api";
import {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useGetRoomsQuery,
} from "../../redux/features/rooms/rooms.api";
import {
  useCreateQuantityMutation,
  useDeleteQuantityMutation,
  useGetQuantitiesQuery,
} from "../../redux/features/quantities/quantities.api";
import PillTabs from "../../components/dashboard/site/PillTabs";
import CreateFormCard from "../../components/dashboard/site/CreateFormCard";
import ItemsListCard from "../../components/dashboard/site/ItemsListCard";

const Site = () => {
  const { setTitle, setDescription } = useHeader();
  const [activeTab, setActiveTab] = useState("award");

  useEffect(() => {
    setTitle("Site Settings");
    setDescription("Manage awards, years, factions, rooms and quantities");
  }, [setTitle, setDescription]);

  // API Queries
  const { data: awards = [] } = useGetAwardsQuery();
  const { data: years = [] } = useGetYearsQuery();
  const { data: factions = [] } = useGetFactionsQuery();
  const { data: rooms = [] } = useGetRoomsQuery();
  const { data: quantities = [] } = useGetQuantitiesQuery();

  // API Mutations
  const [createAward] = useCreateAwardMutation();
  const [deleteAward] = useDeleteAwardMutation();
  const [createYear] = useCreateYearMutation();
  const [deleteYear] = useDeleteYearMutation();
  const [createFaction] = useCreateFactionMutation();
  const [deleteFaction] = useDeleteFactionMutation();
  const [createRoom] = useCreateRoomMutation();
  const [deleteRoom] = useDeleteRoomMutation();
  const [createQuantity] = useCreateQuantityMutation();
  const [deleteQuantity] = useDeleteQuantityMutation();

  // Form states
  const [formData, setFormData] = useState({
    awardName: "",
    awardNumber: "",
    relativeAwardId: null,
    factionName: "",
    yearValue: "",
    roomValue: "",
    quantityValue: "",
  });

  const [fileData, setFileData] = useState({
    selectedFile: null,
    previewUrl: null,
  });

  // Reset form when tab changes
  useEffect(() => {
    resetForm();
  }, [activeTab]);

  const resetForm = () => {
    setFormData({
      awardName: "",
      awardNumber: "",
      relativeAwardId: null,
      factionName: "",
      yearValue: "",
      roomValue: "",
      quantityValue: "",
    });
    setFileData({
      selectedFile: null,
      previewUrl: null,
    });
  };

  // Form handlers
  const setAwardName = (value) => setFormData(prev => ({ ...prev, awardName: value }));
  const setAwardNumber = (value) => setFormData(prev => ({ ...prev, awardNumber: value }));
  const setFactionName = (value) => setFormData(prev => ({ ...prev, factionName: value }));
  const setYearValue = (value) => setFormData(prev => ({ ...prev, yearValue: value }));
  const setRoomValue = (value) => setFormData(prev => ({ ...prev, roomValue: value }));
  const setQuantityValue = (value) => setFormData(prev => ({ ...prev, quantityValue: value }));

  // File handlers
  const handleFileUpload = (file) => {
    if (!file.type.startsWith("image/")) {
      message.error("You can only upload image files!");
      return false;
    }

    const url = URL.createObjectURL(file);
    setFileData({
      selectedFile: file,
      previewUrl: url,
    });
    message.success(`${file.name} selected`);
    return false;
  };

  const removeSelectedFile = () => {
    if (fileData.previewUrl) {
      URL.revokeObjectURL(fileData.previewUrl);
    }
    setFileData({
      selectedFile: null,
      previewUrl: null,
    });
    message.info("File removed");
  };

  // Relative award handler
  const handleRelativeAwardChange = (value) => {
    if (value === null || value === "") {
      setFormData(prev => ({ 
        ...prev, 
        relativeAwardId: null,
        awardNumber: "" 
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        relativeAwardId: value 
      }));
    }
  };

  // Handle delete item
  const handleDelete = async (item, tab) => {
    const id = item.id;
    if (!id) return;

    try {
      switch (tab) {
        case "award":
          await deleteAward(id).unwrap();
          break;
        case "year":
          await deleteYear(id).unwrap();
          break;
        case "faction":
          await deleteFaction(id).unwrap();
          break;
        case "room":
          await deleteRoom(id).unwrap();
          break;
        case "quantity":
          await deleteQuantity(id).unwrap();
          break;
      }
      message.success("Deleted successfully");
    } catch (err) {
      message.error(err?.data?.detail || "Failed to delete");
    }
  };

  // Handle create item
  const handleCreate = async () => {
    try {
      const formDataToSend = new FormData();

      switch (activeTab) {
        case "award":
          if (!formData.awardName) return message.error("Name is required");
          if (formData.relativeAwardId && !formData.awardNumber) {
            return message.error("Number is required when relative award is selected");
          }
          
          formDataToSend.append("name", formData.awardName);
          
          if (formData.relativeAwardId && formData.awardNumber) {
            formDataToSend.append("number", formData.awardNumber);
          } else {
            formDataToSend.append("number", "");
          }
          
          if (formData.relativeAwardId) {
            formDataToSend.append("relative_award", formData.relativeAwardId);
          } else {
            formDataToSend.append("relative_award", "");
          }
          
          if (fileData.selectedFile) formDataToSend.append("icon", fileData.selectedFile);
          await createAward(formDataToSend).unwrap();
          message.success("Award created successfully");
          break;

        case "faction":
          if (!formData.factionName) return message.error("Name is required");
          formDataToSend.append("name", formData.factionName);
          if (fileData.selectedFile) formDataToSend.append("logo", fileData.selectedFile);
          await createFaction(formDataToSend).unwrap();
          message.success("Faction created successfully");
          break;

        case "year":
          if (!formData.yearValue) return message.error("Year is required");
          formDataToSend.append("name", formData.yearValue);
          await createYear(formDataToSend).unwrap();
          message.success("Year created successfully");
          break;

        case "room":
          if (!formData.roomValue) return message.error("Room is required");
          formDataToSend.append("name", formData.roomValue);
          await createRoom(formDataToSend).unwrap();
          message.success("Room created successfully");
          break;

        case "quantity":
          if (!formData.quantityValue) return message.error("Quantity is required");
          formDataToSend.append("number", formData.quantityValue);
          await createQuantity(formDataToSend).unwrap();
          message.success("Quantity created successfully");
          break;
      }

      resetForm();
    } catch (err) {
      message.error(err?.data?.detail || "Failed to create");
    }
  };

  // Get current list based on active tab
  const currentList = {
    award: awards,
    year: years,
    faction: factions,
    room: rooms,
    quantity: quantities,
  }[activeTab];

  // Helper function to get image URL
  const getImageUrl = (item) => {
    return item?.icon || item?.logo || null;
  };

  // Prepare form handlers object
  const formHandlers = {
    setAwardName,
    setAwardNumber,
    setFactionName,
    setYearValue,
    setRoomValue,
    setQuantityValue,
    handleRelativeAwardChange,
  };

  // Prepare file handlers object
  const fileHandlers = {
    selectedFile: fileData.selectedFile,
    previewUrl: fileData.previewUrl,
    handleFileUpload,
    removeSelectedFile,
  };

  return (
    <div className="bg-[#fbf9f7] min-h-screen p-4 sm:p-6 roboto">
      <div className="max-w-7xl mx-auto">
        <PillTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <CreateFormCard
          activeTab={activeTab}
          formData={formData}
          formHandlers={formHandlers}
          fileHandlers={fileHandlers}
          awards={awards}
          handleCreate={handleCreate}
        />

        <ItemsListCard
          activeTab={activeTab}
          currentList={currentList}
          getImageUrl={getImageUrl}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Site;