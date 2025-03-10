import React from "react";

function Home() {
  return (
    <>
      <section className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-4xl text-center border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Profesyonel CV'nizi Hazırlayın
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          CV maker ile profesyonel bir CV hazırlamak artık çok kolay. Siz uygun
          şablonu seçin ve dakikalar içinde CV'nizi tamamlayın.
        </p>
        <button className="mt-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition transform duration-300">
          Başlayın
        </button>
      </section>

      {/* Özellikler Bölümü */}
      <section className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-gray-800">
            Hızlı ve Kolay
          </h3>
          <p className="mt-4 text-gray-600">
            Kişisel bilgilerinizi girin ve hazır şablonlarımızdan birini seçin.
            CV'nizi kolayca oluşturun.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-gray-800">
            36 Şablon Seçeneği
          </h3>
          <p className="mt-4 text-gray-600">
            Herkes için uygun şablonlar. Şık, modern ve etkileyici tasarımlar.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-gray-800">PDF İndirme</h3>
          <p className="mt-4 text-gray-600">
            Hazır CV'nizi tek bir tıkla PDF olarak indirin ve
            profesyonelliğinizi artırın.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
