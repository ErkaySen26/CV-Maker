import React from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-auto">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Marka ve Açıklama */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-blue-400">CV Maker</h3>
        <p className="text-gray-300 mb-2">
          Modern ve profesyonel CV'nizi kolayca oluşturun. Yapay zeka destekli, özelleştirilebilir şablonlarla kariyerinizde öne çıkın.
        </p>
        <p className="text-gray-400 text-sm">Adres: İstanbul, Türkiye</p>
        <p className="text-gray-400 text-sm">E-posta: <a href="mailto:info@cvmaker.com" className="underline hover:text-blue-300">info@cvmaker.com</a></p>
      </div>
      {/* Site Haritası */}
      <div>
        <h4 className="text-xl font-semibold mb-4">Site Haritası</h4>
        <ul className="space-y-2">
          <li><Link to="/" className="hover:text-blue-300">Ana Sayfa</Link></li>
          <li><Link to="/templates" className="hover:text-blue-300">CV Şablonları</Link></li>
          <li><Link to="/my-cvs" className="hover:text-blue-300">CVlerim</Link></li>
          <li><Link to="/profile" className="hover:text-blue-300">Profilim</Link></li>
        </ul>
      </div>
      {/* Hızlı İletişim */}
      <div>
        <h4 className="text-xl font-semibold mb-4">Hızlı İletişim</h4>
        <p className="text-gray-300 text-sm mb-2">Sorularınız için bize ulaşın:</p>
        <a href="mailto:info@cvmaker.com" className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-2 w-fit">E-posta Gönder</a>
        <a href="tel:+905555555555" className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-fit">Telefon: +90 555 555 55 55</a>
      </div>
      {/* Sosyal Medya */}
      <div>
        <h4 className="text-xl font-semibold mb-4">Bizi Takip Edin</h4>
        <div className="flex space-x-4 mb-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300"><FaGithub size={28} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300"><FaLinkedin size={28} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300"><FaTwitter size={28} /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300"><FaFacebook size={28} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300"><FaInstagram size={28} /></a>
        </div>
        <p className="text-gray-400 text-xs">© 2025 CV Maker</p>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-xs">
      <p>Bu site, kullanıcılarının verilerini gizli ve güvenli şekilde saklar. Tüm hakları saklıdır. | <Link to="/privacy" className="underline hover:text-blue-300">Gizlilik Politikası</Link></p>
    </div>
  </div>
</footer>
  );
};

export default Footer;
