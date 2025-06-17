# 🔥 Firebase Console Setup Guide

## ❌ Current Error: `auth/invalid-app-credential`

This error means **Phone Authentication is not properly enabled** in your Firebase Console.

## 🚀 Step-by-Step Fix

### Step 1: Go to Firebase Console

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Click on your project: **quiz-20372**

### Step 2: Enable Phone Authentication

1. In the left sidebar, click **Authentication**
2. Click on the **Sign-in method** tab
3. Scroll down to find **Phone** in the sign-in providers list
4. Click on **Phone**
5. **Toggle the Enable switch to ON**
6. Click **Save**

### Step 3: Configure Authorized Domains

1. Still in **Authentication** → **Sign-in method**
2. Scroll down to **Authorized domains** section
3. Click **Add domain**
4. Add these domains one by one:
   ```
   localhost
   quiz-20372.firebaseapp.com
   ```
5. If you have a custom domain, add that too

### Step 4: Verify Project Settings

1. Go to **Project settings** (gear icon in left sidebar)
2. Under **General** tab, verify:
   - Project ID: `quiz-20372`
   - Web API Key: `AIzaSyC7UBXpBnZI0G5gN6_y697fWSfy84CH-dE`

### Step 5: Check Cloud Console (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: **quiz-20372**
3. Go to **APIs & Services** → **Enabled APIs**
4. Ensure these APIs are enabled:
   - Identity and Access Management (IAM) API
   - Firebase Authentication API

## 📱 Test After Setup

1. Go back to your app: `http://localhost:8080`
2. Try the phone authentication again
3. Or use the test page: `http://localhost:8080/phone-auth-test`

## 🔍 Verification Checklist

- [ ] Phone sign-in method is **enabled** (toggle is ON)
- [ ] `localhost` is in authorized domains
- [ ] `quiz-20372.firebaseapp.com` is in authorized domains
- [ ] Project ID matches: `quiz-20372`
- [ ] No typos in configuration

## 🎯 What Should Happen

After enabling phone authentication, you should see:

1. reCAPTCHA working ✅ (already working)
2. OTP sent successfully ✅ (should work now)
3. No more `invalid-app-credential` error

## 🆘 Still Not Working?

If you still get errors:

1. **Clear browser cache** and try again
2. **Wait 5-10 minutes** for Firebase changes to propagate
3. **Try incognito mode** to rule out browser issues
4. **Check Firebase Console again** to ensure settings are saved

## 📸 Visual Guide

The Phone sign-in option in Firebase Console should look like this:

```
Sign-in method tab:
└── Phone
    ├── [ENABLED] ← This should be ON
    └── Save button
```

## 🔄 After Fixing

Once you enable phone authentication in Firebase Console:

1. Your error will change from `invalid-app-credential` to success
2. You'll receive real SMS messages
3. The authentication flow will work properly

---

**Next Step**: Enable Phone Authentication in Firebase Console and try again!
