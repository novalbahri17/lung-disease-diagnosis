# 🚀 Panduan Deploy ke Vercel

## Langkah-langkah Deploy

### 1. Persiapan Repository
✅ Repository sudah di-push ke GitHub

### 2. Deploy dengan Vercel CLI (Otomatis)

#### Install Vercel CLI
```bash
npm i -g vercel
```

#### Login ke Vercel
```bash
vercel login
```

#### Deploy aplikasi
```bash
vercel
```

### 3. Deploy melalui Vercel Dashboard (Manual)

1. **Buka https://vercel.com**
2. **Login/Register** dengan akun GitHub Anda
3. **Klik "New Project"**
4. **Import repository** yang sudah Anda push
5. **Konfigurasi project:**
   - Project Name: `ai-diagnosis-paru-paru`
   - Framework Preset: `Next.js`
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

6. **Environment Variables** (Optional):
   - Tidak ada environment variables yang perlu ditambahkan untuk saat ini

7. **Klik "Deploy"**

### 4. Setelah Deploy Berhasil

✅ **URL Production:** Vercel akan memberikan URL seperti `https://ai-diagnosis-paru-paru.vercel.app`

✅ **Custom Domain:** Anda bisa menambahkan custom domain di dashboard Vercel

✅ **Automatic Deployments:** Setiap push ke branch main akan otomatis trigger deploy ulang

## 🔧 Konfigurasi Vercel

File `vercel.json` sudah dikonfigurasi dengan:
- Build settings untuk Next.js
- API routes configuration
- Function timeouts
- Production environment

## 📊 Hasil Expected

Setelah deploy berhasil, aplikasi akan memiliki:
- ✅ Homepage dengan upload gambar X-ray
- ✅ Halaman About dalam bahasa Indonesia
- ✅ Halaman Contact dengan form
- ✅ API endpoints untuk prediction dan health check
- ✅ Responsive design untuk mobile dan desktop
- ✅ PWA ready (jika diperlukan)

## 🚨 Troubleshooting

### Jika Deploy Gagal:
1. **Check build logs** di Vercel dashboard
2. **Pastikan dependencies** di package.json lengkap
3. **Check Node.js version** (gunakan Node 18+)

### Jika API tidak bekerja:
1. **Check function logs** di Vercel dashboard
2. **Pastikan API timeout** cukup (sudah diset 30 detik)
3. **Check environment variables** jika diperlukan

## 🎯 Tips Deployment

1. **Domain Custom:** Beli domain dan connect ke Vercel untuk URL profesional
2. **Analytics:** Enable Vercel Analytics untuk monitoring performa
3. **Preview Deployments:** Setiap PR akan otomatis dapat preview URL
4. **Rollback:** Jika ada masalah, bisa rollback ke deployment sebelumnya

---

**Happy Deploying! 🚀**
