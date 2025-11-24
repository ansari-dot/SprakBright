import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import OptimizedImage from "./OptimizedImage";

const blogPosts = [
  {
    id: 1,
    category: "Home Cleaning",
    title: "Expert Tips to Sanitize Your Home Effectively",
    snippet:
      "Discover professional cleaning techniques to keep your home spotless and hygienic...",
    date: "12 Feb 2022",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1581578016014-4ac6b79922fe?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    category: "Kitchen Care",
    title: "Ultimate Guide to Kitchen Deep Cleaning",
    snippet:
      "Learn the secrets to maintaining a sparkling clean kitchen with our expert guide...",
    date: "03 Feb 2022",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    category: "Office Maintenance",
    title: "Professional Office Cleaning Standards",
    snippet:
      "How to maintain a healthy and productive workspace with proper cleaning protocols...",
    date: "10 Feb 2022",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
  },
];

export default function BlogsSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden max-w-7xl mx-auto px-6 md:px-0">
      <div className="text-center mb-16">
        <span className="text-[#0098da] text-sm font-medium tracking-wider uppercase mb-4 inline-block">
          OUR BLOG
        </span>
        <h2 className="text-4xl font-bold text-gray-800 mb-6 font-poppins">
          Latest <span className="text-[#0098da]">Cleaning Tips</span> & News
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#0098da] to-[#0683ba] mx-auto"></div>
      </div>

      {/* Blog grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
          >
            {/* Image */}
            <div className="relative overflow-hidden h-60">
              <OptimizedImage
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              {/* Category Badge */}
              <div className="absolute top-4 right-4 bg-[#0098da] text-white text-xs font-medium px-3 py-1 rounded-full">
                {post.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <div className="flex items-center mr-4">
                  <FaCalendarAlt className="mr-1 text-[#0098da]" />
                  <span>{post.date}</span>
                </div>
                <span>•</span>
                <span className="ml-2">{post.readTime}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#0098da] transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">{post.snippet}</p>

              <div className="mt-auto">
                <button className="inline-flex items-center text-[#0098da] font-medium group-hover:text-[#0683ba] transition-colors">
                  Read More
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center">
        <button className="bg-gradient-to-r from-[#0098da] to-[#0683ba] text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <span className="relative z-10">View All Articles</span>
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
    </section>
  );
}
