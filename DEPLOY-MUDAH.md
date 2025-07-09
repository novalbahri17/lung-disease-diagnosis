# 🚀 DEPLOY MUDAH - Langkah Cepat ke Vercel

## 🎯 **CARA TERMUDAH (5 Menit)**

### Opsi 1: Via Browser (PALING MUDAH)
1. **Buka:** https://vercel.com/new
2. **Login** dengan GitHub
3. **Import** repository: `novalbahri17/lung-disease-diagnosis`
4. **Settings:**
   - Project Name: `ai-diagnosis-paru-paru`
   - Framework: Next.js (auto-detect)
   - Keep semua default settings
5. **Klik Deploy** 🚀

### Opsi 2: Via CLI (Jika mau coba lagi)
```bash
# Login dulu
npx vercel login

# Deploy
npx vercel --prod

# Ikuti prompt:
# - Set up project? YES
# - Project name: ai-diagnosis-paru-paru
# - Deploy? YES
```

## 🔧 **Settings untuk Vercel Dashboard**

Jika ada yang perlu diubah setelah deploy:

### Build Settings
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node.js Version: 18.x
```

### Environment Variables
```
TIDAK PERLU DIISI APA-APA
(Kosongkan saja)
```

## 🎉 **Setelah Deploy Berhasil**

✅ **URL akan seperti:** `https://ai-diagnosis-paru-paru-xxxx.vercel.app`
✅ **Auto-deploy:** Setiap push ke GitHub
✅ **Free tier:** 100GB bandwidth/bulan

## 🚨 **Jika Error**

1. **Build Failed?** 
   - Cek di dashboard Vercel logs
   - Pastikan `npm run build` lokal works

2. **Function Timeout?**
   - Sudah di-set 30 detik di vercel.json

3. **404 Error?**
   - Routing sudah di-handle di vercel.json

## 📱 **Test Setelah Deploy**

- [ ] Homepage loading ✅
- [ ] Upload gambar works ✅  
- [ ] Diagnosis muncul ✅
- [ ] Mobile responsive ✅
- [ ] Bahasa Indonesia ✅

---

**💡 Tip:** Gunakan opsi browser (vercel.com/new) - paling mudah dan cepat! 🚀
