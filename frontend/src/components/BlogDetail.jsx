import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiClock, FiShare2 } from "react-icons/fi";
import { toast } from "react-toastify";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/api/blog/${id}`);
        if (!res.data) {
          throw new Error("Blog not found");
        }
        setBlog(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load blog post");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: blog.title,
          text: blog.description,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-5">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Blog post not found
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <FiArrowLeft className="mr-2" /> Back to Blogs
      </button>

      {/* Blog Content */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={blog.image || "https://via.placeholder.com/800x400?text=Blog+Image"}
          alt={blog.title}
          className="w-full max-h-[500px] object-contain bg-gray-100"
        />

        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <FiClock /> {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <button
              onClick={handleShare}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
            >
              <FiShare2 /> Share
            </button>
          </div>

          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-700 leading-7 whitespace-pre-line">
            {blog.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;


