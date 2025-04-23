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
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">CV Şablonları</h1>
      {/* Tema Filtreleme */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <button className="px-5 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow">Tümü</button>
        <button className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300">Modern</button>
        <button className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300">Klasik</button>
        <button className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300">Yaratıcı</button>
      </div>
      {/* Şablonlar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pb-24">
        {templates.map((template, idx) => {
          const bgColors = [
            "bg-gradient-to-br from-blue-50 to-blue-100",
            "bg-gradient-to-br from-pink-50 to-pink-100",
            "bg-gradient-to-br from-green-50 to-green-100",
            "bg-gradient-to-br from-yellow-50 to-yellow-100",
            "bg-gradient-to-br from-gray-50 to-gray-100",
            "bg-gradient-to-br from-purple-50 to-purple-100"
          ];
          const borderColors = [
            "border-blue-200",
            "border-pink-200",
            "border-green-200",
            "border-yellow-200",
            "border-gray-200",
            "border-purple-200"
          ];
          const shadowColors = [
            "shadow-blue-200/50",
            "shadow-pink-200/50",
            "shadow-green-200/50",
            "shadow-yellow-200/50",
            "shadow-gray-200/50",
            "shadow-purple-200/50"
          ];
          const i = idx % 6;
          return (
            <div
              key={template.id}
              className={`rounded-2xl overflow-hidden border ${borderColors[i]} ${bgColors[i]} ${shadowColors[i]} shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col`}
              style={{ minHeight: 420 }}
            >
              <div className="relative pt-[133%] group">
                <img
                  src={template.image}
                  alt={template.name}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-700 mb-4 flex-grow">{template.description}</p>
                <button
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-700 shadow hover:shadow-lg transition-all duration-300 mt-auto`}
                >
                  Bu Şablonu Kullan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Templates;
