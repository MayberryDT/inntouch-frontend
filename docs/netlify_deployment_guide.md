# Netlify Deployment Guide for InnTouch Frontend

This guide provides step-by-step instructions for deploying the InnTouch frontend application to Netlify.

## Prerequisites

- GitHub repository with the InnTouch frontend code
- Netlify account
- Firebase project (for authentication)

## Manual Deployment Steps

### 1. Create a Netlify Site

1. Log in to your Netlify account at [https://app.netlify.com/](https://app.netlify.com/)
2. Click "New site from Git"
3. Select GitHub as your Git provider
4. Authenticate with GitHub if prompted
5. Select the InnTouch frontend repository
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
7. Click "Deploy site"

### 2. Configure Environment Variables

1. Go to your site's dashboard in Netlify
2. Navigate to Site settings > Build & deploy > Environment
3. Add the following environment variables:
   - `REACT_APP_API_URL`: The URL of your backend API
   - `REACT_APP_FIREBASE_API_KEY`: Your Firebase API key
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
   - `REACT_APP_FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `REACT_APP_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
   - `REACT_APP_FIREBASE_APP_ID`: Your Firebase app ID
4. Click "Save" after adding each variable

### 3. Configure Custom Domain (Optional)

1. Go to your site's dashboard in Netlify
2. Navigate to Site settings > Domain management
3. Click "Add custom domain"
4. Enter your domain name and follow the instructions to set it up

## Automated Deployment with GitHub Actions

### 1. Get Netlify API Credentials

1. Go to your Netlify user settings (click your avatar > User settings)
2. Navigate to Applications > Personal access tokens
3. Click "New access token"
4. Give it a name (e.g., "GitHub Actions") and click "Generate token"
5. Copy the generated token (you'll need it for GitHub secrets)
6. Go to your site's dashboard in Netlify
7. Copy your Site ID from the Site settings > General > Site details

### 2. Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following secrets:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
   - `NETLIFY_SITE_ID`: Your Netlify site ID
   - `REACT_APP_API_URL`: The URL of your backend API
   - `REACT_APP_FIREBASE_API_KEY`: Your Firebase API key
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
   - `REACT_APP_FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `REACT_APP_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
   - `REACT_APP_FIREBASE_APP_ID`: Your Firebase app ID

### 3. Verify GitHub Actions Workflow

1. Make sure the `.github/workflows/netlify-deploy.yml` file exists in your repository
2. Push a change to the main branch to trigger the workflow
3. Go to the Actions tab in your GitHub repository to monitor the workflow

## Troubleshooting

### Build Failures

If your build fails, check the following:

1. Verify that all required environment variables are set
2. Check the build logs for specific error messages
3. Ensure your code builds successfully locally with `npm run build`

### Deployment Issues

If deployment fails:

1. Verify your Netlify authentication token and site ID
2. Check GitHub Actions logs for specific error messages
3. Ensure your GitHub Actions workflow file is correctly formatted

### Redirect Issues

If you're experiencing routing issues:

1. Verify that the `netlify.toml` file includes the proper redirect rule:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/) 