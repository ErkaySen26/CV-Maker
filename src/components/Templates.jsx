import React from "react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: 1,
    name: "Modern Profesyonel",
    description: "Temiz ve modern tasarımlı profesyonel CV şablonu",
    image: "https://via.placeholder.com/300x400",
  },
  {
    id: 2,
    name: "Klasik Elegant",
    description: "Geleneksel ve şık tasarımlı CV şablonu",
    image: "https://via.placeholder.com/300x400",
  },
  {
    id: 3,
    name: "Yaratıcı",
    description: "Yaratıcı sektörler için renkli ve dikkat çekici şablon",
    image: "https://via.placeholder.com/300x400",
  },
];

function Templates() {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId) => {
    navigate(`/create-cv/${templateId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">CV Şablonları</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <button
                onClick={() => handleTemplateSelect(template.id)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Bu Şablonu Kullan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Templates;
