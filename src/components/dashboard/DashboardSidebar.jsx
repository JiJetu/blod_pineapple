import { useState, useEffect, useRef } from "react";
import { FaSignOutAlt, FaUserShield } from "react-icons/fa";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { PiStudentBold } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa";
import { PiCertificateLight } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";
import { IoSettingsOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { IMAGES } from "../../assets";
import { SiSitepoint } from "react-icons/si";

const DashboardSidebar = ({ collapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  const mainMenuItems = [
    { to: "/dashboard", icon: MdDashboard, label: "Dashboard" },
    { to: "/dashboard/students", icon: PiStudentBold, label: "Student" },
    { to: "/dashboard/award-assign", icon: FaGraduationCap, label: "Award Assign" },
    { to: "/dashboard/certificate", icon: PiCertificateLight, label: "Certificate" },
    { to: "/dashboard/faction", icon: FaPeopleGroup, label: "Faction" },
    { to: "/dashboard/report", icon: HiOutlineDocumentReport, label: "Report" },
    { to: "/dashboard/archive", icon: HiArchiveBoxArrowDown, label: "Archive" },
  ];

  const settingsItems = [
    { to: "/dashboard/settings/site", icon: SiSitepoint, label: "Site" },
    { to: "/dashboard/settings/account", icon: FaUserShield, label: "Account" },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  // Check if any settings child is active
  const isSettingsActive = settingsItems.some(item => isActive(item.to));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-[#5F0629] text-white min-h-screen flex flex-col justify-between py-6 pl-4">
      {/* Logo */}
      <div className="mb-8 flex justify-start">
        <Link to="/dashboard">
          <img
            src={IMAGES.logo}
            alt="Techboro Primary School"
            className="mx-auto w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-2">
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="block"
            >
              <div
                className={`flex items-center gap-4 px-5 py-2 rounded-lg rounded-r-none transition-all duration-200 ${
                  active
                    ? "bg-white text-[#5F0629] font-semibold shadow-md"
                    : "hover:bg-white/10 border border-white"
                }`}
              >
                <Icon className="w-6 h-6" />
                {!collapsed && (
                  <span className="text-lg font-medium">{item.label}</span>
                )}
              </div>
            </NavLink>
          );
        })}

        {/* Settings with Dropdown */}
        <div className="mt-2" ref={settingsRef}>
          {/* Settings Parent Item - Always visible */}
          <div
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`flex items-center justify-between px-5 py-2 rounded-lg rounded-r-none transition-all duration-200 cursor-pointer ${
              isSettingsActive
                ? "bg-white text-[#5F0629] font-semibold shadow-md"
                : "hover:bg-white/10 border border-white"
            }`}
          >
            <div className="flex items-center gap-4">
              <IoSettingsOutline className="w-6 h-6" />
              {!collapsed && (
                <span className="text-lg font-medium">Settings</span>
              )}
            </div>
            {!collapsed && (
              <div>
                {isSettingsOpen ? (
                  <IoChevronUp className="w-5 h-5" />
                ) : (
                  <IoChevronDown className="w-5 h-5" />
                )}
              </div>
            )}
          </div>

          {/* Dropdown Items - Show in both collapsed and expanded states */}
          {isSettingsOpen && (
            <div className={`${!collapsed ? "ml-5" : ""} mt-1 space-y-1`}>
              {settingsItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className="block"
                    onClick={() => {
                      if (collapsed) {
                        setIsSettingsOpen(false);
                      }
                    }}
                  >
                    <div
                      className={`flex items-center gap-4 px-4 py-2 rounded-lg transition-all duration-200 ${
                        active
                          ? "bg-[#8e3759cc] text-white font-medium"
                          : "hover:bg-white/10 text-white/80"
                      }`}
                    >
                      <Icon className={`${collapsed ? "w-6 h-6" : "w-5 h-5"}`} />
                      {!collapsed && (
                        <span className="text-lg">{item.label}</span>
                      )}
                    </div>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="flex items-center gap-4 px-5 py-4 rounded-lg cursor-pointer hover:bg-white/10 transition-all mt-8 border-t border-white/20 pt-6"
      >
        <div className="p-2 rounded-lg bg-red-600/20 text-red-400">
          <FaSignOutAlt className="w-6 h-6" />
        </div>
        {!collapsed && (
          <span className="text-lg font-medium text-red-400">Logout</span>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;