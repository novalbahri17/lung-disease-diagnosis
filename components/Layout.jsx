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
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {APP_CONFIG.NAME}
                  </h1>
                  <p className="text-xs text-gray-500">AI Medical Diagnosis</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200">
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors"
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
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* About */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Stethoscope className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {APP_CONFIG.NAME}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Aplikasi AI untuk diagnosis penyakit paru-paru dari citra X-ray 
                  menggunakan teknologi deep learning dan computer vision.
                </p>
                <p className="text-xs text-gray-500">
                  Version {APP_CONFIG.VERSION}
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Links
                </h3>
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-gray-600 hover:text-blue-600 text-sm transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Contact & Social */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact & Support
                </h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${APP_CONFIG.CONTACT_EMAIL}`}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{APP_CONFIG.CONTACT_EMAIL}</span>
                  </a>
                  <a
                    href={APP_CONFIG.GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} {APP_CONFIG.NAME}. All rights reserved.
                </p>
                <div className="flex items-center space-x-6 text-xs text-gray-500">
                  <span>Made with ❤️ for education</span>
                  <span>•</span>
                  <span>Not for medical use</span>
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
