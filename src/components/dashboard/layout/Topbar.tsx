import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useSidebar } from "../../../hooks/useSidebar";
import {
  HiOutlineSearch,
  HiOutlineCog,
  HiOutlineExternalLink,
  HiOutlineBell,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineChevronDown,
} from "react-icons/hi";

const Topbar = () => {
  const { user, logout } = useAuth();
  const { isCollapsed } = useSidebar();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handlePreview = () => {
    window.open("/", "_blank");
  };

  return (
    <header
      className={`
        fixed top-0 right-0 h-16 bg-white border-b border-gray-200 z-30
        flex items-center justify-between px-6
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "left-[78px]" : "left-[260px]"}
      `}
    >
      {/* ========== LEFT SIDE ========== */}
      <div className="flex items-center gap-3">
        {/* Preview Button */}
        <button
          onClick={handlePreview}
          className="flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors duration-200 text-sm font-medium"
        >
          <HiOutlineExternalLink size={18} />
          <span>Preview</span>
        </button>
      </div>

      {/* ========== RIGHT SIDE ========== */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div ref={searchRef} className="relative">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <HiOutlineSearch size={20} />
          </button>

          {/* Search Dropdown */}
          {isSearchOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-fadeIn">
              <div className="relative">
                <HiOutlineSearch
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  autoFocus
                />
              </div>
              {searchQuery && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-gray-400 uppercase font-medium">
                    Quick Results
                  </p>
                  <div className="text-sm text-gray-500 py-4 text-center">
                    No results found for "{searchQuery}"
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors relative">
          <HiOutlineBell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings */}
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <HiOutlineCog size={20} />
        </button>

        {/* Country Flag */}
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <img
            src="https://flagcdn.com/w40/us.png"
            alt="US"
            className="w-6 h-4 rounded-sm object-cover"
          />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 mx-1"></div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center overflow-hidden ring-2 ring-gray-100">
              {user?.name ? (
                <span className="text-white font-semibold text-sm">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              ) : (
                <HiOutlineUser size={18} className="text-white" />
              )}
            </div>

            {/* Name & Role */}
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-800 leading-tight">
                {user?.name || "Admin User"}
              </p>
              <p className="text-xs text-gray-400">
                {user?.role || "Administrator"}
              </p>
            </div>

            <HiOutlineChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 hidden md:block ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-fadeIn">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {user?.email || "admin@sneakpeaks.com"}
                </p>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={() => {
                    navigate("/dashboard/profile");
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <HiOutlineUser size={18} />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/dashboard/settings");
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <HiOutlineCog size={18} />
                  <span>Settings</span>
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <HiOutlineLogout size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
