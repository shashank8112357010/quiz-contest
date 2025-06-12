# 🚀 Quiz2Play Deployment Guide

This guide covers how to deploy Quiz2Play on various hosting platforms with proper SPA (Single Page Application) routing configuration.

## 📋 Overview

Quiz2Play is a React SPA built with Vite. When users navigate to URLs like `/categories` or `/contests` directly, the server needs to serve the `index.html` file so React Router can handle the routing client-side.

## 🔧 Build Process

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the build locally
npm run start
```

The build files will be generated in the `dist/` directory.

## 🌐 Server Configurations

### Apache (.htaccess)

If deploying to an Apache server, use the provided `.htaccess` file in the `public/` directory:

```apache
# This file is already included at public/.htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !^/api/
  RewriteCond %{REQUEST_URI} !\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|pdf|txt|xml|json)$
  RewriteRule ^(.*)$ /index.html [L,QSA]
</IfModule>
```

### Nginx

Use the provided `nginx.conf` file in the `public/` directory as a reference:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static assets with caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|pdf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🚀 Popular Hosting Platforms

### Vercel (Recommended for React)

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Vercel automatically handles SPA routing

### Netlify

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add a `_redirects` file to handle SPA routing:

```
# Create public/_redirects file
/*    /index.html   200
```

### GitHub Pages

1. Install `gh-pages` package:

```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:

```json
{
  "homepage": "https://yourusername.github.io/quiz2play",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Deploy:

```bash
npm run deploy
```

### Firebase Hosting

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Initialize Firebase in your project:

```bash
firebase init hosting
```

3. Configure `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

4. Deploy:

```bash
npm run build
firebase deploy
```

### AWS S3 + CloudFront

1. Build your app: `npm run build`
2. Upload `dist/` contents to S3 bucket
3. Enable static website hosting
4. Set index document to `index.html`
5. Set error document to `index.html` (important for SPA routing)
6. Configure CloudFront distribution for better performance

### DigitalOcean App Platform

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `NODE_VERSION=18`

## 🔍 Common Issues & Solutions

### 404 Errors on Direct URL Access

**Problem**: Users get 404 errors when accessing URLs like `/categories` directly.

**Solution**: Ensure your server is configured to serve `index.html` for all routes that don't correspond to actual files.

### Build Errors

**Problem**: Build fails with memory issues.

**Solution**: Increase Node.js memory limit:

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### CORS Issues

**Problem**: API calls fail due to CORS.

**Solution**: Configure your API server to allow requests from your domain, or use a proxy in your Vite config.

### Caching Issues

**Problem**: Users see old version after deployment.

**Solution**:

- Ensure `index.html` has no-cache headers
- Use versioned asset names (Vite does this automatically)
- Add cache-busting to your deployment process

## 📊 Performance Optimization

### Enable Compression

Most hosting platforms enable gzip/brotli compression automatically. For custom servers:

**Apache**: Enable `mod_deflate`
**Nginx**: Enable `gzip on`

### CDN Configuration

- Use a CDN for static assets
- Enable compression
- Set appropriate cache headers
- Use HTTP/2

### Monitoring

Set up monitoring for:

- Page load times
- Core Web Vitals
- Error tracking
- Uptime monitoring

## 🔒 Security Headers

The provided configurations include security headers:

- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` (adjust as needed)

## 🏃‍♂️ Quick Start Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📱 PWA Features

Quiz2Play includes PWA features:

- Service worker for offline functionality
- Web app manifest
- Icon set for different devices
- Installable on mobile devices

Ensure your hosting platform serves these files correctly:

- `/manifest.json`
- `/sw.js` (if using service worker)
- Icon files in `/icons/`

## 🐛 Troubleshooting

1. **Clear browser cache** when testing deployments
2. **Check browser console** for JavaScript errors
3. **Verify all routes work** after deployment
4. **Test on different devices** and browsers
5. **Monitor server logs** for any issues

---

For specific issues, check the hosting platform's documentation or open an issue in the repository.
