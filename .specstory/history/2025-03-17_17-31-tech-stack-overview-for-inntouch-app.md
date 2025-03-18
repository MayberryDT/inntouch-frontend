## SpecStory

## Tech Stack Overview for InnTouch App (3/17/2025, 5:31:31 PM)

_**User**_

@API.md @ARCHITECTURE.md @INDEX.md @README.md @SETUP_TESTING.md @SETUP.md 

Write me a short cursor rules file that describes this apps tech stack based on these documents

---

_**Assistant**_

Based on the provided documentation, here is a concise cursor rules file that describes the tech stack for the InnTouch application:

```markdown:cursor_rules/tech-stack.mdc
# InnTouch Tech Stack

## Frontend
- **Framework**: React (Progressive Web App)
- **State Management**: React Context API or Redux
- **API Communication**: Axios
- **PWA Features**: Service workers for offline capabilities
- **Responsive Design**: CSS Grid/Flexbox

## Backend
- **Framework**: Node.js with Express
- **Authentication**: JWT-based with secure HTTP-only cookies
- **Database Access**: Mongoose ODM for MongoDB

## Data Storage
- **Primary Database**: MongoDB Atlas (Cloud-hosted)

## External Integrations
- **Payment Processing**: Stripe API
- **Property Management**: Cloudbeds API
- **Communication**: Twilio API for SMS

## Deployment
- **Backend**: Heroku with auto-scaling
- **Frontend**: Netlify with CDN
- **Database**: MongoDB Atlas production cluster

## Security
- **Communication**: HTTPS
- **Authentication**: JWT with short expiration
- **Data Encryption**: At rest in MongoDB Atlas
- **Monitoring**: Sentry for error tracking, New Relic for performance
```

This file summarizes the key components and technologies used in the InnTouch application, providing a quick reference for developers and stakeholders.

---



---

