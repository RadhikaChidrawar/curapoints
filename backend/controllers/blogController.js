// // controllers/blogController.js
// import Blog from '../models/BlogModule.js';

// // Create blog
// export const createBlog = async (req, res) => {
//   try {
//     const blog = await Blog.create(req.body);
//     res.status(201).json(blog);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all blogs
// export const getBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update blog
// export const updateBlog = async (req, res) => {
//   try {
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedBlog);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete blog
// export const deleteBlog = async (req, res) => {
//   try {
//     await Blog.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Blog deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// import Blog from '../models/blogModel.js'; // Correct import path for your model

// // Create blog
// export const createBlog = async (req, res) => {
//   try {
//     const blog = await Blog.create(req.body);
//     res.status(201).json(blog);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all blogs
// export const getBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update blog
// export const updateBlog = async (req, res) => {
//   try {
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedBlog);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // controllers/blogController.js
// import Blog from '../models/BlogModule.js';

// // Get blog by ID
// export const getBlogById = async (req, res) => {
//   try {
//     // Fetch the blog using the ID from the URL
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     res.status(200).json(blog); // Return the blog data
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update blog by ID
// export const updateBlog = async (req, res) => {
//   try {
//     // Find the blog and update it using the ID and the new data
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       req.params.id, // The blog ID to update
//       req.body, // The new data to update
//       { new: true } // Return the updated blog
//     );
//     if (!updatedBlog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     res.status(200).json(updatedBlog); // Return the updated blog data
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // Delete blog
// export const deleteBlog = async (req, res) => {
//   try {
//     await Blog.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Blog deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



import Blog from '../models/BlogModule.js'; // Import the correct model (ensure this is the correct path)

// Create blog
export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update blog by ID
export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,  // The blog ID to update
      req.body,       // The new data to update
      { new: true }   // Return the updated blog
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
