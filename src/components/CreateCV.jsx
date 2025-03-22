import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import html2pdf from "html2pdf.js";
import { useAuth } from "../context/AuthContext";

function CreateCV({ initialData, onSubmit, isEditing, cvId }) {
  const [formData, setFormData] = useState(
    initialData || {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        website: "",
      },
      education: [
        {
          school: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          gpa: "",
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
          current: false,
          description: "",
          achievements: [""],
        },
      ],
      skills: [{ category: "", items: [""] }],
      languages: [{ language: "", proficiency: "" }],
      certifications: [{ name: "", issuer: "", date: "", url: "" }],
      projects: [{ name: "", description: "", url: "", technologies: [""] }],
    }
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { templateId } = useParams();

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const handleArrayFieldChange = (section, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addArrayField = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], getEmptyObject(section)],
    }));
  };

  const removeArrayField = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const getEmptyObject = (section) => {
    switch (section) {
      case "education":
        return {
          school: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          gpa: "",
          description: "",
        };
      case "experience":
        return {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          achievements: [""],
        };
      case "skills":
        return {
          category: "",
          items: [""],
        };
      case "languages":
        return {
          language: "",
          proficiency: "",
        };
      case "certifications":
        return {
          name: "",
          issuer: "",
          date: "",
          url: "",
        };
      case "projects":
        return {
          name: "",
          description: "",
          url: "",
          technologies: [""],
        };
      default:
        return {};
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("Kullanıcı oturumu bulunamadı.");
      }

      const cvData = {
        ...formData,
        userId: user.uid,
        templateId: isEditing ? formData.templateId : templateId,
        updatedAt: new Date(),
      };

      if (!isEditing) {
        cvData.createdAt = new Date();
      }

      if (onSubmit) {
        await onSubmit(cvData);
      } else {
        const docRef = await addDoc(collection(db, "cvs"), cvData);
        navigate(`/preview-cv/${docRef.id}`);
      }
    } catch (err) {
      console.error("Error saving CV:", err);
      setError(
        isEditing
          ? "CV güncellenirken bir hata oluştu."
          : "CV oluşturulurken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    const element = document.getElementById("cv-preview");
    const opt = {
      margin: 1,
      filename: "my-cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    setTimeout(() => {
      html2pdf().set(opt).from(element).save();
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Yeni CV Oluştur</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Kişisel Bilgiler */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Kişisel Bilgiler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Soyad
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.personalInfo.fullName}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-posta
              </label>
              <input
                type="email"
                name="email"
                value={formData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adres
              </label>
              <input
                type="text"
                name="address"
                value={formData.personalInfo.address}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.personalInfo.linkedin}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.personalInfo.website}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </section>

        {/* Eğitim */}
        <section className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Eğitim</h2>
            <button
              type="button"
              onClick={() => addArrayField("education")}
              className="text-blue-600 hover:text-blue-700"
            >
              + Eğitim Ekle
            </button>
          </div>
          {formData.education.map((edu, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Okul
                  </label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "education",
                        index,
                        "school",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Derece
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "education",
                        index,
                        "degree",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Alan
                  </label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "education",
                        index,
                        "field",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Not Ortalaması
                  </label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "education",
                        index,
                        "gpa",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="4.00"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Açıklama
                  </label>
                  <textarea
                    value={edu.description}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "education",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Başlangıç Tarihi
                    </label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "education",
                          index,
                          "startDate",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bitiş Tarihi
                    </label>
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "education",
                          index,
                          "endDate",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              {formData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("education", index)}
                  className="text-red-600 hover:text-red-700 mt-2"
                >
                  Sil
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Deneyim */}
        <section className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">İş Deneyimi</h2>
            <button
              type="button"
              onClick={() => addArrayField("experience")}
              className="text-blue-600 hover:text-blue-700"
            >
              + Deneyim Ekle
            </button>
          </div>
          {formData.experience.map((exp, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Şirket
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "experience",
                        index,
                        "company",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pozisyon
                  </label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "experience",
                        index,
                        "position",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Lokasyon
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "experience",
                        index,
                        "location",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Açıklama
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "experience",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "experience",
                          index,
                          "current",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Şu anda burada çalışıyorum
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Başlangıç Tarihi
                    </label>
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "experience",
                          index,
                          "startDate",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bitiş Tarihi
                    </label>
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) =>
                        handleArrayFieldChange(
                          "experience",
                          index,
                          "endDate",
                          e.target.value
                        )
                      }
                      disabled={exp.current}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              {formData.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("experience", index)}
                  className="text-red-600 hover:text-red-700 mt-2"
                >
                  Sil
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Yetenekler */}
        <section className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Yetenekler</h2>
            <button
              type="button"
              onClick={() => addArrayField("skills")}
              className="text-blue-600 hover:text-blue-700"
            >
              + Yetenek Kategorisi Ekle
            </button>
          </div>
          {formData.skills.map((skill, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kategori
                </label>
                <input
                  type="text"
                  value={skill.category}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "skills",
                      index,
                      "category",
                      e.target.value
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Yetenekler
                </label>
                {skill.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex mt-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...skill.items];
                        newItems[itemIndex] = e.target.value;
                        handleArrayFieldChange(
                          "skills",
                          index,
                          "items",
                          newItems
                        );
                      }}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = skill.items.filter(
                          (_, i) => i !== itemIndex
                        );
                        handleArrayFieldChange(
                          "skills",
                          index,
                          "items",
                          newItems
                        );
                      }}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      Sil
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newItems = [...skill.items, ""];
                    handleArrayFieldChange("skills", index, "items", newItems);
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-700"
                >
                  + Yetenek Ekle
                </button>
              </div>
              {formData.skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("skills", index)}
                  className="text-red-600 hover:text-red-700 mt-2"
                >
                  Sil
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Languages Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Diller</h2>
            <button
              type="button"
              onClick={() => addArrayField("languages")}
              className="text-blue-600 hover:text-blue-700"
            >
              + Dil Ekle
            </button>
          </div>
          {formData.languages.map((lang, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dil
                  </label>
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "languages",
                        index,
                        "language",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Seviye
                  </label>
                  <select
                    value={lang.proficiency}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "languages",
                        index,
                        "proficiency",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Seçiniz</option>
                    <option value="Başlangıç">Başlangıç</option>
                    <option value="Orta">Orta</option>
                    <option value="İyi">İyi</option>
                    <option value="İleri">İleri</option>
                    <option value="Anadil">Anadil</option>
                  </select>
                </div>
              </div>
              {formData.languages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("languages", index)}
                  className="text-red-600 hover:text-red-700 mt-2"
                >
                  Sil
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Certifications Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Sertifikalar</h2>
            <button
              type="button"
              onClick={() => addArrayField("certifications")}
              className="text-blue-600 hover:text-blue-700"
            >
              + Sertifika Ekle
            </button>
          </div>
          {formData.certifications.map((cert, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sertifika Adı
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "certifications",
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Veren Kurum
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "certifications",
                        index,
                        "issuer",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tarih
                  </label>
                  <input
                    type="date"
                    value={cert.date}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "certifications",
                        index,
                        "date",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    URL
                  </label>
                  <input
                    type="url"
                    value={cert.url}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "certifications",
                        index,
                        "url",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://example.com/certificate"
                  />
                </div>
              </div>
              {formData.certifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("certifications", index)}
                  className="text-red-600 hover:text-red-700 mt-2"
                >
                  Sil
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Projeler</h2>
            <button
              type="button"
              onClick={() => addArrayField("projects")}
              className="text-blue-600 hover:text-blue-700"
            >
              + Proje Ekle
            </button>
          </div>
          {formData.projects.map((project, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Proje Adı
                  </label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "projects",
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    URL
                  </label>
                  <input
                    type="url"
                    value={project.url}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "projects",
                        index,
                        "url",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://example.com/project"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Açıklama
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      handleArrayFieldChange(
                        "projects",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Teknolojiler
                  </label>
                  <div className="space-y-2">
                    {project.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={tech}
                          onChange={(e) => {
                            const newTech = [...project.technologies];
                            newTech[techIndex] = e.target.value;
                            handleArrayFieldChange(
                              "projects",
                              index,
                              "technologies",
                              newTech
                            );
                          }}
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newTech = project.technologies.filter(
                              (_, i) => i !== techIndex
                            );
                            handleArrayFieldChange(
                              "projects",
                              index,
                              "technologies",
                              newTech
                            );
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          Sil
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newTech = [...project.technologies, ""];
                        handleArrayFieldChange(
                          "projects",
                          index,
                          "technologies",
                          newTech
                        );
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      + Teknoloji Ekle
                    </button>
                  </div>
                </div>
              </div>
              {formData.projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("projects", index)}
                  className="text-red-600 hover:text-red-700 mt-2"
                >
                  Sil
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Oluşturuluyor..." : "CV Oluştur"}
          </button>
        </div>
      </form>

      {/* Preview Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <div id="cv-preview" className="bg-white p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {formData.personalInfo.fullName || "Ad Soyad"}
            </h1>
            <div className="text-gray-600 space-y-1">
              {formData.personalInfo.email && (
                <p>{formData.personalInfo.email}</p>
              )}
              {formData.personalInfo.phone && (
                <p>{formData.personalInfo.phone}</p>
              )}
              {formData.personalInfo.address && (
                <p>{formData.personalInfo.address}</p>
              )}
              {formData.personalInfo.linkedin && (
                <p>
                  <a
                    href={formData.personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    LinkedIn
                  </a>
                </p>
              )}
              {formData.personalInfo.website && (
                <p>
                  <a
                    href={formData.personalInfo.website}
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

          {formData.education.some((edu) => edu.school || edu.degree) && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
                Eğitim
              </h2>
              {formData.education.map(
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
                      {edu.gpa && (
                        <p className="text-gray-600">Not: {edu.gpa}</p>
                      )}
                      {edu.description && (
                        <p className="mt-2 text-gray-700">{edu.description}</p>
                      )}
                    </div>
                  )
              )}
            </section>
          )}

          {formData.experience.some((exp) => exp.company || exp.position) && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
                İş Deneyimi
              </h2>
              {formData.experience.map(
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
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="mt-2 list-disc list-inside text-gray-700">
                          {exp.achievements.map(
                            (achievement, i) =>
                              achievement && <li key={i}>{achievement}</li>
                          )}
                        </ul>
                      )}
                    </div>
                  )
              )}
            </section>
          )}

          {formData.skills.some(
            (skill) => skill.category && skill.items.length > 0
          ) && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
                Yetenekler
              </h2>
              {formData.skills.map(
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

          {formData.languages.some((lang) => lang.language) && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
                Diller
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {formData.languages.map(
                  (lang, index) =>
                    lang.language && (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium">{lang.language}</span>
                        <span className="text-gray-600">
                          {lang.proficiency}
                        </span>
                      </div>
                    )
                )}
              </div>
            </section>
          )}

          {formData.certifications.some((cert) => cert.name) && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
                Sertifikalar
              </h2>
              {formData.certifications.map(
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
                      {cert.date && (
                        <p className="text-gray-600">{cert.date}</p>
                      )}
                    </div>
                  )
              )}
            </section>
          )}

          {formData.projects.some((project) => project.name) && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
                Projeler
              </h2>
              {formData.projects.map(
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
    </div>
  );
}

export default CreateCV;
