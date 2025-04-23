import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-8 mt-10 drop-shadow-lg">
            Profesyonel CV'nizi Oluşturun
          </h1>

          <p className="text-2xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Modern şablonlar ve yapay zeka destekli özelliklerle CV'nizi kolayca oluşturun.
          </p>
          <Link
            to={user ? "/templates" : "/login"}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            CV Oluşturmaya Başla
          </Link>
        </motion.div>

        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-14 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-blue-700">Modern Şablonlar</h3>
              <p className="text-gray-700">
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
            <div className="bg-gradient-to-br from-purple-100 to-pink-50 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-purple-700">Yapay Zeka Desteği</h3>
              <p className="text-gray-700">
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
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-green-700">Kolay Düzenleme</h3>
              <p className="text-gray-700">
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
