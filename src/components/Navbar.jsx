import React from 'react';
import logo from '../assets/cvvvv.png';

function Navbar() {
  return (
    <header className="bg-green-600 text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="CV Oluşturucu Logo" className="h-8 w-8" />
        <h1 className="text-lg font-bold">CV Oluşturucu</h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:underline">Şablonlar</a></li>
          <li><a href="#" className="hover:underline">İletişim</a></li>
          <li><a href="#" className="hover:underline">Giriş Yap</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
