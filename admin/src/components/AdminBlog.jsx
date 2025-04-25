import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/blogs");
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load blogs");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`https://curapoints-backend.onrender.com/api/blog/${id}`);
        setBlogs(blogs.filter((blog) => blog._id !== id));
        toast.success("Blog deleted successfully");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete blog");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">All Blog Posts</h1>
        <Link
          to="/admin/create-blog"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Create New Blog
        </Link>
      </div>

      <div className="w-full flex flex-wrap gap-5">
        {blogs.map((blog) => (
          <div 
            key={blog._id} 
            className="border border-gray-200 rounded-xl overflow-hidden w-full max-w-[280px] hover:shadow-md transition-shadow group"
          >
            {/* Blog Image */}
            <div className="h-40 bg-gray-100 group-hover:bg-gray-200 transition-colors overflow-hidden">
              <img 
                src={blog.image || "https://via.placeholder.com/400x300?text=No+Image"} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Blog Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{blog.title}</h2>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{blog.description}</p>
              
              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{blog.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Meta Info */}
              <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                <span>{blog.views || 0} views</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-between border-t pt-3">
                <Link
                  to={`/admin/blogs/edit/${blog._id}`}
                  className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No blog posts found. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
