## SpecStory

## Integrating Cloudbeds API into Application (3/17/2025, 11:56:13 AM)

_**User**_

@API.md @ARCHITECTURE.md @INDEX.md @README.md @SETUP_TESTING.md @SETUP.md 

I am almost done with week 2 tasks from the README, but I need to add Cloudbeds connection.

What would it look like to do that?

---

_**Assistant**_

To integrate Cloudbeds into your application, you'll need to follow these steps:

1. **Obtain Cloudbeds API Credentials**: Ensure you have your API key and secret from Cloudbeds. This is necessary for authenticating your requests.

2. **Set Up Environment Variables**: Add your Cloudbeds API credentials to your environment configuration.

3. **Create a Service for Cloudbeds Integration**: Implement a service in your backend to handle API requests to Cloudbeds.

4. **Update Your Backend to Use Cloudbeds**: Modify your backend logic to fetch and update data using Cloudbeds API.

Here's a more detailed breakdown of each step:

### 1. Obtain Cloudbeds API Credentials

- Register for API access at [Cloudbeds API](https://www.cloudbeds.com/api/).
- Create an application to get your API key and secret.

### 2. Set Up Environment Variables

Add the following to your `.env` file in the backend directory:

```plaintext
# Cloudbeds API
CLOUDBEDS_API_KEY=your_cloudbeds_api_key
CLOUDBEDS_API_SECRET=your_cloudbeds_api_secret
```

### 3. Create a Service for Cloudbeds Integration

Create a new service file in your backend to handle Cloudbeds API requests. For example, `cloudbedsService.js`:

```javascript
// backend/services/cloudbedsService.js
const axios = require('axios');

const CLOUD_API_BASE_URL = 'https://api.cloudbeds.com';

async function getReservations() {
    try {
        const response = await axios.get(`${CLOUD_API_BASE_URL}/reservations`, {
            headers: {
                'Authorization': `Bearer ${process.env.CLOUDBEDS_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reservations from Cloudbeds:', error);
        throw error;
    }
}

module.exports = {
    getReservations
};
```

### 4. Update Your Backend to Use Cloudbeds

Modify your backend logic to use the Cloudbeds service. For example, in your check-in process, you might want to fetch reservation details from Cloudbeds:

```javascript
// backend/routes/checkin.js
const express = require('express');
const router = express.Router();
const cloudbedsService = require('../services/cloudbedsService');

router.post('/checkin', async (req, res) => {
    try {
        const reservations = await cloudbedsService.getReservations();
        // Process reservations and handle check-in logic
        res.status(200).json({ success: true, reservations });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error during check-in', error });
    }
});

module.exports = router;
```

### 5. Test Your Integration

Ensure that your integration works by testing the endpoints that interact with Cloudbeds. You can use tools like Postman to simulate API requests and verify responses.

### 6. Update Documentation

Make sure to update your documentation to reflect the new integration, including any new environment variables or setup steps.

By following these steps, you should be able to integrate Cloudbeds into your application, allowing you to fetch and manage reservation data directly from their API.

---

_**User**_

Here is how to use their API: @https://hotels.cloudbeds.com/api/v1.2/docs/#tag/Authentication/paths/~1userinfo/get 

Please tell me how to implement it step by step

---

_**Assistant**_

To implement the Cloudbeds API in your application, you need to follow these steps to authenticate and interact with their services. Here's a step-by-step guide:

### Step 1: Obtain API Credentials

Ensure you have your Cloudbeds API key and secret. These are necessary for authenticating your requests.

### Step 2: Set Up Environment Variables

Add your Cloudbeds API credentials to your environment configuration. Update your `.env` file in the backend directory:

```plaintext
# Cloudbeds API
CLOUDBEDS_API_KEY=your_cloudbeds_api_key
CLOUDBEDS_API_SECRET=your_cloudbeds_api_secret
```

### Step 3: Implement Authentication

Cloudbeds uses OAuth 2.0 for authentication. You need to implement the OAuth flow to obtain an access token. Here's a basic example using Node.js and Axios:

```javascript
// backend/services/cloudbedsAuthService.js
const axios = require('axios');
const qs = require('qs');

async function getAccessToken() {
    const tokenUrl = 'https://hotels.cloudbeds.com/api/v1.2/oauth/token';
    const data = {
        grant_type: 'client_credentials',
        client_id: process.env.CLOUDBEDS_API_KEY,
        client_secret: process.env.CLOUDBEDS_API_SECRET
    };

    try {
        const response = await axios.post(tokenUrl, qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error obtaining access token:', error);
        throw error;
    }
}

module.exports = {
    getAccessToken
};
```

### Step 4: Use the Access Token to Make API Requests

Once you have the access token, you can use it to make authenticated requests to the Cloudbeds API. For example, to get user information:

```javascript
// backend/services/cloudbedsService.js
const axios = require('axios');
const cloudbedsAuthService = require('./cloudbedsAuthService');

async function getUserInfo() {
    const accessToken = await cloudbedsAuthService.getAccessToken();
    const userInfoUrl = 'https://hotels.cloudbeds.com/api/v1.2/userinfo';

    try {
        const response = await axios.get(userInfoUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
}

module.exports = {
    getUserInfo
};
```

### Step 5: Integrate with Your Application

Use the `getUserInfo` function in your application logic where you need to fetch user information from Cloudbeds. For example, in an Express route:

```javascript
// backend/routes/user.js
const express = require('express');
const router =

---



---

