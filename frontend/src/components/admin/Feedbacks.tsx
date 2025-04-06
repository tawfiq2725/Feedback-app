import { useEffect, useState } from "react";
import { Feedback } from "../../types/fb.types";
import useApi from "../../hook/useApi";
import PremiumFeedbackPreview from "../FeedbackPreview";

const Feedbacks = () => {
  const [staticFeedbacks, setStaticFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const FEEDBACKS_PER_PAGE = 5;

  const { data } = useApi({
    url: "/fb/feedbacks",
    method: "get",
    body: null,
    autoFetch: true,
  });

  useEffect(() => {
    if (data?.data) {
      setStaticFeedbacks(data.data);
    }
  }, [data]);

  const totalPages = Math.ceil(staticFeedbacks.length / FEEDBACKS_PER_PAGE);
  const startIndex = (currentPage - 1) * FEEDBACKS_PER_PAGE;
  const currentFeedbacks = staticFeedbacks.slice(
    startIndex,
    startIndex + FEEDBACKS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Feedbacks</h2>
        <div className="flex flex-col md:flex-row">
          {/* Feedback list */}
          <div className="flex-1 md:w-1/2 border-r border-gray-200 pr-4">
            <ul className="space-y-2">
              {currentFeedbacks.map((feedback) => (
                <li
                  key={feedback._id}
                  onClick={() => setSelectedFeedback(feedback)}
                  className={`p-2 rounded-md cursor-pointer ${
                    selectedFeedback && selectedFeedback._id === feedback._id
                      ? "bg-indigo-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <p className="text-gray-800 font-medium">{feedback.name}</p>
                  <p className="text-gray-600 text-sm">
                    {feedback.message.substring(0, 50)}...
                  </p>
                </li>
              ))}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-indigo-500 text-white disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-indigo-500 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* Feedback preview */}
          {selectedFeedback && (
              <PremiumFeedbackPreview selectedFeedback={selectedFeedback}/>
          )}
        </div>
      </div>
    </>
  );
};

export default Feedbacks;
