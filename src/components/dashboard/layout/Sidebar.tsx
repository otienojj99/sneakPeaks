import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSidebar } from "../../../hooks/useSidebar";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineCamera,
  HiOutlineHome,
  HiOutlineShoppingCart,
  HiOutlineChartBar,
  HiOutlineCreditCard,
  HiOutlineCube,
  HiOutlineTag,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiOutlineTruck,
  HiOutlineChatAlt2,
  HiOutlineStar,
  HiOutlineCog,
  HiOutlineTicket,
  HiOutlineColorSwatch,
} from "react-icons/hi";

interface SubItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  path?: string;
  type: "link" | "dropdown" | "label";
  children?: SubItem[];
}

const sidebarData: SidebarItem[] = [
  // --- OVERVIEW (Dropdown) ---
  {
    name: "Overview",
    icon: <HiOutlineHome size={22} />,
    type: "dropdown",
    children: [
      {
        name: "Ecommerce",
        path: "/dashboard",
        icon: <HiOutlineShoppingCart size={18} />,
      },
      {
        name: "Analytics",
        path: "/dashboard/analytics",
        icon: <HiOutlineChartBar size={18} />,
      },
      {
        name: "Banking",
        path: "/dashboard/banking",
        icon: <HiOutlineCreditCard size={18} />,
      },
    ],
  },

  // --- MANAGEMENT (Dropdown) ---
  {
    name: "Management",
    icon: <HiOutlineClipboardList size={22} />,
    type: "dropdown",
    children: [
      {
        name: "Products",
        path: "/dashboard/products",
        icon: <HiOutlineCube size={18} />,
      },
      {
        name: "Categories",
        path: "/dashboard/categories",
        icon: <HiOutlineTag size={18} />,
      },
      {
        name: "Orders",
        path: "/dashboard/orders",
        icon: <HiOutlineShoppingCart size={18} />,
      },
      {
        name: "Customers",
        path: "/dashboard/customers",
        icon: <HiOutlineUsers size={18} />,
      },
      {
        name: "Brands",
        path: "/dashboard/brands",
        icon: <HiOutlineColorSwatch size={18} />,
      },
      {
        name: "WareHouse",
        path: "/dashboard/warehouse",
        icon: <HiOutlineCube size={18} />,
      },
      {
        name: "Supplier",
        path: "/dashboard/supplier",
        icon: <HiOutlineUsers size={18} />,
      },
      {
        name: "Coupons",
        path: "/dashboard/coupons",
        icon: <HiOutlineTicket size={18} />,
      },
      {
        name: "Scanner",
        path: "/dashboard/scanner",
        icon: <HiOutlineCamera size={18} />,
      },
      {
        name: "Inventory",
        path: "/dashboard/inventory",
        icon: <HiOutlineCube size={18} />,
      },
      {
        name: "Inventor Oerations",
        path: "/dashboard/inventory_operations",
        icon: <HiOutlineCube size={18} />,
      },
    ],
    // Supplier
  },

  // --- STANDALONE ITEMS ---
  {
    name: "Shipping",
    icon: <HiOutlineTruck size={22} />,
    path: "/dashboard/shipping",
    type: "link",
  },
  {
    name: "Reviews",
    icon: <HiOutlineStar size={22} />,
    path: "/dashboard/reviews",
    type: "link",
  },
  {
    name: "Messages",
    icon: <HiOutlineChatAlt2 size={22} />,
    path: "/dashboard/messages",
    type: "link",
  },
  {
    name: "Settings",
    icon: <HiOutlineCog size={22} />,
    path: "/dashboard/settings",
    type: "link",
  },
];

const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>(["Overview"]);
  const location = useLocation();

  const toggleDropdown = (name: string) => {
    if (isCollapsed) return;
    setOpenDropdowns((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  const isDropdownOpen = (name: string) => openDropdowns.includes(name);

  const isActiveChild = (children?: SubItem[]) => {
    if (!children) return false;
    return children.some((child) => location.pathname === child.path);
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40
        transition-all duration-300 ease-in-out flex flex-col
        ${isCollapsed ? "w-[78px]" : "w-[260px]"}
      `}
    >
      {/* ========== LOGO + TOGGLE ========== */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
        {/* Logo */}
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">SP</span>
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg text-gray-800 whitespace-nowrap">
              SneakPeaks
            </span>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors flex-shrink-0"
        >
          <HiOutlineChevronLeft
            size={18}
            className={`transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* ========== NAVIGATION ========== */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 scrollbar-thin">
        <ul className="space-y-1">
          {sidebarData.map((item) => (
            <li key={item.name}>
              {/* ---- DROPDOWN ITEM ---- */}
              {item.type === "dropdown" && (
                <>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200
                      ${
                        isActiveChild(item.children)
                          ? "bg-primary-50 text-primary-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }
                      ${isCollapsed ? "justify-center" : ""}
                    `}
                    title={isCollapsed ? item.name : ""}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>

                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left text-sm font-medium whitespace-nowrap">
                          {item.name}
                        </span>
                        <HiOutlineChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            isDropdownOpen(item.name) ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {/* Dropdown Children */}
                  {!isCollapsed && isDropdownOpen(item.name) && (
                    <ul className="mt-1 ml-4 pl-3 border-l border-gray-200 space-y-1">
                      {item.children?.map((child) => (
                        <li key={child.name}>
                          <NavLink
                            to={child.path}
                            end={child.path === "/dashboard"}
                            className={({ isActive }) =>
                              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                                isActive
                                  ? "bg-primary-50 text-primary-600 font-medium"
                                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                              }`
                            }
                          >
                            {child.icon}
                            <span className="whitespace-nowrap">
                              {child.name}
                            </span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Collapsed: Show tooltip or mini popup */}
                  {isCollapsed && (
                    <div className="group relative">
                      {/* Tooltip on hover */}
                    </div>
                  )}
                </>
              )}

              {/* ---- REGULAR LINK ---- */}
              {item.type === "link" && item.path && (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-primary-50 text-primary-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } ${isCollapsed ? "justify-center" : ""}`
                  }
                  title={isCollapsed ? item.name : ""}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="text-sm font-medium whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* ========== SIDEBAR FOOTER ========== */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl p-4 text-white">
            <p className="text-xs font-medium opacity-80">Need Help?</p>
            <p className="text-sm font-semibold mt-1">Check our docs</p>
            <button className="mt-3 w-full bg-white text-primary-600 text-xs font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Documentation
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
