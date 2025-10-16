# 🔐 Google OAuth Configuration for Production

## Problem

After deployment, Google OAuth redirects to `http://localhost:3000/?code=xxx` instead of production URL.

## Root Cause

OAuth callback URLs are still configured for localhost instead of production domain.

---

## ✅ Solution: Update OAuth Configuration

### 1. **Supabase Authentication Settings**

#### A. Login to Supabase Dashboard

1. Go to: https://app.supabase.com
2. Select project: `ykvvjxbyxmyyzeutyxbf` (Bukadita)
3. Navigate to: **Authentication** → **URL Configuration**

#### B. Update Site URL

```
Site URL: https://user-bukadita.vercel.app
```

_(Replace with your actual production URL)_

#### C. Add Redirect URLs

Add the following URLs (one per line):

```
http://localhost:3000/callback
https://user-bukadita.vercel.app/callback
https://user-bukadita-*.vercel.app/callback
```

**Note:** The wildcard `*` allows all Vercel preview deployments.

#### D. Save Changes

Click **Save** button at the bottom.

---

### 2. **Google Cloud Console - OAuth Configuration**

#### A. Login to Google Cloud Console

1. Go to: https://console.cloud.google.com
2. Select the OAuth project used for Bukadita
3. Navigate to: **APIs & Services**

#### B. Update OAuth Consent Screen

1. Click **OAuth consent screen**
2. Scroll to **Authorized domains**
3. Add:
   ```
   vercel.app
   user-bukadita.vercel.app
   ```
4. Click **Save and Continue**

#### C. Update OAuth Credentials

1. Click **Credentials** tab
2. Find and click your **OAuth 2.0 Client ID**
3. In **Authorized JavaScript origins**, add:

   ```
   https://user-bukadita.vercel.app
   https://ykvvjxbyxmyyzeutyxbf.supabase.co
   ```

4. In **Authorized redirect URIs**, add:

   ```
   https://ykvvjxbyxmyyzeutyxbf.supabase.co/auth/v1/callback
   https://user-bukadita.vercel.app/callback
   ```

5. Click **Save**

---

### 3. **Vercel Environment Variables**

#### Update NEXT_PUBLIC_SITE_URL

1. Go to Vercel Dashboard
2. Select project: **user-bukadita**
3. Navigate to: **Settings** → **Environment Variables**
4. Edit `NEXT_PUBLIC_SITE_URL`:
   ```
   NEXT_PUBLIC_SITE_URL=https://user-bukadita.vercel.app
   ```
5. Select: **Production**, **Preview**, **Development**
6. Click **Save**

#### Redeploy

1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Wait for deployment to complete (~3-5 minutes)

---

## 🧪 Testing After Configuration

### Test OAuth Flow:

1. Open production URL: `https://user-bukadita.vercel.app`
2. Click **Login with Google**
3. Select Google account
4. Should redirect to: `https://user-bukadita.vercel.app/callback?code=xxx`
5. Then redirect to: `https://user-bukadita.vercel.app/user/beranda`

### Expected Flow:

```
Production → Google OAuth → Supabase Auth → /callback → /user/beranda
```

### ✅ Success Indicators:

- No localhost URLs in browser address bar
- User successfully logged in
- Redirected to dashboard
- Token stored in localStorage
- No CORS errors in console

### ❌ Common Issues:

**Issue 1: Still redirects to localhost**

- Clear browser cache
- Check Supabase Site URL is correct
- Verify Google OAuth URIs saved properly
- Hard refresh (Ctrl+Shift+R)

**Issue 2: "Redirect URI mismatch" error**

- Ensure Supabase callback URL added to Google OAuth
- Format: `https://[PROJECT_ID].supabase.co/auth/v1/callback`
- Check for typos in URLs

**Issue 3: "Invalid redirect_uri"**

- Verify Supabase Redirect URLs includes production domain
- Check for trailing slashes (should not have)
- Ensure protocol is `https://` not `http://`

---

## 📋 Configuration Checklist

### Supabase Dashboard:

- [ ] Site URL: `https://user-bukadita.vercel.app`
- [ ] Redirect URL: `https://user-bukadita.vercel.app/callback`
- [ ] Redirect URL: `https://user-bukadita-*.vercel.app/callback`
- [ ] Redirect URL: `http://localhost:3000/callback` (for dev)

### Google Cloud Console:

- [ ] Authorized domains: `vercel.app`
- [ ] Authorized domains: `user-bukadita.vercel.app`
- [ ] JS origins: `https://user-bukadita.vercel.app`
- [ ] JS origins: `https://ykvvjxbyxmyyzeutyxbf.supabase.co`
- [ ] Redirect URI: `https://ykvvjxbyxmyyzeutyxbf.supabase.co/auth/v1/callback`
- [ ] Redirect URI: `https://user-bukadita.vercel.app/callback`

### Vercel Dashboard:

- [ ] `NEXT_PUBLIC_SITE_URL` = production URL
- [ ] All environment variables correct
- [ ] Redeployed after changes

---

## 🔍 Debug Commands

### Check Current Site URL in Browser Console:

```javascript
console.log("Site URL:", process.env.NEXT_PUBLIC_SITE_URL);
console.log("Current Origin:", window.location.origin);
```

### Check Supabase Client Config:

```javascript
import { supabase } from "@/lib/supabase";
console.log("Supabase URL:", supabase.supabaseUrl);
```

### Test Redirect Flow:

```javascript
// In browser console on production
window.location.origin + "/callback";
// Should return: https://user-bukadita.vercel.app/callback
```

---

## 📚 Additional Resources

- **Supabase OAuth Docs**: https://supabase.com/docs/guides/auth/social-login/auth-google
- **Google OAuth Setup**: https://developers.google.com/identity/protocols/oauth2
- **Vercel Environment Variables**: https://vercel.com/docs/projects/environment-variables

---

## 🎯 Production URLs Reference

```bash
# Frontend
Production: https://user-bukadita.vercel.app
Preview: https://user-bukadita-[branch].vercel.app

# Backend
API: https://api-bukadita.vercel.app

# Supabase
Project: https://ykvvjxbyxmyyzeutyxbf.supabase.co
Auth Callback: https://ykvvjxbyxmyyzeutyxbf.supabase.co/auth/v1/callback

# OAuth Callbacks
Frontend: https://user-bukadita.vercel.app/callback
Supabase: https://ykvvjxbyxmyyzeutyxbf.supabase.co/auth/v1/callback
```

---

_Last Updated: October 16, 2025_
_Issue: Google OAuth redirects to localhost after deployment_
_Status: Configuration guide provided_
