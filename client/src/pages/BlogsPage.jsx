import { useState, useEffect } from "react";
import { FaCalendarAlt, FaArrowRight, FaSpinner, FaSearch, FaArrowLeft } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import OptimizedImage from "../components/OptimizedImage";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [singlePost, setSinglePost] = useState(null);
  const [isSinglePost, setIsSinglePost] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = id ? `/blogs/get/${id}` : '/blogs/get';
      const res = await api.get(endpoint);
      
      if (id) {
        // Handle both old and new response formats for single post
        const postData = res.data?.data || res.data;
        setSinglePost(postData);
        setIsSinglePost(true);
      } else {
        // Handle both old and new response formats for multiple posts
        const blogsData = res.data?.data || res.data || [];
        setBlogs(Array.isArray(blogsData) ? blogsData : []);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(id ? "Failed to load blog post" : "Failed to load blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-[#0098da]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={fetchBlogs}
          className="px-6 py-2 bg-[#0098da] text-white rounded-md hover:bg-[#0683ba] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isSinglePost && singlePost) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#0098da] hover:text-[#0683ba] mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </button>
          
          <article className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-96">
              <OptimizedImage
                src={singlePost.featuredImage || singlePost.image}
                alt={singlePost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="bg-[#0098da] text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                  {singlePost.category || "Uncategorized"}
                </div>
                <h1 className="text-3xl font-bold text-white">{singlePost.title}</h1>
                <div className="flex items-center text-white/90 mt-4">
                  <FaCalendarAlt className="mr-2" />
                  <span>{formatDate(singlePost.publishedAt || singlePost.createdAt || singlePost.date)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: singlePost.content }} />
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-28">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0098da] to-[#0683ba] text-white py-16 md:py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover the latest cleaning tips, industry news, and professional advice
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0098da]"
              />
              <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-6 pb-16 pt-8">
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog._id || blog.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
              >
                <div className="relative h-60">
                  <OptimizedImage
                    src={blog.featuredImage || blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#0098da] text-white text-xs font-medium px-3 py-1 rounded-full">
                    {blog.category || "Uncategorized"}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <FaCalendarAlt className="mr-2 text-[#0098da]" />
                    <span>{formatDate(blog.publishedAt || blog.createdAt || blog.date)}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-[#0098da] transition-colors">
                    <Link to={`/blog/${blog.slug}`} className="hover:underline">
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {blog.excerpt || blog.snippet || (blog.content?.substring(0, 150) + '...')}
                  </p>
                  <Link
                    className="inline-flex items-center text-[#0098da] font-medium hover:text-[#0683ba] transition-colors mt-auto"
                  >
                    Read More
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {searchTerm ? "No matching articles found" : "No blog posts available yet"}
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try a different search term"
                : "Check back soon for new articles!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
