import { Outlet } from "react-router-dom";
import { useSidebar } from "../../../hooks/useSidebar";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

const DashboardLayout = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main
        className={`
          transition-all duration-300 ease-in-out
          pt-16 min-h-screen flex flex-col
          ${isCollapsed ? "ml-[78px]" : "ml-[260px]"}
        `}
      >
        {/* Page Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default DashboardLayout;
