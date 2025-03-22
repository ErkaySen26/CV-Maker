import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import CreateCV from "./CreateCV";

function EditCV() {
  const [cv, setCV] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { cvId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const cvDoc = await getDoc(doc(db, "cvs", cvId));
        if (!cvDoc.exists()) {
          setError("CV bulunamadı.");
          return;
        }

        const cvData = cvDoc.data();
        if (cvData.userId !== currentUser.uid) {
          setError("Bu CV'ye erişim izniniz yok.");
          return;
        }

        setCV(cvData);
      } catch (err) {
        console.error("Error fetching CV:", err);
        setError("CV yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchCV();
  }, [cvId, currentUser]);

  const handleUpdate = async (updatedData) => {
    try {
      await updateDoc(doc(db, "cvs", cvId), {
        ...updatedData,
        updatedAt: new Date(),
      });
      navigate(`/preview-cv/${cvId}`);
    } catch (err) {
      console.error("Error updating CV:", err);
      setError("CV güncellenirken bir hata oluştu.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  if (!cv) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">CV Düzenle</h1>
        <button
          onClick={() => navigate(`/preview-cv/${cvId}`)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Önizleme
        </button>
      </div>

      <CreateCV
        initialData={cv}
        onSubmit={handleUpdate}
        isEditing={true}
        cvId={cvId}
      />
    </div>
  );
}

export default EditCV;
