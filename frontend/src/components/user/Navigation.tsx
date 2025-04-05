import { MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/store";
import useApi from "../../hook/useApi";
import { toast } from "react-toastify";

const Navigation = () => {
  const { isAuthenticated, user, clearUser } = useUserStore((state) => state);
  const navigation = useNavigate();
  const { data, refetch } = useApi({
    url: "/user/logout",
    method: "get",
    autoFetch: false,
  });
  const handlelogout = () => {
    toast.success(data?.message || "Logout successful");
    clearUser();
    refetch();
    navigation("/");
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <MessageSquare className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                FeedPulse
              </span>
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition duration-150 ease-in-out flex items-center"
                >
                  <span className="mr-2">👤</span>
                  {/* Replace with actual username from your state */}
                  {user?.name}
                </Link>
                <button
                  onClick={handlelogout}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
