//import React from "react";
import b1 from '../assets/BlogImages/b1.png';
import b2 from '../assets/BlogImages/b2.png';
import b3 from '../assets/BlogImages/b3.png';
import b4 from '../assets/BlogImages/b4.png';
import b5 from '../assets/BlogImages/blog1.jpg';
import b6 from '../assets/BlogImages/blog2.jpeg';

const blogs = [
  {
    id: 1,
    title: "Understanding Gynecological Health: A Guide for Women",
    category: "Gynecology",
    content: "Gynecological health is an important aspect of every woman's well-being. From menstrual health to pregnancy and menopause, knowing the essentials can help women take better care of their health...",
    image: b1,
  },
  {
    id: 2,
    title: "Pediatric Care: Ensuring a Healthy Childhood",
    category: "Pediatrics",
    content: "Pediatrics is essential for ensuring a child's growth and development. From vaccinations to nutrition, understanding the basics of pediatric health can help parents provide the best care for their children...",
    image: b2,
  },
  {
    id: 3,
    title: "Common Gynecological Issues and Their Treatments",
    category: "Gynecology",
    content: "Many women face common gynecological issues like PCOS, endometriosis, and fibroids. Knowing the symptoms, causes, and treatments can help in early diagnosis and better management...",
    image: b3,
  },
  {
    id: 4,
    title: "Importance of Regular Pediatric Checkups",
    category: "Pediatrics",
    content: "Regular pediatric checkups are crucial to ensure a child’s overall health. Learn about vaccination schedules, growth monitoring, and preventive care...",
    image: b4,
  },
  {
    id: 5,
    title: "Nutrition Tips for a Healthy Lifestyle",
    category: "Nutrition",
    content: "Good nutrition plays a vital role in maintaining overall health. A balanced diet rich in fruits, vegetables, whole grains, and lean proteins can boost energy, support immunity, and improve mental well-being...",
    image: b5,
  },
  {
    id: 6,
    title: "Mental Health Matters: Managing Stress and Anxiety",
    category: "Mental Health",
    content: "Taking care of your mental health is just as important as your physical well-being. Practicing mindfulness, getting enough sleep, and seeking support when needed can help manage stress and improve emotional balance...",
    image: b6,
  }
  
];

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Explore Our Latest Health Blogs</h1>
        <p className="text-lg text-gray-600 mt-3">
          Stay informed with expert insights on gynecology, pediatrics, and overall well-being.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
            <p className="text-sm font-medium text-indigo-600 mb-3">{blog.category}</p>
            <p className="text-gray-700 leading-relaxed">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
