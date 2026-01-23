# How to Publish Your Workout App

This guide covers several ways to deploy your React + Vite workout app.

## Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest option and works great with React apps.

### Steps:

1. **Create a GitHub account** (if you don't have one)
   - Go to https://github.com
   - Sign up for free

2. **Create a new repository**
   - Click "New repository"
   - Name it "workout-app" (or any name you like)
   - Make it public or private
   - Don't initialize with README (we'll push existing code)

3. **Push your code to GitHub**
   ```bash
   cd "/Users/joelsalinas/Dropbox (Personal)/Workout app"
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/workout-app.git
   git push -u origin main
   ```
   (Replace YOUR_USERNAME with your GitHub username)

4. **Deploy to Vercel**
   - Go to https://vercel.com
   - Sign up with your GitHub account (free)
   - Click "Add New Project"
   - Import your "workout-app" repository
   - Vercel will auto-detect it's a Vite app
   - Click "Deploy"
   - Your app will be live in ~2 minutes!

5. **Your app will be available at:**
   - `https://workout-app-xxxxx.vercel.app` (or your custom domain)

### Benefits:
- ✅ Free for personal projects
- ✅ Automatic deployments when you push to GitHub
- ✅ Custom domain support
- ✅ HTTPS automatically enabled

---

## Option 2: Netlify

Similar to Vercel, also very easy.

### Steps:

1. **Push to GitHub** (same as steps 1-3 above)

2. **Deploy to Netlify**
   - Go to https://netlify.com
   - Sign up with GitHub (free)
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Your app will be available at:**
   - `https://random-name-12345.netlify.app` (or your custom domain)

---

## Option 3: GitHub Pages

Free hosting directly from GitHub.

### Steps:

1. **Install gh-pages package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add these scripts:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
   And add this:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/workout-app"
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` → `/ (root)`
   - Save

5. **Your app will be available at:**
   - `https://YOUR_USERNAME.github.io/workout-app`

---

## Option 4: Build and Host Manually

If you want to host it yourself or on any web server.

### Steps:

1. **Build the app**
   ```bash
   npm run build
   ```
   This creates a `dist` folder with all the static files.

2. **Upload the `dist` folder**
   - Upload everything inside `dist/` to your web server
   - Any static hosting service works (AWS S3, Google Cloud Storage, etc.)

3. **Configure your server**
   - Make sure your server serves `index.html` for all routes (for React Router to work)
   - For Apache, add `.htaccess`:
     ```apache
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
     ```

---

## Testing the Build Locally

Before deploying, test your production build:

```bash
npm run build
npm run preview
```

This builds the app and serves it locally so you can test it.

---

## Recommended: Vercel

For the easiest experience, I recommend **Vercel**. It's:
- Free
- Automatic deployments
- No configuration needed
- Fast CDN
- Custom domains

Just push to GitHub and connect to Vercel!
