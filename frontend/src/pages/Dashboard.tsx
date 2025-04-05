import { useState } from "react";
import {
  LayoutDashboard,
  FormInput,
  MessageSquare,
  Settings,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";
import { useUserStore } from "../store/store";
import FeedbackForm from "../components/user/Feedback";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const { user } = useUserStore((state) => state);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div
        className={`bg-indigo-800 text-white transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "w-16" : "w-64"
        } flex flex-col`}
      >
        {/* Logo and toggle */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-700">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-white" />
            {!sidebarCollapsed && (
              <span className="ml-2 text-xl font-bold">FeedPulse</span>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md text-indigo-200 hover:bg-indigo-700"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow pt-5">
          <ul className="space-y-2 px-2">
            <li>
              <button
                onClick={() => setActivePage("dashboard")}
                className={`flex items-center w-full p-2 rounded-md ${
                  activePage === "dashboard"
                    ? "bg-indigo-900 text-white"
                    : "text-indigo-200 hover:bg-indigo-700"
                }`}
              >
                <LayoutDashboard className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Profile</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("feedbackForm")}
                className={`flex items-center w-full p-2 rounded-md ${
                  activePage === "feedbackForm"
                    ? "bg-indigo-900 text-white"
                    : "text-indigo-200 hover:bg-indigo-700"
                }`}
              >
                <FormInput className="h-5 w-5" />
                {!sidebarCollapsed && (
                  <span className="ml-3">Feedback Form</span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("responses")}
                className={`flex items-center w-full p-2 rounded-md ${
                  activePage === "responses"
                    ? "bg-indigo-900 text-white"
                    : "text-indigo-200 hover:bg-indigo-700"
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Responses</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("settings")}
                className={`flex items-center w-full p-2 rounded-md ${
                  activePage === "settings"
                    ? "bg-indigo-900 text-white"
                    : "text-indigo-200 hover:bg-indigo-700"
                }`}
              >
                <Settings className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Settings</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-indigo-700">
          {!sidebarCollapsed && (
            <button className="mt-4 flex items-center text-indigo-200 hover:text-white text-sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          )}

          {sidebarCollapsed && (
            <button className="mt-4 flex items-center justify-center text-indigo-200 hover:text-white">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {activePage === "dashboard" && (
            <div className="bg-white shadow-sm rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                User Profile
              </h2>

              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-600 font-medium">Name:</p>
                <p className="text-gray-900 text-lg">
                  {user?.name || "Not available"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-600 font-medium">Email:</p>
                <p className="text-gray-900 text-lg">
                  {user?.email || "Not available"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-600 font-medium">Role:</p>
                <p className="text-gray-900 text-lg">
                  {user?.isAdmin ? "Admin" : "User"}
                </p>
              </div>
            </div>
          )}

          {activePage === "feedbackForm" && <FeedbackForm />}

          {activePage !== "dashboard" && activePage !== "feedbackForm" && (
            <div className="bg-white shadow-sm rounded-lg p-6 flex items-center justify-center h-64">
              <p className="text-gray-500">
                {activePage === "responses" && "Responses Content"}
                {activePage === "settings" && "Settings Content"}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
