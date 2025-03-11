import React from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">Hakkımızda</h3>
          <p className="text-gray-400">
            CV Oluşturucu, profesyonel ve etkileyici CV'ler hazırlamak için
            tasarlanmış modern bir platformdur.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">İletişim</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: erkay3926@gmail.com</li>
            <li>Telefon: +90 551 985 6847</li>
            <li>Adres: Eskişehir, Türkiye</li>
          </ul>
        </div>
        <div className="flex justify-center space-x-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaYoutube size={24} />
          </a>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
        © 2024 CV Oluşturucu - Tüm hakları saklıdır.
      </div>
    </footer>
  );
}

export default Footer;
