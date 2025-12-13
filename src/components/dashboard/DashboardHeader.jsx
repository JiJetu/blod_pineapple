import { NavLink } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";

const DashboardHeader = ({ title, description }) => {

  return (
    <div className="flex items-center border-b border-b-[#0000001A] justify-between py-4 px-2 lg:p-4 bg-white dark:bg-white text-[#020202] outfit ">
      {/* Title */}

      <div>
        {title && (
          <h1 className="text-2xl font-semibold text-primary">{title}</h1>
        )}
        {description && (
          <div className="text-base text-black">{description}</div>
        )}
      </div>

      <div className="flex justify-center items-center gap-5">
        {/* Notification Icon */}
        <NavLink to="/">
          <div className="relative cursor-pointer">
            <IoNotifications className="size-10 text-primary" />

            {/* bell small dot indicator */}
            <span className="absolute top-[2px] right-[5px] size-4 rounded-full bg-[#FF0C0C]"></span>
          </div>
        </NavLink>

        {/* Profile Section based on role */}
        <div className="flex items-center gap-6 cursor-pointer">
          {/* Time + Date */}
          <div className="flex flex-col leading-tight text-right">
            <span className="text-lg font-medium text-black py-2 px-5 border border-primary rounded-lg">
              Admin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
