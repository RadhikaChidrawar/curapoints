import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/blogs/`);
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleconsol = (blog) => {
    console.log("Blog ID:", blog._id);
    console.log("Navigating to:", `/blog/${blog._id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-2">Health & Wellness Blog</h1>
      <p className="text-gray-600 mb-5">Expert advice and latest health information</p>

      {/* Blog Posts Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/blog/${blog._id}`)}
            >
              <div className="h-48 bg-gray-100 overflow-hidden">
                <img
                  src={blog.image || "https://via.placeholder.com/400x300?text=Blog"}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                    {blog.category || "General"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {blog.description}
                </p>
                <div className="flex justify-between items-center">
                  <Link to={`/blog/${blog._id}`}>
                    <button
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleconsol(blog);
                      }}
                    >
                      Read More →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No blog posts found.</p>
            <button
              onClick={() => navigate("/blogs")}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              View all articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBlogs;
