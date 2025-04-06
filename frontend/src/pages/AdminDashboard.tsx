import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  LogOut,
  X,
  ChevronRight,
  ClipboardList,
} from "lucide-react";
import { useUserStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import useApi from "../hook/useApi";
import Feedbacks from "../components/admin/Feedbacks";

const AdminDashboard = () => {
  const { clearUser } = useUserStore((state) => state);
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const { data } = useApi({
    url: "/admin/dashboard",
    method: "get",
    body: null,
    autoFetch: true,
  });
  useEffect(() => {
    if (data) {
      setTotalUsers(data.data.totalUsers);
      setTotalFeedbacks(data.data.totalFeedbacks);
    }
  }, [data]);

  // Sidebar and page state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("overview");


  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Logout handler (static, can implement later)
  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-indigo-800 text-white transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "w-16" : "w-64"
        } flex flex-col`}
      >
        {/* Logo and toggle */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-700">
          <MessageSquare className="h-8 w-8 text-white" />
          {!sidebarCollapsed && (
            <span className="ml-2 text-xl font-bold">FeedPulse Admin</span>
          )}
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
                onClick={() => {
                  setActivePage("overview");
                }}
                className={`flex items-center w-full p-2 rounded-md ${
                  activePage === "overview"
                    ? "bg-indigo-900 text-white"
                    : "text-indigo-200 hover:bg-indigo-700"
                }`}
              >
                <LayoutDashboard className="h-5 w-5" />
                {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActivePage("allFeedbacks");
                }}
                className={`flex items-center w-full p-2 rounded-md ${
                  activePage === "allFeedbacks"
                    ? "bg-indigo-900 text-white"
                    : "text-indigo-200 hover:bg-indigo-700"
                }`}
              >
                <ClipboardList className="h-5 w-5" />
                {!sidebarCollapsed && (
                  <span className="ml-3">All Feedbacks</span>
                )}
              </button>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-indigo-700 hover:bg-indigo-700">
          {!sidebarCollapsed ? (
            <button
              onClick={handleLogout}
              className="mt-4 py-2 flex items-center text-indigo-200 hover:text-white text-sm"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          ) : (
            <button className="mt-4 flex items-center justify-center text-indigo-200 hover:text-white">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {activePage === "overview" && (
            <div className="bg-white shadow-sm rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Admin Dashboard Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-600 font-medium">Total Users:</p>
                  <p className="text-gray-900 text-lg">{totalUsers}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-600 font-medium">Total Feedbacks:</p>
                  <p className="text-gray-900 text-lg">{totalFeedbacks}</p>
                </div>
              </div>
            </div>
          )}
          {activePage === "allFeedbacks" && <Feedbacks  />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
