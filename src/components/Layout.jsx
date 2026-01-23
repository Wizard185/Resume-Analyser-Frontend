import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  FileText, 
  History, 
  User, 
  LogOut, 
  Menu,
  X,
  BrainCircuit
} from "lucide-react";
import { useState } from "react";
import {cn} from "../utils/cn";



const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "New Analysis", path: "/analyze", icon: FileText },
    { label: "History", path: "/history", icon: History },
    { label: "Profile", path: "/profile", icon: User },
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 p-6 border-b border-gray-100">
          <BrainCircuit className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">JobFit AI</span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              {user?.fullName?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.fullName}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-800">JobFit AI</span>
          </div>
          <button onClick={toggleMenu} className="p-2 text-gray-600">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-50" onClick={toggleMenu}>
            <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl flex flex-col" onClick={e => e.stopPropagation()}>
               <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold">Menu</span>
                <button onClick={toggleMenu}><X className="w-5 h-5"/></button>
               </div>
               <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg",
                      location.pathname === item.path
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;