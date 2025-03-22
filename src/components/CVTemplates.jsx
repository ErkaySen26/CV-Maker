import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const templates = [
  {
    id: "template1",
    name: "Modern Minimal",
    description: "Temiz ve profesyonel tasarım",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "template2",
    name: "Kreatif",
    description: "Yaratıcı roller için ideal tasarım",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "template3",
    name: "Klasik",
    description: "Geleneksel ve güvenilir tasarım",
    image: "https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=500&auto=format&fit=crop",
  },
];

const CVTemplates = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          CV Şablonları
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Profesyonel kariyerinize uygun şablonu seçin ve özelleştirmeye başlayın
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative pb-[75%]">
              <img
                src={template.image}
                alt={template.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <Link
                to={`/builder/${template.id}`}
                className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Bu Şablonu Kullan
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CVTemplates;
