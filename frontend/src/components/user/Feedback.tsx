import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hook/useApi"; // Assuming the same API hook is used
import { useUserStore } from "../../store/store";

const FeedbackForm = () => {
  const { user,setUser } = useUserStore((state) => state);
  if (!user || !user._id) {
    return (
      <div className="text-center">Please login to submit feedback again</div>
    );
  }
  const [formData, setFormData] = useState({
    name: "",
    gender: "male" as const, // Default value
    nationality: "",
    email: "",
    phoneNumber: "",
    address: "",
    message: "",
    userId: user._id,
  });

  const [errors, setErrors] = useState({
    name: "",
    gender: "",
    nationality: "",
    email: "",
    phoneNumber: "",
    address: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      gender: "",
      nationality: "",
      email: "",
      phoneNumber: "",
      address: "",
      message: "",
    };

    // Name validation (no numbers, required)
    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name cannot contain numbers";
      isValid = false;
    }

    // Gender validation (required)
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    // Nationality validation (no numbers, required)
    if (!formData.nationality) {
      newErrors.nationality = "Nationality is required";
      isValid = false;
    } else if (/\d/.test(formData.nationality)) {
      newErrors.nationality = "Nationality cannot contain numbers";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Phone number validation (required, only numbers allowed)
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
      isValid = false;
    } else if (/^(\d)\1{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number cannot have all same digits";
      isValid = false;
    }

    // Address validation (no numbers, required)
    if (!formData.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    // Message validation (required)
    if (!formData.message) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const { data, loading, refetch } = useApi({
    url: "/fb/feedback",
    method: "post",
    body: formData,
    params: null,
    autoFetch: false,
  });

  useEffect(() => {
    if (!loading) {
      setIsSubmitting(false);
      if (data && data.success) {
        setFormData({
          name: "",
          gender: "male",
          nationality: "",
          email: "",
          phoneNumber: "",
          address: "",
          message: "",
          userId: user._id,
        });
        
        navigate("/auth/dashboard"); 
      } else {
        if (data && data.message) {
          console.log(data.message);
        }
      }
    }
  }, [loading, data, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      refetch();
      setTimeout(() => {
        console.log("Feedback submitted", formData);
        setUser({ ...user, count: (user.count || 0) + 1 });
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <MessageSquare className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Submit Your Feedback
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Help us improve by sharing your thoughts
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <div className="mt-1">
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.gender ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-indigo-500 sm:text-sm`}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-2 text-sm text-red-600">{errors.gender}</p>
                )}
              </div>
            </div>

            {/* Nationality */}
            <div>
              <label
                htmlFor="nationality"
                className="block text-sm font-medium text-gray-700"
              >
                Nationality
              </label>
              <div className="mt-1">
                <input
                  id="nationality"
                  name="nationality"
                  type="text"
                  value={formData.nationality}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.nationality ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Your nationality"
                />
                {errors.nationality && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.nationality}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.phoneNumber ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="1234567890"
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.address ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Your address"
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.message ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Your feedback or message"
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
