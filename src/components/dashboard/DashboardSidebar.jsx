import { FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { PiStudentBold } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa";
import { PiCertificateLight } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsArchive } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { IMAGES } from "../../assets";

const DashboardSidebar = ({ collapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { to: "/dashboard", icon: MdDashboard, label: "Dashboard" },
    { to: "/dashboard/students", icon: PiStudentBold, label: "Student" },
    { to: "/dashboard/award-assign", icon: FaGraduationCap, label: "Award Assign" },
    { to: "/dashboard/certificate", icon: PiCertificateLight , label: "Certificate" },
    { to: "/dashboard/faction", icon: FaPeopleGroup, label: "Faction" },
    { to: "/dashboard/report", icon: HiOutlineDocumentReport, label: "Report" },
    { to: "/dashboard/archive", icon: BsArchive, label: "Archive" },
    { to: "/dashboard/settings", icon: IoSettingsOutline, label: "Settings" },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

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
        {menuItems.map((item) => {
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
                {/* Icon with rounded background when active */}
                <div
                //   className={`p-2 rounded-lg transition-all ${
                //     active ? "bg-[#5F0629] text-white" : "bg-white/20"
                //   }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {!collapsed && (
                  <span className="text-lg font-medium">{item.label}</span>
                )}
              </div>
            </NavLink>
          );
        })}
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