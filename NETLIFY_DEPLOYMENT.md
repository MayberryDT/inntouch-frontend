# Quick Guide: Deploying InnTouch Frontend to Netlify

This guide provides the essential steps to deploy the InnTouch frontend application to Netlify.

## Prerequisites

- GitHub repository with the InnTouch frontend code
- Netlify account
- Firebase project (for authentication)

## Option 1: Manual Deployment (Quickest)

1. **Create a Netlify Site**
   - Log in to [Netlify](https://app.netlify.com/)
   - Click "New site from Git"
   - Select GitHub and authorize access
   - Select the InnTouch frontend repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy site"

2. **Configure Environment Variables**
   - Go to Site settings > Build & deploy > Environment
   - Add all required environment variables (see below)

## Option 2: Automated Deployment with GitHub Actions (Recommended)

1. **Get Netlify Credentials**
   - Generate a personal access token in Netlify (User settings > Applications)
   - Copy your Netlify site ID from Site settings

2. **Add GitHub Secrets**
   - Go to your GitHub repository > Settings > Secrets and variables > Actions
   - Add the following secrets:
     - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
     - `NETLIFY_SITE_ID`: Your Netlify site ID
     - Add all Firebase environment variables (see below)

3. **Push Code to Trigger Deployment**
   - The GitHub Actions workflow will automatically deploy your site

## Required Environment Variables

Add these environment variables to either Netlify or GitHub Secrets:

- `REACT_APP_API_URL`: The URL of your backend API
- `REACT_APP_FIREBASE_API_KEY`: Your Firebase API key
- `REACT_APP_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
- `REACT_APP_FIREBASE_PROJECT_ID`: Your Firebase project ID
- `REACT_APP_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
- `REACT_APP_FIREBASE_APP_ID`: Your Firebase app ID

## Verifying Your Deployment

1. Check the deployment status in Netlify or GitHub Actions
2. Visit your Netlify site URL to verify the application is working
3. Test the application functionality

## Troubleshooting

- **Build Failures**: Check build logs for errors
- **Missing Environment Variables**: Verify all required variables are set
- **Routing Issues**: Ensure the `netlify.toml` file has the correct redirect rules

## Additional Resources

For more detailed instructions, see the [full deployment guide](./docs/netlify_deployment_guide.md). 