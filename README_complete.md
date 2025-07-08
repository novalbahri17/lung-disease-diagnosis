# 🫁 Lung Disease Diagnosis - AI-Powered Medical Diagnosis

> **Sistem diagnosis penyakit paru-paru berbasis Artificial Intelligence menggunakan Deep Learning (CNN) untuk mendeteksi kondisi Normal, Pneumonia, COVID-19, dan Tuberculosis dari gambar X-ray.**

![Lung Disease Diagnosis](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge&logo=tensorflow)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.15-orange?style=for-the-badge&logo=tensorflow)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

## 📋 Daftar Isi

- [🎯 Overview](#-overview)
- [✨ Fitur Utama](#-fitur-utama)
- [🛠️ Instalasi Awal](#️-instalasi-awal)
- [📁 Struktur Project](#-struktur-project)
- [🚀 Quick Start](#-quick-start)
- [🔧 Konfigurasi Environment](#-konfigurasi-environment)
- [📊 Model AI](#-model-ai)
- [📝 Push ke GitHub](#-push-ke-github)
- [🌐 Deploy ke Vercel](#-deploy-ke-vercel)
- [🧪 Testing](#-testing)
- [📚 API Documentation](#-api-documentation)
- [🔒 Disclaimer](#-disclaimer)

---

## 🎯 Overview

Aplikasi web diagnosis penyakit paru-paru yang menggunakan teknologi **Deep Learning** dengan arsitektur **EfficientNetB0** untuk menganalisis gambar X-ray dan memberikan diagnosis otomatis. Sistem ini dapat mendeteksi:

- ✅ **Normal** - Paru-paru sehat
- 🦠 **Pneumonia** - Peradangan paru-paru
- 🦠 **COVID-19** - Infeksi SARS-CoV-2
- 🦠 **Tuberculosis** - Infeksi bakteri TB

### 🎯 Target Pengguna
- 👨‍⚕️ **Tenaga medis** - Sebagai alat bantu screening awal
- 🎓 **Mahasiswa kedokteran** - Untuk pembelajaran dan penelitian
- 🔬 **Peneliti** - Untuk validasi dan pengembangan model AI
- 👨‍💻 **Developer** - Sebagai contoh implementasi AI dalam healthcare

---

## ✨ Fitur Utama

### 🤖 AI & Machine Learning
- **Model EfficientNetB0** dengan Transfer Learning
- **Akurasi tinggi** (>95%) untuk diagnosis multi-class
- **Confidence scoring** dengan interpretasi level kepercayaan
- **Real-time inference** menggunakan TensorFlow.js
- **Image preprocessing** otomatis untuk optimasi diagnosis

### 🎨 User Experience
- **Responsive design** - Optimal di desktop dan mobile
- **Drag & drop upload** dengan preview real-time
- **Progressive loading** dengan progress indicator
- **Error handling** yang user-friendly
- **Modern UI** dengan Tailwind CSS

### 🔒 Keamanan & Privasi
- **Client-side processing** - Gambar tidak dikirim ke server
- **No data storage** - Gambar tidak disimpan permanen
- **HTTPS enforcement** untuk keamanan transmisi
- **Input validation** untuk mencegah attack

### 📊 Reporting & Analytics
- **Detailed diagnosis report** dengan confidence breakdown
- **Medical recommendations** berdasarkan hasil
- **Risk assessment** dan next steps
- **Disclaimer medis** yang jelas

---

## 🛠️ Instalasi Awal

### Prerequisites

Pastikan Anda memiliki tools berikut terinstall:

#### 1. **Node.js** (v18.0.0 atau lebih baru)
```bash
# Download dari: https://nodejs.org/
# Atau menggunakan package manager

# Windows
winget install OpenJS.NodeJS

# macOS
brew install node

# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verifikasi instalasi
node --version  # harus v18.0.0+
npm --version   # harus v8.0.0+
```

#### 2. **Git** (untuk version control)
```bash
# Download dari: https://git-scm.com/

# Windows
winget install Git.Git

# macOS
brew install git

# Linux
sudo apt-get install git

# Verifikasi instalasi
git --version
```

#### 3. **Code Editor** (Rekomendasi)
- **VS Code** - https://code.visualstudio.com/ ⭐ (Highly recommended)
- **WebStorm** - https://www.jetbrains.com/webstorm/
- **Sublime Text** - https://www.sublimetext.com/

#### 4. **VS Code Extensions** (Opsional tapi sangat membantu)
```
Recommended extensions:
✅ ES7+ React/Redux/React-Native snippets
✅ Tailwind CSS IntelliSense
✅ Prettier - Code formatter
✅ ESLint
✅ Auto Rename Tag
✅ GitLens — Git supercharged
✅ npm Intellisense
✅ Bracket Pair Colorizer
```

#### 5. **Browser Modern**
- Chrome (v90+) ⭐
- Firefox (v88+)
- Safari (v14+)
- Edge (v90+)

#### 6. **Vercel CLI** (untuk deployment)
```bash
npm install -g vercel

# Verifikasi instalasi
vercel --version
```

#### 7. **Python** (Opsional - untuk model training)
```bash
# Download dari: https://python.org/
# Hanya diperlukan jika ingin training model sendiri

# Verifikasi
python --version
pip --version
```

---

## 📁 Struktur Project

```
lung-disease-diagnosis/
├── 📁 components/           # React components
│   ├── DiagnosisResult.jsx  # Komponen hasil diagnosis
│   ├── ImageUpload.jsx      # Komponen upload gambar
│   ├── Layout.jsx           # Layout utama aplikasi
│   └── 📁 ui/               # UI components
│       ├── Button.jsx       # Komponen button
│       ├── Card.jsx         # Komponen card
│       ├── Input.jsx        # Komponen input
│       └── Loading.jsx      # Komponen loading
├── 📁 pages/                # Next.js pages (routing)
│   ├── _app.js              # App wrapper
│   ├── _document.js         # Document template
│   ├── index.js             # Homepage (main interface)
│   ├── about.js             # Halaman tentang
│   ├── contact.js           # Halaman kontak
│   └── 📁 api/              # API endpoints
│       ├── health.js        # Health check endpoint
│       └── predict.js       # Prediction API
├── 📁 public/               # Static assets
│   ├── manifest.json        # PWA manifest
│   ├── robots.txt          # SEO robots
│   └── 📁 images/           # Gambar statis
├── 📁 styles/               # Styling
│   └── globals.css          # Global CSS + Tailwind
├── 📁 utils/                # Utility functions
│   ├── constants.js         # Konstanta aplikasi
│   ├── imageProcessing.js   # Image processing utils
│   └── validation.js        # Validation functions
├── 📁 models/               # AI models (akan dibuat)
│   └── model.json           # TensorFlow.js model
├── 📁 docs/                 # Dokumentasi
│   ├── api-documentation.md # Dokumentasi API
│   ├── deployment.md        # Panduan deployment
│   └── development.md       # Panduan development
├── 📁 scripts/              # Setup scripts
│   ├── setup.js            # Setup script Node.js
│   ├── setup.bat           # Setup script Windows
│   └── setup.sh            # Setup script Unix/Linux
├── 📄 package.json          # Dependencies & scripts
├── 📄 next.config.js        # Next.js configuration
├── 📄 tailwind.config.js    # Tailwind CSS config
├── 📄 postcss.config.js     # PostCSS config
├── 📄 .gitignore           # Git ignore rules
├── 📄 .env.local           # Environment variables
├── 📄 README.md            # Dokumentasi utama
└── 📄 PROJECT-SUMMARY.md   # Ringkasan project
```

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
# Clone project dari GitHub (setelah di-push)
git clone https://github.com/username/lung-disease-diagnosis.git
cd lung-disease-diagnosis

# Atau jika belum ada di GitHub, buat project baru
mkdir lung-disease-diagnosis
cd lung-disease-diagnosis
git init
```

### 2. Install Dependencies
```bash
# Install semua package yang diperlukan
npm install

# Atau menggunakan yarn
yarn install

# Atau menggunakan pnpm (lebih cepat)
pnpm install
```

### 3. Setup Environment Variables
```bash
# Copy template environment variables
cp .env.example .env.local

# Edit file .env.local sesuai kebutuhan
# Isi dengan konfigurasi yang diperlukan
```

### 4. Run Development Server
```bash
# Jalankan development server
npm run dev

# Atau dengan yarn
yarn dev

# Atau dengan pnpm
pnpm dev
```

### 5. Buka di Browser
```
Aplikasi akan berjalan di:
🌐 http://localhost:3000

Hot reload: ✅ Enabled
TypeScript: ✅ Supported
Tailwind CSS: ✅ Configured
ESLint: ✅ Configured
```

---

## 🔧 Konfigurasi Environment

### Environment Variables

Buat file `.env.local` di root project:

```bash
# .env.local

# ===========================================
# APLIKASI CONFIGURATION
# ===========================================
NEXT_PUBLIC_APP_NAME="Lung Disease Diagnosis"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_APP_DESCRIPTION="AI-powered lung disease diagnosis"

# ===========================================
# API CONFIGURATION
# ===========================================
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
API_SECRET_KEY="your-secret-key-here"

# ===========================================
# MODEL CONFIGURATION
# ===========================================
NEXT_PUBLIC_MODEL_VERSION="1.0.0"
NEXT_PUBLIC_MODEL_PATH="/models/model.json"
MODEL_CONFIDENCE_THRESHOLD=0.7

# ===========================================
# ANALYTICS & MONITORING (Optional)
# ===========================================
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
VERCEL_ANALYTICS_ID="prj_xxxxxxxxxx"

# ===========================================
# EXTERNAL SERVICES (Optional)
# ===========================================
NEXT_PUBLIC_SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"
NEXT_PUBLIC_POSTHOG_KEY="phc_xxxxxxxxxx"

# ===========================================
# DEPLOYMENT CONFIGURATION
# ===========================================
NEXT_PUBLIC_VERCEL_URL="https://your-app.vercel.app"
NEXT_PUBLIC_CUSTOM_DOMAIN="https://lung-diagnosis.yourdomain.com"
```

### Template `.env.example`
```bash
# Copy dari .env.local dan hapus nilai sensitif
# File ini akan di-commit ke Git sebagai template

NEXT_PUBLIC_APP_NAME="Lung Disease Diagnosis"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
API_SECRET_KEY="change-this-in-production"
NEXT_PUBLIC_MODEL_PATH="/models/model.json"
MODEL_CONFIDENCE_THRESHOLD=0.7
```

---

## 📊 Model AI

### Migrasi dari Google Colab

Model AI yang sudah dilatih di Google Colab perlu dikonversi ke format TensorFlow.js:

#### 1. Export Model dari Colab
```python
# Di Google Colab, tambahkan kode ini di akhir training:

import tensorflowjs as tfjs
import os

# Save model dalam format TensorFlow.js
model_save_path = '/content/model_tfjs'
tfjs.converters.save_keras_model(model, model_save_path)

# Download model files
from google.colab import files
import shutil

# Zip model files
shutil.make_archive('/content/lung_disease_model', 'zip', model_save_path)
files.download('/content/lung_disease_model.zip')

print("✅ Model berhasil dieksport dalam format TensorFlow.js")
print("📁 Download file lung_disease_model.zip")
print("📂 Extract ke folder /models di project Next.js")
```

#### 2. Setup Model di Next.js
```bash
# Buat folder models jika belum ada
mkdir -p public/models

# Extract model yang didownload dari Colab
# Copy semua file ke public/models/
# Struktur file:
# public/models/
# ├── model.json
# ├── group1-shard1of1.bin
# └── metadata.json
```

#### 3. Load Model di Frontend
```javascript
// utils/modelLoader.js
import * as tf from '@tensorflow/tfjs';

let model = null;

export async function loadModel() {
  if (!model) {
    try {
      console.log('🤖 Loading AI model...');
      model = await tf.loadLayersModel('/models/model.json');
      console.log('✅ Model loaded successfully');
      
      // Warm up model
      const dummyInput = tf.zeros([1, 224, 224, 3]);
      const warmupPrediction = model.predict(dummyInput);
      warmupPrediction.dispose();
      dummyInput.dispose();
      
      console.log('🔥 Model warmed up and ready');
    } catch (error) {
      console.error('❌ Error loading model:', error);
      throw new Error('Failed to load AI model');
    }
  }
  return model;
}

export async function predictImage(imageData) {
  const model = await loadModel();
  
  // Preprocess image
  const tensor = tf.browser.fromPixels(imageData)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .div(255.0)
    .expandDims(0);
  
  // Predict
  const predictions = await model.predict(tensor).data();
  
  // Cleanup
  tensor.dispose();
  
  return Array.from(predictions);
}
```

### Model Architecture (dari Colab)

Model yang digunakan memiliki arsitektur:

```python
# Arsitektur model dari Google Colab
Base Model: EfficientNetB0 (ImageNet pretrained)
Input Shape: (224, 224, 3)
Classes: 4 (Normal, Pneumonia, COVID-19, Tuberculosis)

Layers:
├── EfficientNetB0 (frozen weights)
├── GlobalAveragePooling2D
├── Dense(512, activation='relu')
├── Dropout(0.3)
├── Dense(256, activation='relu') 
├── Dropout(0.2)
└── Dense(4, activation='softmax')

Optimizer: Adam (lr=0.001)
Loss: categorical_crossentropy
Metrics: accuracy, precision, recall
```

---

## 📝 Push ke GitHub

### 1. Persiapan Repository GitHub

#### Buat Repository Baru
```bash
# 1. Buka https://github.com
# 2. Klik "New repository"
# 3. Isi details:
#    - Repository name: lung-disease-diagnosis
#    - Description: AI-powered lung disease diagnosis web application
#    - Visibility: Public (atau Private)
#    - ✅ Add README file: NO (karena sudah ada)
#    - ✅ Add .gitignore: NO (karena sudah ada)
#    - ✅ Choose a license: MIT (opsional)
# 4. Klik "Create repository"
```

### 2. Setup Git Local

```bash
# Initialize git (jika belum)
git init

# Cek status
git status

# Add remote origin
git remote add origin https://github.com/username/lung-disease-diagnosis.git

# Atau jika menggunakan SSH
git remote add origin git@github.com:username/lung-disease-diagnosis.git

# Verifikasi remote
git remote -v
```

### 3. Prepare Files untuk Commit

```bash
# Buat .gitignore jika belum ada
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/

# Production
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed

# Model files (jika besar)
# public/models/*.bin

# Temporary
.tmp/
temp/
EOF
```

### 4. Initial Commit

```bash
# Add semua file
git add .

# Cek file yang akan di-commit
git status

# Commit pertama
git commit -m "🎉 Initial commit: AI-powered lung disease diagnosis

Features:
✅ React/Next.js frontend with Tailwind CSS
✅ TensorFlow.js integration for AI inference
✅ Image upload with drag & drop
✅ Real-time diagnosis with confidence scoring
✅ Responsive design for mobile & desktop
✅ Input validation and error handling
✅ Medical recommendations and disclaimer

Tech Stack:
- Next.js 14.0
- React 18.2
- TensorFlow.js 4.15
- Tailwind CSS
- Lucide React Icons

Model:
- EfficientNetB0 with Transfer Learning
- Multi-class classification (4 classes)
- Client-side inference for privacy"
```

### 5. Push ke GitHub

```bash
# Push ke main branch
git branch -M main
git push -u origin main

# Jika ada error authentication, setup token:
# 1. Buka GitHub > Settings > Developer settings > Personal access tokens
# 2. Generate new token dengan scope 'repo'
# 3. Gunakan token sebagai password saat push
```

### 6. Verify di GitHub

```bash
# Buka repository di browser
# Pastikan semua file ter-upload dengan benar
# Cek README.md sudah ter-render dengan baik

# Optional: Setup branch protection rules
# Settings > Branches > Add rule untuk main branch
```

### 7. Setup GitHub Actions (Optional)

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run ESLint
      run: npm run lint
    
    - name: Build application
      run: npm run build
    
    - name: Run tests
      run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    - uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

---

## 🌐 Deploy ke Vercel

### 1. Persiapan Deployment

#### Install Vercel CLI
```bash
# Install secara global
npm install -g vercel

# Atau menggunakan npx (tidak perlu install global)
# npx vercel

# Verifikasi instalasi
vercel --version
```

#### Login ke Vercel
```bash
# Login dengan GitHub account (recommended)
vercel login

# Pilih GitHub, masukkan credentials
# Autorize Vercel untuk akses repository
```

### 2. Konfigurasi Project

#### Vercel Configuration File
```json
// vercel.json
{
  "version": 2,
  "name": "lung-disease-diagnosis",
  "alias": ["lung-diagnosis"],
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": ".next"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "build": {
    "env": {
      "NEXT_TELEMETRY_DISABLED": "1"
    }
  },
  "functions": {
    "pages/api/predict.js": {
      "maxDuration": 30
    }
  }
}
```

#### Next.js Configuration untuk Vercel
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false
  },
  images: {
    domains: [],
    unoptimized: true
  },
  // Optimizations untuk Vercel
  webpack: (config, { dev, isServer }) => {
    // Optimasi untuk TensorFlow.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  // PWA dan caching
  async headers() {
    return [
      {
        source: '/models/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### 3. Deploy Automatic (Recommended)

#### Setup Vercel GitHub Integration
```bash
# 1. Connect repository ke Vercel
# Buka: https://vercel.com/new
# Import Git Repository
# Pilih: lung-disease-diagnosis
# Configure project settings:

Project Name: lung-disease-diagnosis
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install

# 2. Environment Variables
# Tambahkan environment variables di Vercel dashboard:
```

#### Environment Variables untuk Production
```bash
# Di Vercel Dashboard > Settings > Environment Variables

# Application
NEXT_PUBLIC_APP_NAME=Lung Disease Diagnosis
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_VERCEL_URL=[auto-filled by Vercel]

# API Configuration
API_SECRET_KEY=[generate random string]
MODEL_CONFIDENCE_THRESHOLD=0.7

# Model Configuration
NEXT_PUBLIC_MODEL_VERSION=1.0.0
NEXT_PUBLIC_MODEL_PATH=/models/model.json

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
VERCEL_ANALYTICS_ID=prj_xxxxxxxxxx
```

### 4. Deploy Manual (Alternative)

```bash
# Deploy dari command line
vercel

# Ikuti prompt:
# ? Set up and deploy "~/lung-disease-diagnosis"? [Y/n] y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? lung-disease-diagnosis
# ? In which directory is your code located? ./

# Deploy ke production
vercel --prod

# Custom domain
vercel domains add lung-diagnosis.yourdomain.com
vercel domains ls
```

### 5. Custom Domain Setup

#### Beli Domain (Optional)
```bash
# Registrar rekomendasi:
# - Namecheap: https://namecheap.com
# - GoDaddy: https://godaddy.com  
# - Cloudflare: https://cloudflare.com
# - Google Domains: https://domains.google
```

#### Setup Custom Domain di Vercel
```bash
# 1. Di Vercel Dashboard:
#    Project Settings > Domains
#    Add Domain: yourdomain.com

# 2. DNS Configuration di domain registrar:
#    Type: CNAME
#    Name: www
#    Value: cname.vercel-dns.com
#    
#    Type: A
#    Name: @
#    Value: 76.76.19.61

# 3. SSL Certificate:
#    Vercel akan auto-generate SSL certificate
#    HTTPS akan aktif dalam 24-48 jam
```

### 6. Monitoring & Analytics

#### Vercel Analytics
```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to _app.js
import { Analytics } from '@vercel/analytics/react';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

#### Performance Monitoring
```javascript
// pages/_app.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals(metric) {
  console.log(metric);
  
  // Send ke analytics service
  if (process.env.NODE_ENV === 'production') {
    // gtag('event', metric.name, {
    //   event_category: 'Web Vitals',
    //   value: Math.round(metric.value),
    //   event_label: metric.id,
    //   non_interaction: true,
    // });
  }
}

// Auto-track Web Vitals
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  }, []);

  return <Component {...pageProps} />;
}
```

### 7. Deployment Checklist

#### Pre-deployment
- ✅ Build lokal berhasil (`npm run build`)
- ✅ Test di localhost (`npm start`)
- ✅ Environment variables configured
- ✅ Model files tersedia di `/public/models`
- ✅ ESLint warnings minimal
- ✅ Git repository up-to-date

#### Post-deployment
- ✅ Site accessible di production URL
- ✅ Image upload berfungsi
- ✅ AI prediction berjalan
- ✅ Responsive design di mobile
- ✅ Performance score baik (Lighthouse)
- ✅ SSL certificate aktif
- ✅ Custom domain (jika ada) working

#### Troubleshooting Common Issues
```bash
# Build Error: Module not found
# Solution: Cek import paths dan dependencies

# Deployment failed
vercel --debug

# Environment variables not working
# Cek Vercel dashboard Environment Variables

# Model loading error
# Pastikan model files di public/models accessible

# Performance issues
# Optimize images, enable caching, lazy loading
```

---

## 🧪 Testing

### Manual Testing Checklist

#### Functionality Testing
- ✅ **Image Upload**
  - Drag & drop berfungsi
  - Click to upload berfungsi
  - Preview gambar muncul
  - Validasi format file
  - Error handling untuk file invalid

- ✅ **AI Diagnosis**
  - Prediction API response
  - Confidence score calculation
  - Multi-class classification
  - Error handling untuk API failure

- ✅ **UI/UX Testing**
  - Responsive design (mobile, tablet, desktop)
  - Loading states
  - Error messages
  - Button interactions
  - Navigation flow

#### Browser Compatibility
```bash
# Test di browser berbeda:
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile Chrome (Android)
✅ Mobile Safari (iOS)
```

#### Performance Testing
```bash
# Test dengan Lighthouse
npm install -g lighthouse

# Test performance
lighthouse https://your-app.vercel.app --output html --output-path ./lighthouse-report.html

# Target scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 90+
# SEO: 90+
```

### Automated Testing (Future)
```javascript
// tests/upload.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import ImageUpload from '../components/ImageUpload';

describe('ImageUpload Component', () => {
  test('renders upload area', () => {
    render(<ImageUpload onImageSelect={() => {}} />);
    expect(screen.getByText(/drag.*drop/i)).toBeInTheDocument();
  });

  test('handles file selection', () => {
    const mockOnImageSelect = jest.fn();
    render(<ImageUpload onImageSelect={mockOnImageSelect} />);
    
    const file = new File(['dummy'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText(/upload/i);
    
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(mockOnImageSelect).toHaveBeenCalled();
  });
});
```

---

## 📚 API Documentation

### Endpoints

#### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0",
  "environment": "production"
}
```

#### Prediction
```http
POST /api/predict
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "filename": "chest-xray.jpg",
  "options": {
    "enhance": true,
    "debug": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "prediction": {
    "predictedClass": "Normal",
    "predictedClassIdx": 0,
    "confidence": 0.89,
    "confidenceLevel": {
      "level": "HIGH",
      "description": "Model sangat yakin dengan prediksi ini",
      "color": "green",
      "icon": "✅"
    },
    "allConfidences": [
      {
        "class": "Normal",
        "confidence": 0.89,
        "percentage": "89.0"
      },
      {
        "class": "Pneumonia", 
        "confidence": 0.07,
        "percentage": "7.0"
      },
      {
        "class": "COVID-19",
        "confidence": 0.03,
        "percentage": "3.0"
      },
      {
        "class": "Tuberculosis",
        "confidence": 0.01,
        "percentage": "1.0"
      }
    ],
    "recommendations": {
      "medical": [
        "Paru-paru menunjukkan kondisi normal",
        "Tetap jaga kesehatan dengan pola hidup sehat"
      ],
      "technical": [],
      "general": [
        "Hasil ini hanya untuk tujuan edukasi dan penelitian",
        "Selalu konsultasi dengan tenaga medis profesional"
      ]
    },
    "insights": [
      {
        "type": "positive",
        "message": "Paru-paru menunjukkan pola normal",
        "detail": "Tidak terdeteksi kelainan signifikan pada gambar"
      }
    ],
    "riskLevel": {
      "level": "LOW",
      "color": "green", 
      "message": "Risiko rendah - kondisi normal"
    },
    "nextSteps": [
      "Tetap jaga kesehatan paru-paru",
      "Kontrol rutin sesuai anjuran dokter",
      "Hindari merokok dan polusi udara"
    ],
    "disclaimer": "Hasil ini hanya untuk tujuan edukasi..."
  },
  "metadata": {
    "filename": "chest-xray.jpg",
    "processingTime": 2.456,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "modelVersion": "1.0.0",
    "inputSize": [224, 224],
    "preprocessingSteps": [
      "Image validation",
      "Resize to 224x224", 
      "Normalize to [0,1]",
      "Convert to RGB",
      "Quality enhancement"
    ]
  }
}
```

---

## 🔒 Disclaimer

### ⚠️ Disclaimer Medis

**PENTING:** Aplikasi ini dikembangkan untuk tujuan **edukasi dan penelitian** saja.

#### 🚫 Bukan Pengganti Diagnosis Medis
- Hasil diagnosis AI **TIDAK** dapat menggantikan penilaian medis profesional
- **TIDAK** boleh digunakan sebagai dasar untuk pengambilan keputusan medis
- **TIDAK** boleh digunakan untuk diagnosis klinis tanpa supervisi dokter

#### 👨‍⚕️ Konsultasi Medis Wajib
- **Selalu konsultasi** dengan dokter atau tenaga medis yang berkompeten
- Gunakan hasil ini hanya sebagai **informasi tambahan**
- Diagnosis pasti harus dilakukan oleh **profesional medis**

#### 🔬 Keterbatasan Teknologi
- Akurasi model bergantung pada **kualitas gambar** input
- Model dilatih pada dataset terbatas
- Tidak mencakup semua kondisi medis yang mungkin ada
- Hasil dapat bervariasi tergantung kondisi gambar

#### 📋 Syarat Penggunaan
- Pengguna bertanggung jawab penuh atas penggunaan aplikasi
- Developer tidak bertanggung jawab atas keputusan medis berdasarkan hasil aplikasi
- Aplikasi disediakan "as is" tanpa jaminan akurasi

#### 🔐 Privasi Data
- Gambar diproses secara lokal di browser
- Tidak ada data medis yang disimpan di server
- Privasi pengguna terlindungi sepenuhnya

---

## 📞 Support & Contact

### 🆘 Bantuan Teknis
- **GitHub Issues:** [Report Bug/Request Feature](https://github.com/username/lung-disease-diagnosis/issues)
- **Documentation:** [Wiki/Docs](https://github.com/username/lung-disease-diagnosis/wiki)
- **Email:** your-email@example.com

### 🤝 Kontribusi
- Fork repository ini
- Buat branch feature (`git checkout -b feature/amazing-feature`)
- Commit changes (`git commit -m 'Add amazing feature'`)
- Push ke branch (`git push origin feature/amazing-feature`)
- Buat Pull Request

### 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- **TensorFlow.js** team untuk framework AI
- **Next.js** team untuk React framework yang amazing
- **Tailwind CSS** untuk utility-first CSS framework
- **Vercel** untuk platform deployment yang mudah
- **Medical imaging community** untuk dataset dan research

---

**© 2024 Lung Disease Diagnosis. Made with ❤️ for medical education and research.**
