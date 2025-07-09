// Layout component untuk konsistensi design

import React from 'react';
import Head from 'next/head';
import { Stethoscope, Menu, X, Github, Mail } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { APP_CONFIG, METADATA } from '../utils/constants';

const Layout = ({ children, title, description, className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pageTitle = title ? `${title} | ${APP_CONFIG.NAME}` : APP_CONFIG.NAME;

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/about' },
    { name: 'Kontak', href: '/contact' },
  ];

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description || METADATA.DESCRIPTION} />
        <meta name="keywords" content={METADATA.KEYWORDS} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={METADATA.FAVICON} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description || METADATA.DESCRIPTION} />
        <meta property="og:image" content={METADATA.OG_IMAGE} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description || METADATA.DESCRIPTION} />
        <meta name="twitter:image" content={METADATA.OG_IMAGE} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {APP_CONFIG.NAME}
                  </h1>
                  <p className="text-xs text-gray-500">AI Medical Diagnosis</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden space-x-8 md:flex">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile menu button */}
              <button
                type="button"
                className="p-2 text-gray-400 rounded-md md:hidden hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="py-4 border-t border-gray-200 md:hidden">
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md hover:text-blue-600 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className={`flex-1 ${className}`}>
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-auto bg-white border-t border-gray-200">
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* About */}
              <div>
                <div className="flex items-center mb-4 space-x-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {APP_CONFIG.NAME}
                  </h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                  Aplikasi AI untuk diagnosis penyakit paru-paru dari citra X-ray 
                  menggunakan teknologi deep learning dan computer vision.
                </p>
                <p className="text-xs text-gray-500">
                  Version {APP_CONFIG.VERSION}
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Tautan Cepat
                </h3>
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-sm text-gray-600 transition-colors hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Contact & Social */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Kontak & Dukungan
                </h3>
                <div className="space-y-3">
                  <a
                    href='mailto:novalbahri17@gmail.com'
                    className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    <Mail className="w-4 h-4" />
                    <span>novalbahri17@gmail.com</span>
                  </a>
                  <a
                    href='https://github.com/novalbahri17/lung-disease-diagnosis'
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-blue-600"
                  >
                    <Github className="w-4 h-4" />
                    <span>Repositori GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 mt-8 border-t border-gray-200">
              <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} {APP_CONFIG.NAME}. Semua hak dilindungi.
                </p>
                <div className="flex items-center space-x-6 text-xs text-gray-500">
                  <span>Dibuat dengan ❤️ untuk edukasi</span>
                  <span>•</span>
                  <span>Bukan untuk penggunaan medis</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
