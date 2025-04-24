
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  BarChart2, 
  CheckSquare, 
  Settings, 
  Menu, 
  X 
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Contacts", path: "/contacts", icon: Users },
    { name: "Deals", path: "/deals", icon: BarChart2 },
    { name: "Tasks", path: "/tasks", icon: CheckSquare },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed left-4 top-4 z-50 bg-primary rounded-md p-2 text-primary-foreground"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-white shadow-lg transform transition-all duration-300 ease-in-out z-40",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "w-64"
        )}
      >
        <div className="p-5 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-md p-1">
              <BarChart2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">StartupCRM</span>
          </Link>
        </div>

        <nav className="p-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link 
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-md transition-all",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} className={isActive ? "text-primary" : ""} />
                <span>{item.name}</span>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-5 border-t">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <Users size={18} />
            </div>
            <div>
              <p className="font-medium text-sm">Startup Team</p>
              <p className="text-xs text-gray-500">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
