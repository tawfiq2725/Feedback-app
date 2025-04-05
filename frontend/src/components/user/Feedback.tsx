import { useState } from "react";
import { useForm } from "react-hook-form";

const FeedbackForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data:any) => {
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form submitted:", data);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      reset();

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Feedback Form</h2>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Your feedback has been submitted successfully. Thank you!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message?.toString()}</p>
          )}
        </div>

        {/* Gender Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="male"
                {...register("gender", { required: "Please select a gender" })}
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                value="female"
                {...register("gender", { required: "Please select a gender" })}
              />
              <span className="ml-2">Female</span>
            </label>
            
          </div>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message?.toString()}</p>
          )}
        </div>

        {/* Nationality Field */}
        <div>
          <label
            htmlFor="nationality"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nationality
          </label>
          <select
            id="nationality"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.nationality ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            {...register("nationality", {
              required: "Please select your nationality",
            })}
          >
            <option value="">Select Nationality</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="au">Australia</option>
            <option value="in">India</option>
            <option value="other">Other</option>
          </select>
          {errors.nationality && (
            <p className="mt-1 text-sm text-red-600">
              {errors.nationality.message?.toString()}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message?.toString()}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9+-]{10,15}$/,
                message: "Please enter a valid phone number",
              },
            })}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message?.toString()}</p>
          )}
        </div>

        {/* Address Field */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <textarea
            id="address"
            rows={3}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.address ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            {...register("address", { required: "Address is required" })}
          ></textarea>
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.message?.toString()}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Feedback
          </label>
          <textarea
            id="message"
            rows={5}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.message ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            {...register("message", {
              required: "Feedback message is required",
              minLength: {
                value: 10,
                message: "Message should be at least 10 characters",
              },
            })}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message?.toString()}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-800 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
