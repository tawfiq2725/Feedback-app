import { MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center md:justify-start">
            <MessageSquare className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-lg font-bold text-gray-800">
              FeedPulse
            </span>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-center text-base text-gray-500">
              &copy; 2025 FeedPulse. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
