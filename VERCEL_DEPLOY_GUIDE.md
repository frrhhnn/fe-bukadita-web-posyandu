# 🚀 Panduan Deploy Frontend ke Vercel

## 📋 Prerequisites

- ✅ Akun Vercel (https://vercel.com)
- ✅ Repository GitHub sudah di-push
- ✅ Backend sudah live di: `https://api-bukadita.vercel.app`

---

## 🎯 Step-by-Step Deployment

### Step 1: Login ke Vercel

1. Buka https://vercel.com
2. Login dengan GitHub account
3. Authorize Vercel untuk access repositories Anda

---

### Step 2: Import Project

1. Click **"Add New"** → **"Project"**
2. Pilih repository: **`frrhhnn/fe-bukadita-web-posyandu`**
3. Click **"Import"**

---

### Step 3: Configure Project Settings

#### **Framework Preset**

- Auto-detected: **Next.js** ✅
- Biarkan default

#### **Root Directory**

- Leave as: `./` (root)

#### **Build Settings**

Vercel akan otomatis detect dari `vercel.json`, tapi pastikan:

- **Build Command**: `npm run build` (auto)
- **Output Directory**: `.next` (auto)
- **Install Command**: `npm install` (auto)

---

### Step 4: Environment Variables (PENTING! 🔐)

Click **"Environment Variables"** dan tambahkan semua variable berikut:

#### **Untuk Environment: Production, Preview, Development** (pilih semua 3)

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ykvvjxbyxmyyzeutyxbf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrdnZqeGJ5eG15eXpldXR5eGJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzEwODMsImV4cCI6MjA3Mzk0NzA4M30.tc9c2p82blXV-PG3QX9KVWQ_P5YDlxY60R-j7V2G2bU

SUPABASE_URL=https://ykvvjxbyxmyyzeutyxbf.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrdnZqeGJ5eG15eXpldXR5eGJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzEwODMsImV4cCI6MjA3Mzk0NzA4M30.tc9c2p82blXV-PG3QX9KVWQ_P5YDlxY60R-j7V2G2bU

# Backend API Configuration
NEXT_PUBLIC_BACKEND_URL=https://api-bukadita.vercel.app
BE_URL=https://api-bukadita.vercel.app

# Authentication Endpoints
LOGIN_URL=https://api-bukadita.vercel.app/api/auth/login
REG_URL=https://api-bukadita.vercel.app/api/auth/register

# Site Configuration (AKAN DIUPDATE SETELAH DEPLOY)
NEXT_PUBLIC_SITE_URL=https://fe-bukadita-web-posyandu.vercel.app

# Environment
NODE_ENV=production
```

⚠️ **CATATAN**:

- `NEXT_PUBLIC_SITE_URL` akan berubah setelah deploy pertama kali
- Anda perlu update variable ini dengan URL yang sebenarnya nanti

---

### Step 5: Deploy!

1. Review semua settings
2. Click **"Deploy"**
3. Tunggu ±3-5 menit untuk build & deployment

---

### Step 6: Setelah Deploy Pertama

#### **Catat URL Frontend Anda**

Setelah deployment selesai, Anda akan dapat URL seperti:

- `https://fe-bukadita-web-posyandu.vercel.app` (production)
- atau `https://fe-bukadita-web-posyandu-xxx.vercel.app` (custom)

#### **Update Environment Variables**

1. Buka **Project Settings** → **Environment Variables**
2. Edit `NEXT_PUBLIC_SITE_URL`:
   ```
   NEXT_PUBLIC_SITE_URL=https://fe-bukadita-web-posyandu.vercel.app
   ```
3. Save changes

#### **Redeploy**

1. Buka tab **Deployments**
2. Click **"Redeploy"** pada deployment terakhir
3. Tunggu hingga selesai (±2 menit)

---

## ✅ Testing Setelah Deploy

### 1. **Test Backend Connection**

Buka browser console (F12) dan check:

```javascript
console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
// Harus return: https://api-bukadita.vercel.app
```

### 2. **Test Endpoints**

- **Landing Page**: `https://your-frontend.vercel.app/`
- **Login**: `https://your-frontend.vercel.app/login`
- **Register**: `https://your-frontend.vercel.app/register`
- **Dashboard**: `https://your-frontend.vercel.app/user/beranda`

### 3. **Test Features**

- [ ] Register akun baru → Berhasil
- [ ] Login dengan akun → Berhasil
- [ ] Load modules di dashboard → Berhasil
- [ ] Click module → Detail page load
- [ ] Upload foto profil → Berhasil
- [ ] Change password → Berhasil
- [ ] Notifikasi → Permission muncul
- [ ] Logout → Redirect ke landing page

### 4. **Check Browser Console**

Pastikan tidak ada error:

- ❌ No CORS errors
- ❌ No 404 errors
- ❌ No network errors
- ✅ All API calls return 200/201

---

## 🔧 Troubleshooting

### Problem: CORS Error

**Error**: `Access-Control-Allow-Origin`
**Solution**:

1. Backend sudah allow all vercel.app domains
2. Tunggu backend redeploy selesai (cek Vercel dashboard backend)
3. Clear browser cache & hard refresh (Ctrl+Shift+R)

### Problem: API Calls Return 404

**Error**: `GET https://api-bukadita.vercel.app/api/v1/modules 404`
**Solution**:

1. Check backend URL di environment variables
2. Pastikan tidak ada trailing slash: ✅ `https://api-bukadita.vercel.app` ❌ `https://api-bukadita.vercel.app/`
3. Redeploy frontend

### Problem: Environment Variables Not Working

**Error**: Variables return `undefined`
**Solution**:

1. Pastikan variable name diawali dengan `NEXT_PUBLIC_` untuk client-side
2. Rebuild & redeploy setelah menambah/edit variables
3. Check di Vercel Dashboard → Settings → Environment Variables

### Problem: Images Not Loading

**Error**: Supabase images tidak tampil
**Solution**:

1. Check `next.config.ts` → `images.remotePatterns`
2. Pastikan Supabase domain sudah ditambahkan
3. Redeploy

### Problem: Build Failed

**Error**: Build fails dengan TypeScript/ESLint errors
**Solution**:

1. Run `npm run build` locally
2. Fix semua errors
3. Push ke GitHub
4. Vercel akan auto-redeploy

---

## 🎯 Custom Domain (Optional)

### Menambahkan Domain Sendiri

1. Buka Project Settings → **Domains**
2. Click **"Add Domain"**
3. Masukkan domain: `bukadita.com` atau `app.bukadita.com`
4. Follow DNS configuration instructions
5. Tunggu DNS propagation (±24 jam)

### Update Environment Variables Setelah Custom Domain

```bash
NEXT_PUBLIC_SITE_URL=https://app.bukadita.com
```

---

## 📊 Monitoring & Analytics

### View Deployment Logs

1. Buka tab **Deployments**
2. Click deployment yang ingin dilihat
3. Tab **"Build Logs"** untuk build process
4. Tab **"Function Logs"** untuk runtime errors

### Performance Monitoring

- **Speed Insights**: Automatically enabled di Vercel
- **Analytics**: Enable di Project Settings

---

## 🔐 Security Checklist

- [ ] Environment variables tidak ter-commit ke Git
- [ ] `.env` ada di `.gitignore`
- [ ] `NEXT_PUBLIC_*` hanya untuk non-sensitive data
- [ ] Backend CORS properly configured
- [ ] Supabase RLS policies active
- [ ] No API keys exposed in client bundle

---

## 📝 Post-Deployment Tasks

### 1. Update Backend CORS (PENTING!)

Setelah dapat URL frontend production, update backend `src/app.js`:

```javascript
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://fe-bukadita-web-posyandu.vercel.app", // Update ini
        /https:\/\/.*\.vercel\.app$/, // Keep untuk preview deployments
      ]
    : [...];
```

Ubah juga:

```javascript
// Dari:
callback(null, true); // Allow for now during testing

// Menjadi:
callback(new Error("Not allowed by CORS")); // Strict CORS untuk production
```

Push & redeploy backend.

### 2. Test Production Thoroughly

- Minimum 30 menit testing all features
- Test di berbagai browser (Chrome, Firefox, Safari, Edge)
- Test di mobile devices
- Check all error scenarios

### 3. Setup Monitoring

- Enable Vercel Speed Insights
- Setup error tracking (Sentry optional)
- Monitor logs regularly

---

## 🎉 Success Checklist

Deployment successful jika:

- ✅ Frontend accessible via HTTPS
- ✅ Backend API calls working
- ✅ Login/Register berfungsi
- ✅ All modules load correctly
- ✅ Images dari Supabase tampil
- ✅ No console errors
- ✅ PWA installable di mobile
- ✅ Performance good (Lighthouse > 70)

---

## 📞 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs/deployment
- **Discord/Slack**: [Your support channel]

---

_Last Updated: October 16, 2025_
_Backend URL: https://api-bukadita.vercel.app_
