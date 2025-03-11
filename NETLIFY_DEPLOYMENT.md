# Deploying InnTouch Frontend to Netlify

This guide provides step-by-step instructions for deploying the InnTouch frontend to Netlify and connecting it to the Heroku backend.

## Prerequisites

Before you begin, make sure you have:

1. A Netlify account
2. Git installed on your machine
3. Your backend deployed to Heroku (see `HEROKU_DEPLOYMENT.md` in the backend repository)

## Deployment Steps

### 1. Prepare Your Environment Variables

Create a `.env` file based on the `.env.example` template:

```bash
cp .env.example .env
```

Update the API URL to point to your Heroku backend:

```
REACT_APP_API_URL=https://inntouch-backend.herokuapp.com/api
```

Add your Firebase configuration values if you're using Firebase for authentication.

### 2. Deploy to Netlify

#### Option 1: Deploy via Netlify CLI

1. Install the Netlify CLI:

```bash
npm install -g netlify-cli
```

2. Login to Netlify:

```bash
netlify login
```

3. Initialize your site:

```bash
netlify init
```

4. Deploy your site:

```bash
netlify deploy --prod
```

#### Option 2: Deploy via Netlify UI

1. Build your project locally:

```bash
npm run build
```

2. Go to [Netlify](https://app.netlify.com/)
3. Drag and drop your `build` folder to the Netlify UI

#### Option 3: Connect to Git Repository (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Click "Deploy site"

### 3. Configure Environment Variables in Netlify

1. Go to your site dashboard in Netlify
2. Navigate to Site settings > Build & deploy > Environment
3. Add the following environment variables:

```
REACT_APP_API_URL=https://inntouch-backend.herokuapp.com/api
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Trigger a new deploy to apply the environment variables:
   - Go to the "Deploys" tab
   - Click "Trigger deploy" > "Deploy site"

## Verifying Deployment

1. Visit your Netlify site URL (e.g., `https://inntouch-app.netlify.app`)
2. Test the authentication flow
3. Verify that the frontend can communicate with the backend

## Troubleshooting

### CORS Issues

If you encounter CORS errors:

1. Verify that your Heroku backend has the correct CORS configuration
2. Check that the `FRONTEND_URL` environment variable in your Heroku app is set to your Netlify domain
3. Ensure your API requests include the correct headers

### API Connection Issues

If your frontend can't connect to the backend:

1. Check the browser console for errors
2. Verify that `REACT_APP_API_URL` is set correctly
3. Ensure your Heroku app is running (`heroku ps:scale web=1`)

### Authentication Issues

If authentication is not working:

1. Check that your Firebase configuration is correct
2. Verify that the JWT token is being stored correctly in localStorage
3. Ensure the token is being sent with API requests

## Custom Domain Setup

To use a custom domain:

1. Go to your site dashboard in Netlify
2. Navigate to Site settings > Domain management
3. Click "Add custom domain"
4. Follow the instructions to configure your domain

## Continuous Deployment

Netlify automatically deploys when you push to your connected Git repository. To configure build settings:

1. Go to your site dashboard in Netlify
2. Navigate to Site settings > Build & deploy > Continuous deployment
3. Configure build settings as needed

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/#netlify)
- [Environment Variables in Netlify](https://docs.netlify.com/configure-builds/environment-variables/) 