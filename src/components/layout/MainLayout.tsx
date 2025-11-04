import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  Bell, Briefcase, Calendar, Clock, FileText, Grid3X3, LogOut, Receipt, Search, Settings, Star
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

const sidebarLinks = [
  { to: "/dashboard", icon: Grid3X3, label: "Dashboard" },
  { to: "/appointments", icon: Calendar, label: "Appointments" },
  { to: "/services", icon: Briefcase, label: "My Services" },
  { to: "/availability", icon: Clock, label: "Availability" },
  { to: "/documents", icon: FileText, label: "Documents" },
  { to: "/billing", icon: Receipt, label: "Billing" },
  { to: "/reviews", icon: Star, label: "Reviews" },
  { to: "/notifications", icon: Bell, label: "Notifications" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function MainLayout() {
  const location = useLocation();
  const activePage = sidebarLinks.find(link =>
    location.pathname.startsWith(link.to)
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar Desktop */}
      <div className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
        <div className="p-6">
          <div className="flex items-center mb-4 justify-center">
            <img
              src="/furglo-logo.png"
              alt="FurGlo Logo"
              className="w-[100px] h-[50px] object-contain"
            />
          </div>

          <nav className="space-y-2 flex-1 overflow-y-auto">
            {sidebarLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    isActive
                      ? "bg-orange-600 text-white"
                      : "text-gray-700 hover:bg-orange-100 hover:text-orange-700"
                  }`
                }
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-6 mt-20">
          <Button variant="ghost" className="text-gray-600 hover:text-orange-600 w-full justify-start">
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Sidebar Mobile - Icons Only */}
      <div className="flex md:hidden w-16 bg-white border-r border-gray-200 flex-col items-center">
        <div className="py-4">
          <img
            src="/furglo-logo.png"
            alt="FurGlo Logo"
            className="w-8 h-8 object-contain"
          />
        </div>

        <nav className="flex-1 overflow-y-auto space-y-4 mt-4">
          {sidebarLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center justify-center w-12 h-12 rounded-lg mx-auto transition-colors ${
                  isActive
                    ? "bg-orange-600 text-white"
                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-700"
                }`
              }
            >
              <link.icon className="w-5 h-5" />
            </NavLink>
          ))}
        </nav>

        <div className="p-2 border-t border-gray-200">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-orange-600 flex justify-center w-12 h-12 p-0"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
  <div className="flex items-center justify-between">
    {/* Left Section: Page title */}
    <div className="flex items-center gap-4">
      {activePage && <activePage.icon className="w-6 h-6 text-orange-600" />}
      <h1 className="text-xl md:text-2xl font-semibold text-orange-600">
        {activePage?.label ?? "Dashboard"}
      </h1>
    </div>

    {/* Right Section: Search, Bell, and Profile */}
    <div className="flex items-center gap-4">
      {/* Desktop Search Bar */}
      <div className="relative hidden sm:block">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Quick Search..."
          className="pl-10 w-48 md:w-80 bg-[#FFEADB80] border-gray-200"
        />
      </div>

      {/* Mobile Search Icon */}
      <button
        className="block sm:hidden p-2 rounded-lg hover:bg-orange-100 text-gray-700 hover:text-orange-600"
        onClick={() => {
          const searchBox = document.getElementById("mobileSearchBox");
          if (searchBox) searchBox.classList.toggle("hidden");
        }}
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Notification Bell */}
      <div className="relative">
        <Bell className="w-6 h-6 text-gray-700" />
        <Badge className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-1.5 py-0.5 rounded-full">
          3
        </Badge>
      </div>

      {/* User Avatar */}
      <div className="hidden sm:flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/caring-doctor.png" />
          <AvatarFallback>DS</AvatarFallback>
        </Avatar>
        <span className="font-medium">Dr. Sarah</span>
      </div>
    </div>
  </div>

  {/* Mobile Search Box (hidden by default) */}
  <div id="mobileSearchBox" className="hidden mt-3 sm:hidden">
    <div className="relative">
      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Search..."
        className="pl-10 w-full bg-[#FFEADB80] border-gray-200"
      />
    </div>
  </div>
</header>


        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-orange-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
