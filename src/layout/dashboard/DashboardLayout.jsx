import { Outlet } from "react-router-dom";

import { useState } from "react";

import { LuPanelRightClose } from "react-icons/lu";

import { MdOutlineMenu } from "react-icons/md";

import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import { LuPanelLeftClose } from "react-icons/lu";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";


const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const mainContentClass = collapsed ? "lg:ml-[80px]" : "lg:ml-[270px]";

  return (
    <div className="relative flex h-screen overflow-hidden bg-white">
      {/* Mobile hamburger */}
      <button
        className="absolute top-4 left-4 z-50 lg:hidden text-2xl text-[#1E3A8A]"
        onClick={() => setMobileOpen(true)}
      >
        <MdOutlineMenu />
      </button>

      {/* Desktop Sidebar */}
      <div
        className={`transition-all duration-300 h-screen bg-white fixed top-0 left-0 z-40

        ${collapsed ? "min-w-[80px]" : "w-[270px]"} hidden lg:block`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute p-1 ${
            collapsed
              ? "top-[76px] right-[-1.75rem] text-black"
              : "top-[87px] right-[0.75rem] text-white"
          }`}
        >
          {collapsed ? (
            <LuPanelLeftClose size={20} />
          ) : (
            <LuPanelRightClose size={17} />
          )}
        </button>

        <DashboardSidebar collapsed={collapsed} />
      </div>

      {/* Mobile Drawer */}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-white w-[270px] h-full p-0 relative overflow-hidden">
            <button
              className="absolute top-5 right-4 text-2xl text-white"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>

            <DashboardSidebar collapsed={false} />
          </div>

          <div
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex-1  w-screen flex flex-col transition-all duration-300 ${mainContentClass}`}
      >
        <DashboardHeader />
        <main className="flex-1 p-4 user overflow-y-auto bg-[#fbf9f7]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
