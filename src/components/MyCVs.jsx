import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

const MyCVs = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const q = query(collection(db, "cvs"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const cvsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCvs(cvsData);
      } catch (error) {
        console.error("CVler yüklenirken hata:", error);
        toast.error("CVler yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchCVs();
  }, [user]);

  const handleEdit = (cvId) => {
    navigate(`/builder/${cvId}`);
  };

  const handleDelete = async (cvId) => {
    if (window.confirm("Bu CV'yi silmek istediğinizden emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "cvs", cvId));
        setCvs((prev) => prev.filter((cv) => cv.id !== cvId));
        toast.success("CV başarıyla silindi");
      } catch (error) {
        console.error("CV silinirken hata:", error);
        toast.error("CV silinirken bir hata oluştu");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">CV'lerim</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/templates")}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            <span>Yeni CV Oluştur</span>
          </motion.button>
        </div>

        {cvs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Henüz bir CV oluşturmadınız.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/templates")}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              <span>İlk CV'nizi Oluşturun</span>
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cvs.map((cv) => (
              <motion.div
                key={cv.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {cv.content?.personalInfo?.fullName || "İsimsiz CV"}
                    </h3>
                    <p className="text-gray-600">
                      {cv.content?.personalInfo?.title || "Başlık belirtilmemiş"}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(cv.id)}
                      className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cv.id)}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Son güncelleme:{" "}
                  {new Date(cv.updatedAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCVs;
