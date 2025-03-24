import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Profesyonel CV'nizi Oluşturun
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Modern şablonlar ve yapay zeka destekli özelliklerle CV'nizi kolayca oluşturun.
          </p>
          <Link
            to={currentUser ? "/templates" : "/login"}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            CV Oluşturmaya Başla
          </Link>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Modern Şablonlar</h3>
              <p className="text-gray-600">
                Profesyonel ve modern tasarlanmış CV şablonları ile öne çıkın
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Yapay Zeka Desteği</h3>
              <p className="text-gray-600">
                Yapay zeka ile CV'nizi optimize edin ve öneriler alın
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Kolay Düzenleme</h3>
              <p className="text-gray-600">
                Sürükle-bırak arayüzü ile CV'nizi kolayca düzenleyin
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
