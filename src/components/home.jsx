import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FiFileText, FiUser, FiMessageSquare } from "react-icons/fi";

const features = [
  {
    icon: <FiFileText className="w-6 h-6" />,
    title: "Profesyonel CV Şablonları",
    description: "Modern şablonlar ve akıllı özellikler ile dakikalar içinde etkileyici bir CV oluşturun",
  },
  {
    icon: <FiUser className="w-6 h-6" />,
    title: "Kişiselleştirilebilir Profil",
    description: "CV'nizi kendi tarzınıza göre özelleştirin",
  },
  {
    icon: <FiMessageSquare className="w-6 h-6" />,
    title: "CV Asistanı",
    description: "AI destekli CV yazım asistanı ile mükemmel CV'ler oluşturun",
  },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-24">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Profesyonel CV'nizi Oluşturun
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Modern şablonlar ve akıllı özellikler ile dakikalar içinde etkileyici
            bir CV oluşturun
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to={user ? "/templates" : "/register"}
              className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300"
            >
              {user ? "CV Oluşturmaya Başla" : "Ücretsiz Başla"}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
