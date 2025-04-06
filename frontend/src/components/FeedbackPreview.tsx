type Feedback = {
    selectedFeedback:{
        _id: string;
        name: string;
        gender: string;
        email: string;
        phoneNumber: string;
        address: string;
        nationality: string;
        message: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }
}
const PremiumFeedbackPreview = ({ selectedFeedback }:Feedback) => {
  return (
    <div className="flex-1 md:w-1/2 pl-4">
      {selectedFeedback ? (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            Feedback Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Personal Information</h4>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-600 w-24">Name:</span>
                    <span className="font-medium text-gray-800">{selectedFeedback.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-24">Gender:</span>
                    <span className="font-medium text-gray-800">{selectedFeedback.gender}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-24">Nationality:</span>
                    <span className="font-medium text-gray-800">{selectedFeedback.nationality}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Contact Details</h4>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-600 w-24">Email:</span>
                    <span className="font-medium text-gray-800">{selectedFeedback.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-24">Phone:</span>
                    <span className="font-medium text-gray-800">{selectedFeedback.phoneNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-24">Date:</span>
                    <span className="font-medium text-gray-800">
                      {new Date(selectedFeedback.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Address</h4>
            <p className="mt-2 text-gray-800 font-medium">{selectedFeedback.address}</p>
          </div>

          <div className="mt-6">
            <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Message</h4>
            <div className="mt-2 p-4 bg-gray-50 rounded-md">
              <p className="text-gray-800">{selectedFeedback.message}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 flex items-center justify-center h-64">
          <p className="text-gray-500 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Select a feedback to view details
          </p>
        </div>
      )}
    </div>
  );
};

export default PremiumFeedbackPreview;