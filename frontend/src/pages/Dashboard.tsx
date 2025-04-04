import { useState } from "react";
import {
  LayoutDashboard,
  FormInput,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  BarChart2,
  Users,
  Bell,
} from "lucide-react";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Sample data for dashboard
  const recentResponses = [
    { id: 1, name: "John Smith", date: "Apr 3, 2025", satisfaction: "High" },
    {
      id: 2,
      name: "Emily Johnson",
      date: "Apr 2, 2025",
      satisfaction: "Medium",
    },
    { id: 3, name: "Robert Davis", date: "Apr 1, 2025", satisfaction: "High" },
    { id: 4, name: "Sarah Wilson", date: "Mar 31, 2025", satisfaction: "Low" },
  ];

  // Sample stats for dashboard
  const stats = [
    {
      id: 1,
      name: "Total Responses",
      value: "1,284",
      icon: <MessageSquare className="h-6 w-6" />,
      change: "+12.5%",
    },
    {
      id: 2,
      name: "Completion Rate",
      value: "78%",
      icon: <BarChart2 className="h-6 w-6" />,
      change: "+3.2%",
    },
    {
      id: 3,
      name: "Avg. Satisfaction",
      value: "4.6/5",
      icon: <FormInput className="h-6 w-6" />,
      change: "+0.3",
    },
    {
      id: 4,
      name: "Active Users",
      value: "642",
      icon: <Users className="h-6 w-6" />,
      change: "+8.7%",
    },
  ];

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
                {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
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
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            {!sidebarCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium">Jane Doe</p>
                <p className="text-xs text-indigo-300">Administrator</p>
              </div>
            )}
          </div>

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
        {/* Top bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-md text-gray-500 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800">
                {activePage === "dashboard" && "Dashboard"}
                {activePage === "feedbackForm" && "Feedback Form"}
                {activePage === "responses" && "Responses"}
                {activePage === "settings" && "Settings"}
              </h1>
            </div>
            <div className="flex items-center">
              <button className="p-1 mr-4 rounded-full text-gray-500 hover:bg-gray-100 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="hidden sm:flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Jane Doe
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {activePage === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-md p-3 bg-indigo-50 text-indigo-600">
                        {stat.icon}
                      </div>
                      <div className="ml-5">
                        <p className="text-sm font-medium text-gray-500">
                          {stat.name}
                        </p>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-semibold text-gray-900">
                            {stat.value}
                          </p>
                          <p className="ml-2 text-sm font-medium text-green-600">
                            {stat.change}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Responses */}
              <div className="bg-white shadow-sm rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Recent Responses
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Latest feedback from your users
                    </p>
                  </div>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    View all
                  </button>
                </div>
                <div className="px-4 py-3 sm:px-6">
                  <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Satisfaction
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {recentResponses.map((response) => (
                          <tr key={response.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {response.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {response.date}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span
                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                  response.satisfaction === "High"
                                    ? "bg-green-100 text-green-800"
                                    : response.satisfaction === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {response.satisfaction}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  System Activity
                </h3>
                <ul className="space-y-4">
                  <li className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-700">
                        Feedback form "Customer Satisfaction" was created
                      </p>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                  </li>
                  <li className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-700">
                        5 new responses received
                      </p>
                      <span className="text-xs text-gray-500">Yesterday</span>
                    </div>
                  </li>
                  <li className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-700">
                        Monthly report generated
                      </p>
                      <span className="text-xs text-gray-500">Apr 1, 2025</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activePage !== "dashboard" && (
            <div className="bg-white shadow-sm rounded-lg p-6 flex items-center justify-center h-64">
              <p className="text-gray-500">
                {activePage === "feedbackForm" && "Feedback Form Content"}
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
