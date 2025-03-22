import React from "react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: 1,
    name: "Modern Profesyonel",
    description: "Temiz ve modern tasarımlı profesyonel CV şablonu",
    image: "/templates/modern-professional.jpg",
    theme: "modern",
  },
  {
    id: 2,
    name: "Klasik Elegant",
    description: "Geleneksel ve şık tasarımlı CV şablonu",
    image: "/templates/classic-elegant.jpg",
    theme: "classic",
  },
  {
    id: 3,
    name: "Yaratıcı Tasarım",
    description: "Yaratıcı sektörler için renkli ve dikkat çekici şablon",
    image: "/templates/creative-design.jpg",
    theme: "creative",
  },
  {
    id: 4,
    name: "Minimalist",
    description: "Sade ve etkili minimalist tasarım",
    image: "/templates/minimalist.jpg",
    theme: "minimal",
  },
  {
    id: 5,
    name: "Tech Pro",
    description: "Teknoloji profesyonelleri için özel tasarım",
    image: "/templates/tech-pro.jpg",
    theme: "tech",
  },
  {
    id: 6,
    name: "Akademik",
    description: "Akademik kariyere uygun detaylı şablon",
    image: "/templates/academic.jpg",
    theme: "academic",
  },
  {
    id: 7,
    name: "Startup",
    description: "Startup dünyası için dinamik tasarım",
    image: "/templates/startup.jpg",
    theme: "startup",
  },
  {
    id: 8,
    name: "Portfolio Plus",
    description: "Portfolyo odaklı yaratıcı CV şablonu",
    image: "/templates/portfolio.jpg",
    theme: "portfolio",
  },
  {
    id: 9,
    name: "Executive",
    description: "Üst düzey yöneticiler için profesyonel şablon",
    image: "/templates/executive.jpg",
    theme: "executive",
  },
  {
    id: 10,
    name: "Digital Artist",
    description: "Dijital sanatçılar için özelleştirilmiş tasarım",
    image: "/templates/digital-artist.jpg",
    theme: "artistic",
  },
  {
    id: 11,
    name: "Medical Pro",
    description: "Sağlık profesyonelleri için özel şablon",
    image: "/templates/medical.jpg",
    theme: "medical",
  },
  {
    id: 12,
    name: "Legal Expert",
    description: "Hukuk profesyonelleri için tasarlanmış şablon",
    image: "/templates/legal.jpg",
    theme: "legal",
  },
  {
    id: 13,
    name: "Sales Master",
    description: "Satış profesyonelleri için etkileyici tasarım",
    image: "/templates/sales.jpg",
    theme: "sales",
  },
  {
    id: 14,
    name: "Graduate",
    description: "Yeni mezunlar için modern şablon",
    image: "/templates/graduate.jpg",
    theme: "graduate",
  },
  {
    id: 15,
    name: "Freelancer",
    description: "Serbest çalışanlar için özelleştirilmiş tasarım",
    image: "/templates/freelancer.jpg",
    theme: "freelance",
  },
  {
    id: 16,
    name: "Dark Mode",
    description: "Koyu tema severler için modern tasarım",
    image: "/templates/dark-mode.jpg",
    theme: "dark",
  },
  {
    id: 17,
    name: "Light & Clean",
    description: "Ferah ve temiz tasarım",
    image: "/templates/light-clean.jpg",
    theme: "light",
  },
  {
    id: 18,
    name: "Infographic",
    description: "İnfografik tarzında görsel CV şablonu",
    image: "/templates/infographic.jpg",
    theme: "infographic",
  },
  {
    id: 19,
    name: "Timeline",
    description: "Zaman çizelgesi odaklı modern tasarım",
    image: "/templates/timeline.jpg",
    theme: "timeline",
  },
  {
    id: 20,
    name: "Multi-Column",
    description: "Çok sütunlu profesyonel tasarım",
    image: "/templates/multi-column.jpg",
    theme: "multicolumn",
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
      
      {/* Tema Filtreleme */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
          Tümü
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300">
          Modern
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300">
          Klasik
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300">
          Yaratıcı
        </button>
      </div>

      {/* Şablonlar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="relative pt-[133%]">
              <img
                src={template.image}
                alt={template.name}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{template.description}</p>
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
