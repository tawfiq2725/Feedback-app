import { Star } from "lucide-react";

const HeroSection = () => {
  return (
    <>
      <div className="relative pt-16 pb-24 sm:pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Collect valuable</span>
                <span className="block text-indigo-600">customer feedback</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
                Create beautiful surveys that your customers will love to
                answer. Get actionable insights to improve your products and
                services.
              </p>
              <div className="mt-8 sm:mt-10">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get Started
                  </a>
                </div>
                <div className="mt-3">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    View Demo
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2">
              <div className="flex justify-center">
                <div className="rounded-lg shadow-xl bg-white p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <Star className="h-5 w-5 text-yellow-400" />
                      <Star className="h-5 w-5 text-yellow-400" />
                      <Star className="h-5 w-5 text-yellow-400" />
                      <Star className="h-5 w-5 text-yellow-400" />
                    </div>
                    <span className="text-sm text-gray-500">2 minutes ago</span>
                  </div>
                  <p className="text-gray-700 italic">
                    "The survey platform is incredibly intuitive and has helped
                    us gather valuable insights from our customers."
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="font-semibold text-indigo-700">JD</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Jane Doe
                      </p>
                      <p className="text-sm text-gray-500">
                        Product Manager, Tech Co.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default HeroSection;
