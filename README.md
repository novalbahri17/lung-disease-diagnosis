# 🏥 Lung Disease Diagnosis Web Application

Aplikasi web untuk diagnosis penyakit paru-paru menggunakan Deep Learning dan Computer Vision. Aplikasi ini dapat mendeteksi kondisi Normal, Pneumonia, COVID-19, dan Tuberculosis dari citra X-ray paru-paru.

## 🚀 Teknologi yang Digunakan

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI/ML**: TensorFlow.js untuk inferensi model
- **Deployment**: Vercel
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Lucide React

## 📋 Prerequisites (Tools yang Perlu Didownload)

### 1. Node.js (v18 atau lebih tinggi) ⭐ WAJIB
```bash
# Download dari https://nodejs.org/
# Pilih LTS version untuk stabilitas terbaik
# Setelah install, verifikasi dengan:
node --version
npm --version
```

**Windows:**
- Download installer dari [nodejs.org](https://nodejs.org/)
- Jalankan installer dan ikuti petunjuk
- Restart command prompt/terminal

**macOS:**
```bash
# Menggunakan Homebrew (disarankan)
brew install node

# Atau download installer dari nodejs.org
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Git ⭐ WAJIB
```bash
# Verifikasi instalasi
git --version
```

**Windows:**
- Download dari [git-scm.com](https://git-scm.com/)
- Atau install via winget: `winget install Git.Git`

**macOS:**
```bash
# Menggunakan Homebrew
brew install git

# Atau menggunakan Xcode Command Line Tools
xcode-select --install
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install git

# CentOS/RHEL/Fedora
sudo yum install git
```

### 3. Code Editor (Disarankan)
- **Visual Studio Code**: [Download disini](https://code.visualstudio.com/)
- **Extensions yang sangat disarankan**:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - Auto Rename Tag
  - GitLens
  - Thunder Client (untuk testing API)

### 4. Vercel CLI (untuk deployment)
```bash
npm install -g vercel

# Verifikasi instalasi
vercel --version
```

### 5. Python (untuk model training - opsional)
Jika ingin melatih ulang model:
```bash
# Download dari https://python.org/
# Minimal Python 3.8+
python --version
pip --version
```

## 🛠️ Framework dan Library yang Digunakan

### Frontend Framework
- **Next.js 15**: React framework dengan SSR, SSG, dan API routes
- **React 19**: Library untuk building user interfaces
- **Tailwind CSS**: Utility-first CSS framework

### AI/ML Libraries
- **TensorFlow.js**: Machine learning library untuk JavaScript
- **@tensorflow/tfjs-node**: TensorFlow.js untuk Node.js backend

### UI Components & Styling
- **Lucide React**: Beautiful & consistent icon library
- **React Dropzone**: File upload component
- **Tailwind CSS**: Responsive design system

### Development Tools
- **ESLint**: JavaScript linter
- **Prettier**: Code formatter
- **PostCSS**: CSS processor
- **Autoprefixer**: CSS vendor prefixes

## 📁 Struktur Project

```
lung-disease-diagnosis/
├── 📁 components/              # React components
│   ├── 📁 ui/                 # UI components yang reusable
│   │   ├── Button.jsx         # Custom button component
│   │   ├── Card.jsx           # Card component
│   │   ├── Input.jsx          # Input component
│   │   └── Loading.jsx        # Loading spinner component
│   ├── DiagnosisResult.jsx    # Component hasil diagnosis
│   ├── ImageUpload.jsx        # Component upload gambar
│   └── Layout.jsx             # Layout wrapper component
├── 📁 pages/                  # Next.js pages (routing)
│   ├── 📁 api/               # API routes
│   │   ├── health.js         # Health check endpoint
│   │   └── predict.js        # Prediction API endpoint
│   ├── _app.js               # Custom App component
│   ├── _document.js          # Custom Document component
│   ├── index.js              # Homepage
│   ├── about.js              # About page
│   └── contact.js            # Contact page
├── 📁 public/                # Static files
│   ├── 📁 images/            # Image assets
│   ├── manifest.json         # PWA manifest
│   ├── robots.txt            # SEO robots file
│   └── README.md             # Public assets info
├── 📁 styles/                # CSS files
│   └── globals.css           # Global styles
├── 📁 utils/                 # Utility functions
│   ├── constants.js          # App constants
│   ├── imageProcessing.js    # Image processing utilities
│   └── validation.js         # Input validation
├── 📁 docs/                  # Documentation
│   ├── api-documentation.md  # API documentation
│   ├── deployment.md         # Deployment guide
│   ├── deployment-checklist.md # Pre-deployment checklist
│   └── development.md        # Development guide
├── 📁 scripts/               # Setup and utility scripts
│   ├── setup.js              # Node.js setup script
│   ├── setup.bat             # Windows setup script
│   └── setup.sh              # Unix/Linux setup script
├── 📁 models/                # AI models (akan dibuat)
│   └── lung-disease-model.json # TensorFlow.js model
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── package.json              # NPM dependencies
├── PROJECT-SUMMARY.md        # Project summary
└── README.md                 # This file
```

### 📋 Penjelasan Struktur

**`/components`** - Berisi semua React components:
- `ui/` - Komponen UI dasar yang dapat digunakan ulang
- `DiagnosisResult.jsx` - Menampilkan hasil diagnosis AI
- `ImageUpload.jsx` - Handle upload dan preview gambar X-ray
- `Layout.jsx` - Template layout utama aplikasi

**`/pages`** - Next.js pages dan API routes:
- `api/` - Backend API endpoints
- `index.js` - Halaman utama aplikasi
- `about.js` - Informasi tentang aplikasi
- `contact.js` - Halaman kontak

**`/public`** - File statis yang dapat diakses publik:
- `images/` - Gambar, logo, dan aset visual
- `manifest.json` - Konfigurasi Progressive Web App
- `robots.txt` - SEO configuration

**`/utils`** - Helper functions dan utilities:
- `constants.js` - Konstanta aplikasi (kelas penyakit, dll)
- `imageProcessing.js` - Fungsi preprocessing gambar
- `validation.js` - Validasi input pengguna

**`/docs`** - Dokumentasi lengkap:
- `api-documentation.md` - Dokumentasi API endpoints
- `deployment.md` - Panduan deployment ke Vercel
- `development.md` - Panduan pengembangan

**`/scripts`** - Automation scripts:
- Setup scripts untuk berbagai platform
- Utility scripts untuk development

**Configuration Files:**
- `next.config.js` - Konfigurasi Next.js
- `tailwind.config.js` - Konfigurasi Tailwind CSS
- `postcss.config.js` - Konfigurasi PostCSS
- `package.json` - Dependencies dan scripts NPM
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   └── Loading.jsx
│   ├── ImageUpload.jsx
│   ├── DiagnosisResult.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── Layout.jsx
├── pages/
│   ├── api/
│   │   ├── predict.js
│   │   └── health.js
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│   ├── about.js
│   └── contact.js
├── public/
│   ├── models/
│   │   └── lung-disease-model.json
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── styles/
│   ├── globals.css
│   └── components.css
├── utils/
│   ├── tensorflow.js
│   ├── imageProcessing.js
│   ├── constants.js
│   └── validation.js
├── lib/
│   └── ml-model.js
├── docs/
│   ├── installation.md
│   ├── deployment.md
│   └── api-documentation.md
├── .env.local
├── .env.example
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── package.json
├── README.md
└── vercel.json
```

## 🛠️ Instalasi dan Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/lung-disease-diagnosis.git
cd lung-disease-diagnosis
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
# Copy file environment
cp .env.example .env.local

# Edit .env.local sesuai kebutuhan
NEXT_PUBLIC_APP_NAME="Lung Disease Diagnosis"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_MODEL_URL="/models/lung-disease-model.json"
```

### 4. Jalankan Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📱 Features

- ✅ **Upload Gambar X-ray**: Drag & drop atau pilih file
- ✅ **Real-time Processing**: Preprocessing gambar otomatis
- ✅ **AI Diagnosis**: Deteksi 4 kondisi (Normal, Pneumonia, COVID-19, TB)
- ✅ **Confidence Score**: Tingkat kepercayaan prediksi
- ✅ **Visual Feedback**: Grad-CAM visualization
- ✅ **Responsive Design**: Desktop dan mobile friendly
- ✅ **Progressive Web App**: Dapat diinstall di device
- ✅ **Accessibility**: Screen reader support

## ✨ Fitur Utama

- 🏠 **Halaman Utama**: Interface upload dan diagnosis X-ray dengan drag & drop
- 📊 **Diagnosis AI**: Analisis real-time dengan tingkat kepercayaan
- 📱 **Responsive Design**: Optimized untuk desktop dan mobile
- 📈 **Visualisasi Hasil**: Tampilan hasil diagnosis yang mudah dipahami
- ℹ️ **Halaman About**: Informasi lengkap tentang platform dan teknologi
- 📞 **Halaman Contact**: Form kontak dan FAQ untuk support
- 🔒 **Keamanan**: Enkripsi data dan validasi input yang aman
- ⚡ **Performance**: Optimized loading dan caching strategy

## 📄 Halaman yang Tersedia

### 🏠 Halaman Utama (/)
- Hero section dengan call-to-action
- Fitur upload X-ray dengan drag & drop
- Real-time AI diagnosis
- Cara kerja aplikasi step-by-step

### ℹ️ Halaman About (/about)
- Misi dan visi platform
- Informasi tim pengembang
- Teknologi yang digunakan
- Statistik akurasi dan performa

### 📞 Halaman Contact (/contact)
- Form kontak dengan validasi
- Informasi kontak dan support
- FAQ (Frequently Asked Questions)
- Opsi untuk enterprise solutions

## 🎯 Cara Penggunaan

1. **Buka aplikasi** di browser
2. **Upload gambar X-ray** dengan format JPG, PNG, atau WEBP
3. **Tunggu proses** analisis (biasanya 2-5 detik)
4. **Lihat hasil** diagnosis dengan confidence score
5. **Download laporan** hasil diagnosis (opsional)

## ⚠️ Disclaimer

**PENTING**: Aplikasi ini hanya untuk tujuan edukasi dan penelitian. Hasil diagnosis tidak dapat menggantikan konsultasi medis profesional. Selalu konsultasi dengan dokter untuk diagnosis yang akurat.

## 🚀 Deployment ke Vercel

Lihat panduan lengkap di [docs/deployment.md](./docs/deployment.md)

## 📞 Support

Jika mengalami masalah, silakan:
1. Cek [documentation](./docs/)
2. Buka [GitHub Issues](https://github.com/your-username/lung-disease-diagnosis/issues)
3. Contact: your-email@example.com

## 📄 License

MIT License - lihat [LICENSE](./LICENSE) untuk detail.
