import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import { FiSave, FiDownload } from "react-icons/fi";

const CVBuilder = () => {
  const { templateId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: "",
      email: user?.email || "",
      phone: "",
      address: "",
      title: "",
      summary: "",
    },
    education: [
      {
        school: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    experience: [
      {
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    skills: [
      {
        name: "",
        level: "Başlangıç",
      },
    ],
    languages: [
      {
        name: "",
        level: "A1",
      },
    ],
    projects: [
      {
        name: "",
        description: "",
        link: "",
      },
    ],
  });

  useEffect(() => {
    const loadCV = async () => {
      try {
        const cvRef = doc(db, "cvs", templateId);
        const cvSnap = await getDoc(cvRef);

        if (cvSnap.exists() && cvSnap.data().userId === user.uid) {
          setCvData(cvSnap.data().content);
        }
      } catch (error) {
        console.error("CV yüklenirken hata:", error);
        toast.error("CV yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    loadCV();
  }, [templateId, user]);

  const handleInputChange = (section, index, field, value) => {
    setCvData((prev) => {
      const newData = { ...prev };
      if (section === "personalInfo") {
        newData.personalInfo[field] = value;
      } else {
        newData[section][index][field] = value;
      }
      return newData;
    });
  };

  const handleAddItem = (section) => {
    setCvData((prev) => {
      const newData = { ...prev };
      const emptyItem = getEmptyItem(section);
      newData[section] = [...prev[section], emptyItem];
      return newData;
    });
  };

  const handleRemoveItem = (section, index) => {
    setCvData((prev) => {
      const newData = { ...prev };
      newData[section] = prev[section].filter((_, i) => i !== index);
      return newData;
    });
  };

  const getEmptyItem = (section) => {
    switch (section) {
      case "education":
        return {
          school: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          description: "",
        };
      case "experience":
        return {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        };
      case "skills":
        return {
          name: "",
          level: "Başlangıç",
        };
      case "languages":
        return {
          name: "",
          level: "A1",
        };
      case "projects":
        return {
          name: "",
          description: "",
          link: "",
        };
      default:
        return {};
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const cvRef = doc(db, "cvs", templateId);
      await setDoc(
        cvRef,
        {
          userId: user.uid,
          templateId,
          content: cvData,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      toast.success("CV başarıyla kaydedildi");
      // Kısa bir gecikmeden sonra kullanıcıyı CVlerim sayfasına yönlendir
      setTimeout(() => {
        navigate("/my-cvs");
      }, 1000);
    } catch (error) {
      console.error("CV kaydedilirken hata:", error);
      toast.error("CV kaydedilirken bir hata oluştu");
    } finally {
      setSaving(false);
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
        <div className="flex justify-between items-center mb-8 mt-8">
          <h1 className="text-3xl font-bold text-gray-900">CV Düzenle</h1>
        </div>

        {/* Kişisel Bilgiler */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Kişisel Bilgiler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Ad Soyad"
              value={cvData.personalInfo.fullName}
              onChange={(e) =>
                handleInputChange(
                  "personalInfo",
                  null,
                  "fullName",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="E-posta"
              value={cvData.personalInfo.email}
              onChange={(e) =>
                handleInputChange("personalInfo", null, "email", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Telefon"
              value={cvData.personalInfo.phone}
              onChange={(e) =>
                handleInputChange("personalInfo", null, "phone", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Adres"
              value={cvData.personalInfo.address}
              onChange={(e) =>
                handleInputChange(
                  "personalInfo",
                  null,
                  "address",
                  e.target.value
                )
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Ünvan"
              value={cvData.personalInfo.title}
              onChange={(e) =>
                handleInputChange("personalInfo", null, "title", e.target.value)
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            placeholder="Özet"
            value={cvData.personalInfo.summary}
            onChange={(e) =>
              handleInputChange("personalInfo", null, "summary", e.target.value)
            }
            className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </section>

        {/* Eğitim */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Eğitim</h2>
            <button
              onClick={() => handleAddItem("education")}
              className="text-blue-600 hover:text-blue-800"
            >
              + Eğitim Ekle
            </button>
          </div>
          {cvData.education.map((edu, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Okul"
                  value={edu.school}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      index,
                      "school",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Derece"
                  value={edu.degree}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      index,
                      "degree",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Alan"
                  value={edu.field}
                  onChange={(e) =>
                    handleInputChange(
                      "education",
                      index,
                      "field",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                  <input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) =>
                      handleInputChange(
                        "education",
                        index,
                        "startDate",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) =>
                      handleInputChange(
                        "education",
                        index,
                        "endDate",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <textarea
                placeholder="Açıklama"
                value={edu.description}
                onChange={(e) =>
                  handleInputChange(
                    "education",
                    index,
                    "description",
                    e.target.value
                  )
                }
                className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              {index > 0 && (
                <button
                  onClick={() => handleRemoveItem("education", index)}
                  className="mt-2 text-red-600 hover:text-red-800"
                >
                  Sil
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Deneyim */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Deneyim</h2>
            <button
              onClick={() => handleAddItem("experience")}
              className="text-blue-600 hover:text-blue-800"
            >
              + Deneyim Ekle
            </button>
          </div>
          {cvData.experience.map((exp, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Şirket"
                  value={exp.company}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      index,
                      "company",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Pozisyon"
                  value={exp.position}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      index,
                      "position",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Lokasyon"
                  value={exp.location}
                  onChange={(e) =>
                    handleInputChange(
                      "experience",
                      index,
                      "location",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleInputChange(
                        "experience",
                        index,
                        "startDate",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleInputChange(
                        "experience",
                        index,
                        "endDate",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <textarea
                placeholder="İş Tanımı"
                value={exp.description}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
                    index,
                    "description",
                    e.target.value
                  )
                }
                className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              {index > 0 && (
                <button
                  onClick={() => handleRemoveItem("experience", index)}
                  className="mt-2 text-red-600 hover:text-red-800"
                >
                  Sil
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Yetenekler */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Yetenekler</h2>
            <button
              onClick={() => handleAddItem("skills")}
              className="text-blue-600 hover:text-blue-800"
            >
              + Yetenek Ekle
            </button>
          </div>
          {cvData.skills.map((skill, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Yetenek"
                  value={skill.name}
                  onChange={(e) =>
                    handleInputChange("skills", index, "name", e.target.value)
                  }
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={skill.level}
                  onChange={(e) =>
                    handleInputChange("skills", index, "level", e.target.value)
                  }
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Başlangıç">Başlangıç</option>
                  <option value="Orta">Orta</option>
                  <option value="İleri">İleri</option>
                  <option value="Uzman">Uzman</option>
                </select>
                {index > 0 && (
                  <button
                    onClick={() => handleRemoveItem("skills", index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Sil
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Diller */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Diller</h2>
            <button
              onClick={() => handleAddItem("languages")}
              className="text-blue-600 hover:text-blue-800"
            >
              + Dil Ekle
            </button>
          </div>
          {cvData.languages.map((lang, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Dil"
                  value={lang.name}
                  onChange={(e) =>
                    handleInputChange(
                      "languages",
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={lang.level}
                  onChange={(e) =>
                    handleInputChange(
                      "languages",
                      index,
                      "level",
                      e.target.value
                    )
                  }
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
                {index > 0 && (
                  <button
                    onClick={() => handleRemoveItem("languages", index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Sil
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Projeler */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Projeler</h2>
            <button
              onClick={() => handleAddItem("projects")}
              className="text-blue-600 hover:text-blue-800"
            >
              + Proje Ekle
            </button>
          </div>
          {cvData.projects.map((project, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Proje Adı"
                  value={project.name}
                  onChange={(e) =>
                    handleInputChange("projects", index, "name", e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="url"
                  placeholder="Proje Linki"
                  value={project.link}
                  onChange={(e) =>
                    handleInputChange("projects", index, "link", e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                placeholder="Proje Açıklaması"
                value={project.description}
                onChange={(e) =>
                  handleInputChange(
                    "projects",
                    index,
                    "description",
                    e.target.value
                  )
                }
                className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              {index > 0 && (
                <button
                  onClick={() => handleRemoveItem("projects", index)}
                  className="mt-2 text-red-600 hover:text-red-800"
                >
                  Sil
                </button>
              )}
            </div>
          ))}
        </section>

        <div className="flex justify-center mt-16">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-4"
          >
            <FiSave className="mr-2" />
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
