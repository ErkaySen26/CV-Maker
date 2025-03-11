import React, { useState } from "react";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";

function CreateCV() {
  const { templateId } = useParams();
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      title: "",
    },
    education: [
      { school: "", degree: "", field: "", startYear: "", endYear: "" },
    ],
    experience: [
      {
        company: "",
        position: "",
        description: "",
        startYear: "",
        endYear: "",
      },
    ],
    skills: [""],
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setCvData((prevData) => ({
      ...prevData,
      personalInfo: {
        ...prevData.personalInfo,
        [name]: value,
      },
    }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    setCvData((prevData) => {
      const newEducation = [...prevData.education];
      newEducation[index] = { ...newEducation[index], [name]: value };
      return { ...prevData, education: newEducation };
    });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    setCvData((prevData) => {
      const newExperience = [...prevData.experience];
      newExperience[index] = { ...newExperience[index], [name]: value };
      return { ...prevData, experience: newExperience };
    });
  };

  const addEducation = () => {
    setCvData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        { school: "", degree: "", field: "", startYear: "", endYear: "" },
      ],
    }));
  };

  const addExperience = () => {
    setCvData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        {
          company: "",
          position: "",
          description: "",
          startYear: "",
          endYear: "",
        },
      ],
    }));
  };

  const handleSkillChange = (index, value) => {
    setCvData((prevData) => {
      const newSkills = [...prevData.skills];
      newSkills[index] = value;
      return { ...prevData, skills: newSkills };
    });
  };

  const addSkill = () => {
    setCvData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, ""],
    }));
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">CV Bilgilerini Girin</h2>

          {/* Personal Information */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Kişisel Bilgiler</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Ad Soyad"
                value={cvData.personalInfo.fullName}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="title"
                placeholder="Ünvan (örn: Yazılım Geliştirici)"
                value={cvData.personalInfo.title}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="E-posta"
                value={cvData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefon"
                value={cvData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="address"
                placeholder="Adres"
                value={cvData.personalInfo.address}
                onChange={handlePersonalInfoChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Eğitim</h3>
            {cvData.education.map((edu, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <input
                  type="text"
                  name="school"
                  placeholder="Okul"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  name="degree"
                  placeholder="Derece"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="startYear"
                    placeholder="Başlangıç Yılı"
                    value={edu.startYear}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="endYear"
                    placeholder="Bitiş Yılı"
                    value={edu.endYear}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="p-2 border rounded"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addEducation}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
            >
              + Eğitim Ekle
            </button>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">İş Deneyimi</h3>
            {cvData.experience.map((exp, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <input
                  type="text"
                  name="company"
                  placeholder="Şirket"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  name="position"
                  placeholder="Pozisyon"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  name="description"
                  placeholder="İş Tanımı"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                  rows="3"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="startYear"
                    placeholder="Başlangıç Yılı"
                    value={exp.startYear}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="endYear"
                    placeholder="Bitiş Yılı"
                    value={exp.endYear}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="p-2 border rounded"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
            >
              + İş Deneyimi Ekle
            </button>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Yetenekler</h3>
            {cvData.skills.map((skill, index) => (
              <input
                key={index}
                type="text"
                placeholder="Yetenek"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
            ))}
            <button
              type="button"
              onClick={addSkill}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
            >
              + Yetenek Ekle
            </button>
          </section>

          <button
            onClick={exportToPDF}
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
          >
            PDF Olarak İndir
          </button>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div id="cv-preview" className="bg-white p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">
                {cvData.personalInfo.fullName || "Ad Soyad"}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {cvData.personalInfo.title || "Ünvan"}
              </p>
              <div className="text-gray-600">
                {cvData.personalInfo.email && (
                  <p>{cvData.personalInfo.email}</p>
                )}
                {cvData.personalInfo.phone && (
                  <p>{cvData.personalInfo.phone}</p>
                )}
                {cvData.personalInfo.address && (
                  <p>{cvData.personalInfo.address}</p>
                )}
              </div>
            </div>

            {cvData.education.some((edu) => edu.school || edu.degree) && (
              <section className="mb-6">
                <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
                  Eğitim
                </h2>
                {cvData.education.map(
                  (edu, index) =>
                    edu.school && (
                      <div key={index} className="mb-4">
                        <h3 className="font-semibold text-lg">{edu.school}</h3>
                        {edu.degree && (
                          <p className="text-gray-700">{edu.degree}</p>
                        )}
                        <p className="text-gray-600">
                          {edu.startYear && edu.endYear
                            ? `${edu.startYear} - ${edu.endYear}`
                            : ""}
                        </p>
                      </div>
                    )
                )}
              </section>
            )}

            {cvData.experience.some((exp) => exp.company || exp.position) && (
              <section className="mb-6">
                <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
                  İş Deneyimi
                </h2>
                {cvData.experience.map(
                  (exp, index) =>
                    exp.company && (
                      <div key={index} className="mb-4">
                        <h3 className="font-semibold text-lg">{exp.company}</h3>
                        {exp.position && (
                          <p className="text-gray-700 font-medium">
                            {exp.position}
                          </p>
                        )}
                        <p className="text-gray-600">
                          {exp.startYear && exp.endYear
                            ? `${exp.startYear} - ${exp.endYear}`
                            : ""}
                        </p>
                        {exp.description && (
                          <p className="mt-2 text-gray-700">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    )
                )}
              </section>
            )}

            {cvData.skills.some((skill) => skill) && (
              <section>
                <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">
                  Yetenekler
                </h2>
                <div className="flex flex-wrap gap-2">
                  {cvData.skills.map(
                    (skill, index) =>
                      skill && (
                        <span
                          key={index}
                          className="bg-gray-200 px-3 py-1 rounded text-gray-700"
                        >
                          {skill}
                        </span>
                      )
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCV;
