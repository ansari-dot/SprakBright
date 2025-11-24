import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';
import api from '../services/api.js'
const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus({ type: "", msg: "" });

    try { 
        console.log(form)
      const res = await api.post('/contact/add',form);
      
      if (res.data.success) {
        setStatus({ type: "success", msg: "Message sent successfully!" });

        // Clear form
        setForm({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: ""
        });
      }
    } catch (error) {
      setStatus({ type: "error", msg: "Failed to send message. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-48 md:pt-24">
        
        {/* Header Section */}
        <div className="bg-white py-12 px-4 border-b">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Contact Us</h1>
            <div className="w-20 h-1 bg-[#0098da] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Get in touch with our team for any inquiries or to schedule a service.
            </p>
          </div>
        </div>

        {/* Contact Info & Form Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#0098da] bg-opacity-10 p-3 rounded-full text-[#0098da] mr-4">
                      <FiMail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email Us</h3>
                      <p className="text-gray-600">info@sparkbrightcleaning.com</p>
                      <p className="text-gray-600">support@sparkbrightcleaning.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#15d7c6] bg-opacity-10 p-3 rounded-full text-[#15d7c6] mr-4">
                      <FiPhone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Call Us</h3>
                      <p className="text-gray-600">+1 (844) 388-0988</p>
                      <p className="text-gray-600">+1 (844) 388-0988</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#0098da] bg-opacity-10 p-3 rounded-full text-[#0098da] mr-4">
                      <FiMapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Our Location</h3>
                      <p className="text-gray-600">1886 Metro Center Dr, Reston, VA 20190</p>
                      <p className="text-gray-600">1886 Metro Center Dr, Reston, VA 20190</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#15d7c6] bg-opacity-10 p-3 rounded-full text-[#15d7c6] mr-4">
                      <FiClock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Working Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Us</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    </div>
                    <span className="text-gray-700">24/7 Customer Support</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    </div>
                    <span className="text-gray-700">Trained & Certified Staff</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    </div>
                    <span className="text-gray-700">Eco-Friendly Products</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    </div>
                    <span className="text-gray-700">100% Satisfaction Guaranteed</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

              {/* Status */}
              {status.msg && (
                <p
                  className={`text-sm mb-4 ${
                    status.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status.msg}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0098da] focus:border-transparent transition"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0098da] focus:border-transparent transition"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0098da] focus:border-transparent transition"
                    placeholder="+1 (___) ___-____"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0098da] focus:border-transparent transition"
                  >
                    <option value="">Select a service</option>
                    <option value="residential">Residential Cleaning</option>
                    <option value="commercial">Commercial Cleaning</option>
                    <option value="deep">Deep Cleaning</option>
                    <option value="move">Move In/Out Cleaning</option>
                    <option value="carpet">Carpet Cleaning</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0098da] focus:border-transparent transition"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#0098da] to-[#0683ba] text-white text-sm hover:opacity-90 active:scale-95 transition-all duration-300 py-3 px-6 rounded-full shadow-md flex items-center justify-center"
                >
                  <FiSend className="mr-2" />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-96 bg-gray-200">
          <iframe
            title="Our Location"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=123%20Cleaning%20Street,%20New%20York,%20NY%2010001+(Cleaning%20Service)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
            className="border-0"
            allowFullScreen
          ></iframe>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#0098da] to-[#0683ba] py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience the Best Cleaning Service?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Book your cleaning service today and enjoy a spotless space tomorrow!
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-[#0098da] hover:bg-gray-100 font-semibold py-2 px-6 rounded-full text-sm hover:opacity-90 active:scale-95 transition-all duration-300 shadow-md">
                Book Now
              </button>

              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-semibold py-2 px-6 rounded-full text-sm hover:opacity-90 active:scale-95 transition-all duration-300">
                Call Us: +1 (844) 388-0988
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
