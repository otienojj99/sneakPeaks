import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  activeDropdown: string | null;
  setActiveDropdown: (dropdown: string | null) => void;
}

export const SidebarContext = createContext<SidebarContextType>(
  {} as SidebarContextType,
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setActiveDropdown(null);
    }
  };

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, toggleSidebar, activeDropdown, setActiveDropdown }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
