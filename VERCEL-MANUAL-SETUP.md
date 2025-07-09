# 🚀 Panduan Deploy Manual ke Vercel

## 📋 Checklist Sebelum Deploy
✅ **Kode sudah siap** - Build berhasil tanpa error
✅ **Repository sudah di-push** ke GitHub
✅ **File konfigurasi** sudah tersedia (`vercel.json`)

## 🌐 Langkah Deploy Manual via Vercel Dashboard

### 1. Buka Vercel Dashboard
1. Kunjungi: **https://vercel.com**
2. **Login** dengan akun GitHub Anda
3. Klik **"Add New..."** → **"Project"**

### 2. Import Repository
1. Pilih **"Import Git Repository"**
2. Cari repository: **`novalbahri17/lung-disease-diagnosis`**
3. Klik **"Import"**

### 3. Configure Project Settings

#### 📂 **Build and Output Settings**
```
Project Name: ai-diagnosis-paru-paru
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node.js Version: 18.x (Recommended)
```

#### 🔧 **Environment Variables**
**TIDAK ADA** environment variables yang perlu ditambahkan saat ini.
Aplikasi ini menggunakan:
- Static file handling untuk gambar
- Client-side processing
- No external APIs atau database

#### ⚙️ **Advanced Settings (Optional)**
```
Function Regions: Washington D.C., USA (iad1) - Default
Serverless Function Timeout: 10s (Default)
Edge Functions: None needed
```

### 4. Deploy Settings di vercel.json
File `vercel.json` sudah dikonfigurasi dengan:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
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
  "functions": {
    "pages/api/predict.js": {
      "maxDuration": 30
    },
    "pages/api/predict_new.js": {
      "maxDuration": 30
    }
  }
}
```

### 5. Klik Deploy!
1. Review semua setting
2. Klik **"Deploy"**
3. Tunggu proses deployment (biasanya 2-3 menit)

## 🎯 Setelah Deploy Berhasil

### URL Production
✅ **URL Otomatis:** `https://ai-diagnosis-paru-paru.vercel.app`
✅ **URL Custom:** Bisa ditambahkan di dashboard

### Fitur yang Tersedia
✅ **Upload Gambar X-ray**
✅ **AI Diagnosis** dengan confidence score
✅ **Responsive Design** (Mobile & Desktop)
✅ **Bahasa Indonesia** lengkap
✅ **Auto-redeploy** ketika push ke GitHub

### Testing Checklist
- [ ] Homepage loading
- [ ] Upload gambar berhasil
- [ ] Diagnosis result muncul
- [ ] Navigasi berfungsi
- [ ] Responsive di mobile
- [ ] About & Contact page

## 🔧 Troubleshooting

### Jika Build Gagal
1. Cek **Build Logs** di Vercel dashboard
2. Pastikan `package.json` tidak ada error
3. Jalankan `npm run build` lokal dulu

### Jika Function Timeout
1. Tingkatkan `maxDuration` di `vercel.json`
2. Optimize ukuran gambar yang di-upload

### Jika 404 Error
1. Cek routing di `vercel.json`
2. Pastikan file pages ada di folder yang benar

## 📝 Notes
- **Gratis tier Vercel:** 100GB bandwidth/bulan
- **Function timeout:** 10 detik (bisa sampai 30 detik)
- **File size limit:** 50MB per function
- **Custom domain:** Bisa ditambahkan gratis

## 🎉 Selamat!
Aplikasi AI Diagnosis Paru-paru Anda sudah siap online! 🚀
