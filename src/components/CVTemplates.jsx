import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBriefcase, FiAward, FiFeather } from "react-icons/fi";

const templates = [
  {
    id: "template1",
    name: "Modern Minimal",
    description: "Temiz ve profesyonel tasarım, kurumsal pozisyonlar için ideal",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=500&auto=format&fit=crop",
    icon: <FiBriefcase className="w-6 h-6" />,
    features: ["Profesyonel düzen", "Kolay okunabilirlik", "İş odaklı tasarım"],
  },
  {
    id: "template2",
    name: "Kreatif",
    description: "Yaratıcı roller için dikkat çekici ve özgün tasarım",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=500&auto=format&fit=crop",
    icon: <FiFeather className="w-6 h-6" />,
    features: ["Benzersiz düzen", "Görsel ağırlıklı", "Portfolio entegrasyonu"],
  },
  {
    id: "template3",
    name: "Klasik",
    description: "Geleneksel ve güvenilir tasarım, tüm sektörler için uygun",
    image: "https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=500&auto=format&fit=crop",
    icon: <FiAward className="w-6 h-6" />,
    features: ["Standart format", "Zaman test edilmiş", "ATS dostu"],
  },
];

const CVTemplates = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          CV Şablonları
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Profesyonel kariyerinize uygun şablonu seçin ve özelleştirmeye başlayın
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative pb-[75%] group">
              <img
                src={template.image}
                alt={template.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-blue-600">{template.icon}</div>
                <h3 className="text-2xl font-semibold">{template.name}</h3>
              </div>
              <p className="text-gray-600 mb-6">{template.description}</p>
              <div className="space-y-2 mb-8">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-500">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                to={`/builder/${template.id}`}
                className="inline-block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 text-center hover:shadow-lg transform hover:-translate-y-0.5"
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
