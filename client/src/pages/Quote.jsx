import React, { useState } from "react";
import PageTransition from "../components/PageTransition";
import api from "../services/api"; // Import the API instance

const Quote = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "", // New field
    numRooms: "", // New field
    cleaningFrequency: "", // New field
    preferredDate: "", // New field
    service: "",
    message: "",
    specialInstructions: "", // New field
  });
  const [submitStatus, setSubmitStatus] = useState(null); // To show success or error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("submitting");
    try {
      const response = await api.post("/quote/submit", formData);
      console.log("Quote submitted successfully:", response.data);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      }); // Clear form
    } catch (error) {
      console.error("Error submitting quote:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <PageTransition>
      <div className="bg-white relative overflow-hidden font-sans pt-48 md:pt-24">
        {/* Header Section */}
        <div className="bg-white py-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Get a Free Quote</h1>
            <div className="w-20 h-1 bg-[#0098da] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Tell us about your cleaning needs and we'll get back to you with a personalized quote.
            </p>
          </div>
        </div>

        {/* Quote Form Section */}
        <section className="w-full py-20 container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Request Your Quote</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0098da] focus:border-[#0098da] sm:text-sm" placeholder="Your Name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0098da] focus:border-[#0098da] sm:text-sm" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0098da] focus:border-[#0098da] sm:text-sm" placeholder="(123) 456-7890" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">Property Type</label>
                  <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0098da] focus:border-[#0098da] sm:text-sm" required>
                    <option value="">Select Property Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="numRooms" className="block text-sm font-medium text-gray-700">Number of Rooms / Area Size</label>
                  <input type="text" id="numRooms" name="numRooms" value={formData.numRooms} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0098da] focus:border-[#0098da] sm:text-sm" placeholder="e.g., 3 bedrooms, 1500 sq ft" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cleaningFrequency" className="block text-sm font-medium text-gray-700">Cleaning Frequency</label>
                  <select id="cleaningFrequency" name="cleaningFrequency" value={formData.cleaningFrequency} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0098da] focus:border-[#0098da] sm:text-sm">
                    <option value="">Select Frequency</option>
                    <option value="one-time">One-time</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                  <input type="date" id="preferredDate" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0098da] focus:border-[#0098da] sm:text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service of Interest</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0098da] focus:border-[#0098da] sm:text-sm">
                  <option value="">Select a service</option>
                  <option value="residential">Residential Cleaning</option>
                  <option value="commercial">Commercial Cleaning</option>
                  <option value="deep">Deep Cleaning</option>
                  <option value="post_construction">Post-Construction Cleaning</option>
                </select>
              </div>
              <div>
                <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700">Special Instructions</label>
                <textarea id="specialInstructions" name="specialInstructions" rows="4" value={formData.specialInstructions} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0098da] focus:border-[#0098da] sm:text-sm" placeholder="Any specific instructions or requests?"></textarea>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#0098da] focus:border-[#0098da] sm:text-sm" placeholder="Tell us more about your cleaning needs..."></textarea>
              </div>
              <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#0098da] hover:bg-[#007bb5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0098da] hover:scale-105 transition-all duration-300" disabled={submitStatus === "submitting"}>
                  {submitStatus === "submitting" ? "Submitting..." : "Submit Request"}
                </button>
              </div>
              {submitStatus === "success" && (
                <p className="mt-4 text-center text-green-600">Your quote request has been sent successfully!</p>
              )}
              {submitStatus === "error" && (
                <p className="mt-4 text-center text-red-600">There was an error submitting your request. Please try again.</p>
              )}
            </form>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Quote;
