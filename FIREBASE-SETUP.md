# Firebase Setup Guide for Quiz2Play (Vite)

## Quick Start (Demo Mode)

The app is currently running in **demo mode** with mock authentication. To enable full functionality with real Firebase authentication, follow the steps below.

**Note**: This is a Vite project, so environment variables use `VITE_` prefix instead of `NEXT_PUBLIC_`.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `quiz2play` (or your preferred name)
4. Enable Google Analytics (optional)
5. Create the project

## Step 2: Enable Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click **Get started**
3. Go to the **Sign-in method** tab
4. Enable **Email/Password** authentication
5. Save the changes

## Step 3: Set up Firestore Database

1. Go to **Firestore Database** in the left sidebar
2. Click **Create database**
3. Choose **Start in test mode** (you can change security rules later)
4. Select a location closest to your users
5. Click **Done**

## Step 4: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click **Web app** icon (`</>`)
4. Enter app nickname: `Quiz2Play Web`
5. Check **"Also set up Firebase Hosting"** (optional)
6. Click **Register app**
7. Copy the Firebase configuration object

## Step 5: Update Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Firebase config:

```bash
# Firebase Configuration for Vite
VITE_FIREBASE_API_KEY=your-actual-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-actual-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
VITE_FIREBASE_APP_ID=your-actual-app-id
```

3. Save the file
4. Restart your development server:
   ```bash
   npm run dev
   ```

## Step 6: Test Authentication

1. Open your app in the browser
2. Click **Sign Up** in the header
3. Create a test account with email and password
4. Verify you can sign in and out successfully
5. Check Firestore for user data creation

## Security Rules (Production)

Once you're ready for production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Quiz sessions
    match /quizSessions/{sessionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }

    // Public leaderboard (read-only)
    match /leaderboard/{document=**} {
      allow read: if true;
    }
  }
}
```

## Troubleshooting

### Common Issues:

1. **"auth/operation-not-allowed"**

   - Make sure Email/Password is enabled in Firebase Auth

2. **"auth/invalid-api-key"**

   - Check that your API key is correct in `.env.local`

3. **"Network request failed"**

   - Verify your internet connection
   - Check if Firebase URLs are accessible

4. **User data not saving**
   - Ensure Firestore is set up and in test mode
   - Check browser console for errors

### Demo Mode Features:

When Firebase is not configured, the app runs in demo mode with:

- ✅ Full UI functionality
- ✅ Local state management
- ✅ Mock user data
- ❌ No persistent authentication
- ❌ No cloud data storage
- ❌ No leaderboards

### Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Setup Guide](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth/web/start)

After completing the setup, all authentication features will work with real user accounts and persistent data storage!
