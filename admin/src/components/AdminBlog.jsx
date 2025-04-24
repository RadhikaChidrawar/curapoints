// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { FiEdit2, FiTrash2, FiPlus, FiClock, FiEye, FiSearch, FiFilter, FiGrid, FiList, FiHome, FiSettings, FiUser, FiLogOut, FiLayout, FiBarChart2, FiMessageSquare } from "react-icons/fi";
// import { toast } from "react-toastify";

// const AdminBlogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState("grid"); // grid or list
//   const [sortBy, setSortBy] = useState("newest");

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/api/blogs");
//         setBlogs(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load blogs");
//         setLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this blog?")) {
//       try {
//         await axios.delete(`http://localhost:4000/api/blog/${id}`);
//         setBlogs(blogs.filter((blog) => blog._id !== id));
//         toast.success("Blog deleted successfully");
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to delete blog");
//       }
//     }
//   };

//   const filteredBlogs = blogs.filter(blog => 
//     blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     blog.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const sortedBlogs = [...filteredBlogs].sort((a, b) => {
//     if (sortBy === "newest") {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     } else if (sortBy === "oldest") {
//       return new Date(a.createdAt) - new Date(b.createdAt);
//     } else if (sortBy === "views") {
//       return (b.views || 0) - (a.views || 0);
//     } else if (sortBy === "title") {
//       return a.title.localeCompare(b.title);
//     }
//     return 0;
//   });

//   if (loading) {
//     return (
//       <div className="flex h-screen w-full justify-center items-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading blog posts...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Navigation */}
//         <header className="bg-white shadow-sm border-b z-10">
//           <div className="flex items-center justify-between p-4">
//             <div className="flex items-center">
//               <button className="md:hidden mr-4 text-gray-600">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//                 </svg>
//               </button>
//               <h1 className="text-xl font-semibold text-gray-800">Blog Posts Management</h1>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <FiSearch className="text-gray-400" />
//                 </span>
//                 <input 
//                   type="text" 
//                   placeholder="Search posts..." 
//                   className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <Link
//                 to="/admin/create-blog"
//                 className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all"
//               >
//                 <FiPlus className="mr-2" />
//                 New Post
//               </Link>
//             </div>
//           </div>
//         </header>
        
//         {/* Content Area */}
//         <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
//           {/* Control Panel */}
//           <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
//             <div className="mb-4 sm:mb-0">
//               <h2 className="text-lg font-medium text-gray-700">
//                 {filteredBlogs.length} {filteredBlogs.length === 1 ? 'Post' : 'Posts'} Found
//               </h2>
//               <p className="text-sm text-gray-500">Manage and organize your blog content</p>
//             </div>
//             <div className="flex items-center space-x-4 w-full sm:w-auto">
//               <div className="relative w-full sm:w-auto">
//                 <select 
//                   className="appearance-none bg-gray-50 border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700"
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="oldest">Oldest First</option>
//                   <option value="views">Most Views</option>
//                   <option value="title">Title A-Z</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                   <FiFilter size={16} />
//                 </div>
//               </div>
//               <div className="flex border rounded-lg overflow-hidden">
//                 <button 
//                   className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-600'}`}
//                   onClick={() => setViewMode('grid')}
//                 >
//                   <FiGrid />
//                 </button>
//                 <button 
//                   className={`px-3 py-2 ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-600'}`}
//                   onClick={() => setViewMode('list')}
//                 >
//                   <FiList />
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           {/* Blog Posts Display */}
//           {sortedBlogs.length === 0 ? (
//             <div className="bg-white rounded-xl shadow-sm p-8">
//               <div className="flex flex-col items-center justify-center py-12">
//                 <div className="text-gray-400 mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-medium text-gray-700">No blog posts found</h3>
//                 <p className="text-gray-500 mt-2 text-center max-w-md">
//                   {searchTerm ? `No posts matching "${searchTerm}"` : "Get started by creating your first blog post"}
//                 </p>
//                 <Link
//                   to="/admin/create-blog"
//                   className="mt-6 flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all"
//                 >
//                   <FiPlus className="mr-2" />
//                   Create New Blog
//                 </Link>
//               </div>
//             </div>
//           ) : viewMode === 'grid' ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {sortedBlogs.map((blog) => (
//                 <div key={blog._id} className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
//                   {/* Blog Image */}
//                   <div className="relative h-48 w-full overflow-hidden bg-gray-100">
//                     <img
//                       src={blog.image || "https://via.placeholder.com/600x400?text=No+Image"}
//                       alt={blog.title}
//                       className="w-full h-full object-cover transition-transform hover:scale-105"
//                     />
//                   </div>

//                   {/* Blog Content */}
//                   <div className="p-5 flex-grow flex flex-col">
//                     <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h2>
//                     <p className="text-gray-600 flex-grow line-clamp-3">{blog.description}</p>
                    
//                     {/* Tags */}
//                     {blog.tags && blog.tags.length > 0 && (
//                       <div className="mt-4 flex flex-wrap gap-2">
//                         {blog.tags.map((tag, index) => (
//                           <span key={index} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     {/* Meta Info */}
//                     <div className="mt-4 pt-3 border-t text-sm text-gray-500 flex items-center justify-between">
//                       <div className="flex items-center">
//                         <FiClock className="mr-1" />
//                         <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <FiEye className="mr-1" />
//                         <span>{blog.views || 0} views</span>
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="mt-4 flex justify-between">
//                       <Link
//                         // to={`/admin/blogs/edit/${blog._id}`}
//                         to='/admin/blogs/edit/:id'
//                         className="flex items-center justify-center text-indigo-600 hover:text-indigo-800 transition px-4 py-2 rounded-lg hover:bg-indigo-50 flex-1 mr-2"
//                       >
//                         <FiEdit2 className="mr-2" />
//                         Edit
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(blog._id)}
//                         className="flex items-center justify-center text-red-600 hover:text-red-800 transition px-4 py-2 rounded-lg hover:bg-red-50 flex-1"
//                       >
//                         <FiTrash2 className="mr-2" />
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog Post</th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
//                       <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {sortedBlogs.map((blog) => (
//                       <tr key={blog._id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="h-10 w-10 flex-shrink-0">
//                               <img 
//                                 className="h-10 w-10 rounded-md object-cover" 
//                                 src={blog.image || "https://via.placeholder.com/40x40?text=Blog"} 
//                                 alt="" 
//                               />
//                             </div>
//                             <div className="ml-4">
//                               <div className="text-sm font-medium text-gray-900">{blog.title}</div>
//                               <div className="text-sm text-gray-500 line-clamp-1">{blog.description}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-500">{blog.views || 0}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex flex-wrap gap-1">
//                             {blog.tags && blog.tags.length > 0 ? (
//                               blog.tags.slice(0, 2).map((tag, idx) => (
//                                 <span key={idx} className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700">
//                                   {tag}
//                                 </span>
//                               ))
//                             ) : (
//                               <span className="text-sm text-gray-400">No tags</span>
//                             )}
//                             {blog.tags && blog.tags.length > 2 && (
//                               <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
//                                 +{blog.tags.length - 2}
//                               </span>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <div className="flex justify-end space-x-2">
//                             <Link
//                               to={`/admin/blogs/edit/${blog._id}`}
//                               className="text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded hover:bg-indigo-50"
//                             >
//                               <FiEdit2 />
//                             </Link>
//                             <button
//                               onClick={() => handleDelete(blog._id)}
//                               className="text-red-600 hover:text-red-900 px-3 py-1 rounded hover:bg-red-50"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
          
//           {/* Pagination (Optional) */}
//           {sortedBlogs.length > 0 && (
//             <div className="mt-6 flex justify-between items-center">
//               <p className="text-sm text-gray-500">
//                 Showing <span className="font-medium">{sortedBlogs.length}</span> of {blogs.length} posts
//               </p>
//               <div className="flex space-x-1">
//                 <button className="px-4 py-2 border rounded-md text-sm bg-white text-gray-500 hover:bg-gray-50">Previous</button>
//                 <button className="px-4 py-2 border rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700">1</button>
//                 <button className="px-4 py-2 border rounded-md text-sm bg-white text-gray-500 hover:bg-gray-50">Next</button>
//               </div>
//             </div>
//           )}
//         </main>
        
//         {/* Footer */}
//         <footer className="bg-white border-t py-4 px-6">
//           <div className="flex justify-between items-center">
//             <p className="text-sm text-gray-500">© 2025 BlogAdmin Dashboard</p>
//             <p className="text-sm text-gray-500">Version 1.0.0</p>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default AdminBlogs;


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
        await axios.delete(`http://localhost:4000/api/blog/${id}`);
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