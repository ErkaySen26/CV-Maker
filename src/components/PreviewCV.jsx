import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import html2pdf from "html2pdf.js";

function PreviewCV() {
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

  // useCallback ile optimize edilmiş PDF indirme fonksiyonu
  const handleDownloadPDF = React.useCallback(() => {
    const element = document.getElementById("cv-preview");
    const opt = {
      margin: 1,
      filename: `${cv.personalInfo.fullName || "CV"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  });

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
        <h1 className="text-3xl font-bold">CV Önizleme</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate(`/edit-cv/${cvId}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Düzenle
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            PDF İndir
          </button>
        </div>
      </div>

      <div
        id="cv-preview"
        className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto"
      >
        {/* Kişisel Bilgiler */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {cv.personalInfo.fullName}
          </h1>
          <div className="text-gray-600 space-y-1">
            {cv.personalInfo.email && <p>{cv.personalInfo.email}</p>}
            {cv.personalInfo.phone && <p>{cv.personalInfo.phone}</p>}
            {cv.personalInfo.address && <p>{cv.personalInfo.address}</p>}
            {cv.personalInfo.linkedin && (
              <p>
                <a
                  href={cv.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  LinkedIn
                </a>
              </p>
            )}
            {cv.personalInfo.website && (
              <p>
                <a
                  href={cv.personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Website
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Eğitim */}
        {cv.education.some((edu) => edu.school || edu.degree) && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">Eğitim</h2>
            {cv.education.map(
              (edu, index) =>
                edu.school && (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-lg">{edu.school}</h3>
                    {edu.degree && (
                      <p className="text-gray-700">
                        {edu.degree}
                        {edu.field && ` - ${edu.field}`}
                      </p>
                    )}
                    <p className="text-gray-600">
                      {edu.startDate && edu.endDate
                        ? `${edu.startDate} - ${edu.endDate}`
                        : ""}
                    </p>
                    {edu.gpa && <p className="text-gray-600">Not: {edu.gpa}</p>}
                    {edu.description && (
                      <p className="mt-2 text-gray-700">{edu.description}</p>
                    )}
                  </div>
                )
            )}
          </section>
        )}

        {/* İş Deneyimi */}
        {cv.experience.some((exp) => exp.company || exp.position) && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
              İş Deneyimi
            </h2>
            {cv.experience.map(
              (exp, index) =>
                exp.company && (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-lg">{exp.company}</h3>
                    <div className="flex items-center gap-2">
                      {exp.position && (
                        <p className="text-gray-700 font-medium">
                          {exp.position}
                        </p>
                      )}
                      {exp.location && (
                        <p className="text-gray-600">• {exp.location}</p>
                      )}
                    </div>
                    <p className="text-gray-600">
                      {exp.startDate &&
                        `${exp.startDate} - ${
                          exp.current ? "Devam Ediyor" : exp.endDate || ""
                        }`}
                    </p>
                    {exp.description && (
                      <p className="mt-2 text-gray-700">{exp.description}</p>
                    )}
                  </div>
                )
            )}
          </section>
        )}

        {/* Yetenekler */}
        {cv.skills.some(
          (skill) => skill.category && skill.items.length > 0
        ) && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
              Yetenekler
            </h2>
            {cv.skills.map(
              (skill, index) =>
                skill.category && (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {skill.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map(
                        (item, i) =>
                          item && (
                            <span
                              key={i}
                              className="bg-gray-200 px-3 py-1 rounded text-gray-700"
                            >
                              {item}
                            </span>
                          )
                      )}
                    </div>
                  </div>
                )
            )}
          </section>
        )}

        {/* Diller */}
        {cv.languages.some((lang) => lang.language) && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">Diller</h2>
            <div className="grid grid-cols-2 gap-4">
              {cv.languages.map(
                (lang, index) =>
                  lang.language && (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium">{lang.language}</span>
                      <span className="text-gray-600">{lang.proficiency}</span>
                    </div>
                  )
              )}
            </div>
          </section>
        )}

        {/* Sertifikalar */}
        {cv.certifications.some((cert) => cert.name) && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
              Sertifikalar
            </h2>
            {cv.certifications.map(
              (cert, index) =>
                cert.name && (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-lg">
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {cert.name}
                        </a>
                      ) : (
                        cert.name
                      )}
                    </h3>
                    <p className="text-gray-700">{cert.issuer}</p>
                    {cert.date && <p className="text-gray-600">{cert.date}</p>}
                  </div>
                )
            )}
          </section>
        )}

        {/* Projeler */}
        {cv.projects.some((project) => project.name) && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
              Projeler
            </h2>
            {cv.projects.map(
              (project, index) =>
                project.name && (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-lg">
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    {project.description && (
                      <p className="text-gray-700 mt-1">
                        {project.description}
                      </p>
                    )}
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.technologies.map(
                            (tech, i) =>
                              tech && (
                                <span
                                  key={i}
                                  className="bg-gray-200 px-2 py-1 rounded text-sm text-gray-700"
                                >
                                  {tech}
                                </span>
                              )
                          )}
                        </div>
                      )}
                  </div>
                )
            )}
          </section>
        )}
      </div>
    </div>
  );
}

// React.memo ile sarmalanmış bileşeni dışa aktar
export default React.memo(PreviewCV);
