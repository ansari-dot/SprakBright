
import { FaCalendarAlt, FaArrowRight, FaSpinner } from "react-icons/fa";
import OptimizedImage from "./OptimizedImage";
import api, { resolveImageUrl } from "../services/api";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
/*const blogPosts = [
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
]; */

export default function BlogsSection() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching blog posts...');
      const res = await api.get("/blogs/get");
      console.log('Fetched blogs:', res.data);
      
      // Handle both old and new response formats
      const blogs = res.data?.data || res.data || [];
      
      // Ensure all image paths are properly resolved
      const blogsWithResolvedImages = blogs.map(blog => ({
        ...blog,
        image: resolveImageUrl(blog.image || blog.featuredImage)
      }));
      
      // Show only the first 3 blog posts
      const firstThreeBlogs = Array.isArray(blogsWithResolvedImages) ? blogsWithResolvedImages.slice(0, 3) : [];
      setBlogPosts(firstThreeBlogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please try again later.");
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <FaSpinner className="animate-spin text-4xl text-[#0098da]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchAll}
          className="mt-4 px-6 py-2 bg-[#0098da] text-white rounded-md hover:bg-[#0683ba] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

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
        {blogPosts.length > 0 ? blogPosts.map((post) => (
          <article
            key={post._id || post.id}
            className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
            {/* Image */}
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <OptimizedImage
                src={resolveImageUrl(post.image)}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  const originalSrc = post.image || post.featuredImage;
                  const resolvedUrl = resolveImageUrl(originalSrc);
                  console.error('Blog image loading error:', {
                    originalSrc,
                    resolvedUrl,
                    blogId: post._id,
                    blogTitle: post.title
                  });
                  // Set a fallback image
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkJsb2cgSW1hZ2UgVW5hdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                }}
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
                  <span>{formatDate(post.createdAt || post.publishedAt || post.date)}</span>
                </div>
                <span>•</span>
                <span className="ml-2">{post.readTime || '5 min read'}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#0098da] transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">{post.excerpt || post.snippet || post.content?.substring(0, 150) + '...'}</p>

              <div className="mt-auto">
                <Link
                  to={`/blog/${post.slug || post._id}`}
                  className="inline-flex items-center text-[#0098da] font-medium group-hover:text-[#0683ba] transition-colors"
                >
                  Read More
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        )) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No blog posts found.</p>
          </div>
        )}
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
