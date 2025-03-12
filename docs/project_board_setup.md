# InnTouch Project Board Setup

This document provides instructions for setting up project boards and issue tracking for the InnTouch frontend and backend repositories.

## GitHub Access and Authentication

### Prerequisites

Before setting up project boards and issue tracking, ensure you have:

1. **GitHub Account**: You need a GitHub account with appropriate permissions (admin or owner) for the repositories.

2. **Repository Access**: You need access to both repositories:
   - Frontend: https://github.com/MayberryDT/inntouch-frontend
   - Backend: https://github.com/MayberryDT/inntouch-backend

3. **GitHub CLI (Optional)**: For command-line setup, install GitHub CLI:
   - Windows: `winget install --id GitHub.cli` or download from https://cli.github.com/
   - macOS: `brew install gh`
   - Linux: See https://github.com/cli/cli/blob/trunk/docs/install_linux.md

### Authentication

To authenticate with GitHub:

1. **Web Interface**: Log in to GitHub at https://github.com with your credentials.

2. **GitHub CLI**: Run the following command and follow the prompts:
   ```bash
   gh auth login
   ```

3. **Personal Access Token (PAT)**: For programmatic access, create a PAT:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with appropriate scopes (repo, admin:org, project)
   - Store the token securely as it won't be shown again

## Overview

We will use GitHub Projects to manage tasks and track progress for both repositories. GitHub Projects provides a flexible Kanban-style board that integrates directly with GitHub Issues.

## Setup Instructions

### 1. Create Project Board for Frontend Repository

1. Navigate to https://github.com/MayberryDT/inntouch-frontend
2. Click on the "Projects" tab
3. Click "New project"
4. Select "Board" as the template
5. Name the project "InnTouch Frontend Development"
6. Set the visibility to "Private" (since the repository is private)
7. Click "Create"

### 2. Configure Frontend Project Board

1. The default columns (To do, In progress, Done) will be created automatically
2. Add two additional columns:
   - Click "+ Add column" at the right side of the board
   - Add "Review" column (place between "In progress" and "Done")
   - Add "Blocked" column (place after "In progress")
3. Configure automation:
   - For "To do" column: Newly added items and reopened items will move here
   - For "In progress" column: Items with assigned pull requests will move here
   - For "Review" column: Pull requests ready for review will move here
   - For "Done" column: Closed items will move here

### 3. Create Project Board for Backend Repository

1. Navigate to https://github.com/MayberryDT/inntouch-backend
2. Click on the "Projects" tab
3. Click "New project"
4. Select "Board" as the template
5. Name the project "InnTouch Backend Development"
6. Set the visibility to "Private" (since the repository is private)
7. Click "Create"

### 4. Configure Backend Project Board

1. Configure the backend project board with the same columns and automation as the frontend board

### 5. Create Issue Labels

Create the following labels in both repositories:

1. Navigate to each repository's "Issues" tab
2. Click "Labels"
3. Click "New label"
4. Create the following labels:
   - `bug` (red): Issues related to bugs
   - `feature` (green): New feature implementation
   - `enhancement` (blue): Improvements to existing features
   - `documentation` (yellow): Documentation-related tasks
   - `frontend` (purple): Frontend-specific issues
   - `backend` (orange): Backend-specific issues
   - `auth` (cyan): Authentication-related issues
   - `chat` (blue): Chat system-related issues
   - `attractions` (green): Local attractions-related issues
   - `service` (orange): Room service and amenities-related issues
   - `high-priority` (red): High-priority tasks
   - `medium-priority` (yellow): Medium-priority tasks
   - `low-priority` (green): Low-priority tasks
   - `blocked` (red): Tasks that are blocked

### 6. Create Issue Templates

Create issue templates for both repositories:

1. In each repository, create a `.github/ISSUE_TEMPLATE` directory
2. Create the following templates:

#### Bug Report Template (`bug_report.md`):
```markdown
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - Device: [e.g. iPhone6, Desktop]
 - OS: [e.g. iOS, Windows]
 - Browser: [e.g. chrome, safari]
 - Version: [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

#### Feature Request Template (`feature_request.md`):
```markdown
---
name: Feature request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: feature
assignees: ''
---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

### 7. Create Initial Issues Based on Roadmap

Create issues for the tasks in the development roadmap:

1. For each task in the Day 1 section of the roadmap, create an issue in the appropriate repository
2. Assign appropriate labels to each issue
3. Add the issues to the project board in the "To do" column

#### Frontend Repository Issues:
- Initialize React.js frontend project with Material-UI
- Configure ESLint and Prettier for code quality
- Set up basic CI/CD pipeline for Netlify deployment

#### Backend Repository Issues:
- Initialize Node.js/Express.js backend project
- Configure ESLint and Prettier for code quality
- Create Firebase project for authentication
- Set up MongoDB Atlas cluster

#### Documentation Repository Issues (can be added to either repository):
- Define modular architecture guidelines and component boundaries
- Create documentation for module interfaces and integration points

### 8. Set Up Milestones

Create milestones to track progress for each phase of the project:

1. In each repository, go to the "Issues" tab
2. Click "Milestones"
3. Click "New milestone"
4. Create the following milestones:
   - "Phase 1: Authentication & App Skeleton" (Due date: 1 week from start)
   - "Phase 2: Enhanced Features" (Due date: 2 weeks from start)

### 9. Link Issues to Milestones

1. For each issue created, edit the issue
2. Assign it to the appropriate milestone

## Project Board Usage Guidelines

### Adding New Tasks

1. Create a new issue in the appropriate repository
2. Add relevant labels
3. Assign to a milestone
4. The issue will automatically appear in the "To do" column of the project board

### Tracking Progress

1. When starting work on an issue, move it to "In progress"
2. If an issue becomes blocked, move it to "Blocked" and comment with the reason
3. When creating a pull request for an issue, link the PR to the issue
4. When the PR is ready for review, move the issue to "Review"
5. When the issue is completed and the PR is merged, close the issue (it will automatically move to "Done")

### Daily Updates

1. At the beginning of each day, review the project board
2. Update issue status as needed
3. Identify any blocked issues and work to resolve them

## Conclusion

This setup provides a structured approach to tracking tasks and progress for the InnTouch project. The project boards and issue tracking will help ensure that all tasks in the development roadmap are completed efficiently and on schedule. 

## Command-Line Setup (GitHub CLI)

For those who prefer using the command line, here are the GitHub CLI commands to set up the project boards and issue tracking. Make sure you have GitHub CLI installed and authenticated before running these commands.

### 1. Create Labels

```bash
# Frontend repository labels
gh label create bug --color FF0000 --repo MayberryDT/inntouch-frontend
gh label create feature --color 00FF00 --repo MayberryDT/inntouch-frontend
gh label create enhancement --color 0000FF --repo MayberryDT/inntouch-frontend
gh label create documentation --color FFFF00 --repo MayberryDT/inntouch-frontend
gh label create frontend --color 800080 --repo MayberryDT/inntouch-frontend
gh label create backend --color FFA500 --repo MayberryDT/inntouch-frontend
gh label create auth --color 00FFFF --repo MayberryDT/inntouch-frontend
gh label create chat --color 1E90FF --repo MayberryDT/inntouch-frontend
gh label create attractions --color 98FB98 --repo MayberryDT/inntouch-frontend
gh label create service --color FFA500 --repo MayberryDT/inntouch-frontend
gh label create high-priority --color FF0000 --repo MayberryDT/inntouch-frontend
gh label create medium-priority --color FFFF00 --repo MayberryDT/inntouch-frontend
gh label create low-priority --color 00FF00 --repo MayberryDT/inntouch-frontend
gh label create blocked --color FF0000 --repo MayberryDT/inntouch-frontend

# Backend repository labels
gh label create bug --color FF0000 --repo MayberryDT/inntouch-backend
gh label create feature --color 00FF00 --repo MayberryDT/inntouch-backend
gh label create enhancement --color 0000FF --repo MayberryDT/inntouch-backend
gh label create documentation --color FFFF00 --repo MayberryDT/inntouch-backend
gh label create frontend --color 800080 --repo MayberryDT/inntouch-backend
gh label create backend --color FFA500 --repo MayberryDT/inntouch-backend
gh label create auth --color 00FFFF --repo MayberryDT/inntouch-backend
gh label create digital-key --color FFC0CB --repo MayberryDT/inntouch-backend
gh label create high-priority --color FF0000 --repo MayberryDT/inntouch-backend
gh label create medium-priority --color FFFF00 --repo MayberryDT/inntouch-backend
gh label create low-priority --color 00FF00 --repo MayberryDT/inntouch-backend
gh label create blocked --color FF0000 --repo MayberryDT/inntouch-backend
```

### 2. Create Issue Templates

First, create the directories:

```bash
# Frontend repository
mkdir -p .github/ISSUE_TEMPLATE
cd .github/ISSUE_TEMPLATE

# Create bug report template
cat > bug_report.md << 'EOL'
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - Device: [e.g. iPhone6, Desktop]
 - OS: [e.g. iOS, Windows]
 - Browser: [e.g. chrome, safari]
 - Version: [e.g. 22]

**Additional context**
Add any other context about the problem here.
EOL

# Create feature request template
cat > feature_request.md << 'EOL'
---
name: Feature request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: feature
assignees: ''
---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
EOL

# Repeat for backend repository
```

### 3. Create Milestones

```bash
# Frontend repository milestones
gh api repos/MayberryDT/inntouch-frontend/milestones -f title="Phase 1: Authentication & App Skeleton" -f state=open -f description="Week 1 tasks focused on authentication and app skeleton" -f due_on=$(date -d "+7 days" -u +"%Y-%m-%dT%H:%M:%SZ")

gh api repos/MayberryDT/inntouch-frontend/milestones -f title="Phase 2: Digital Key Feature" -f state=open -f description="Week 2 tasks focused on digital key feature" -f due_on=$(date -d "+14 days" -u +"%Y-%m-%dT%H:%M:%SZ")

# Backend repository milestones
gh api repos/MayberryDT/inntouch-backend/milestones -f title="Phase 1: Authentication & App Skeleton" -f state=open -f description="Week 1 tasks focused on authentication and app skeleton" -f due_on=$(date -d "+7 days" -u +"%Y-%m-%dT%H:%M:%SZ")

gh api repos/MayberryDT/inntouch-backend/milestones -f title="Phase 2: Digital Key Feature" -f state=open -f description="Week 2 tasks focused on digital key feature" -f due_on=$(date -d "+14 days" -u +"%Y-%m-%dT%H:%M:%SZ")
```

### 4. Create Issues

```bash
# Frontend repository issues
gh issue create --repo MayberryDT/inntouch-frontend --title "Initialize React.js frontend project with Material-UI" --body "Set up the initial React.js project with Material-UI integration" --label "feature,frontend,high-priority"

gh issue create --repo MayberryDT/inntouch-frontend --title "Configure ESLint and Prettier for code quality" --body "Set up ESLint and Prettier for consistent code formatting and quality" --label "enhancement,frontend,medium-priority"

gh issue create --repo MayberryDT/inntouch-frontend --title "Set up basic CI/CD pipeline for Netlify deployment" --body "Configure CI/CD pipeline for automatic deployment to Netlify" --label "enhancement,frontend,medium-priority"

# Backend repository issues
gh issue create --repo MayberryDT/inntouch-backend --title "Initialize Node.js/Express.js backend project" --body "Set up the initial Node.js/Express.js project structure" --label "feature,backend,high-priority"

gh issue create --repo MayberryDT/inntouch-backend --title "Configure ESLint and Prettier for code quality" --body "Set up ESLint and Prettier for consistent code formatting and quality" --label "enhancement,backend,medium-priority"

gh issue create --repo MayberryDT/inntouch-backend --title "Create Firebase project for authentication" --body "Set up Firebase project and configure authentication" --label "feature,backend,auth,high-priority"

gh issue create --repo MayberryDT/inntouch-backend --title "Set up MongoDB Atlas cluster" --body "Create and configure MongoDB Atlas cluster for the application" --label "feature,backend,high-priority"

# Documentation issues (added to frontend repository)
gh issue create --repo MayberryDT/inntouch-frontend --title "Define modular architecture guidelines and component boundaries" --body "Create documentation for modular architecture guidelines and component boundaries" --label "documentation,high-priority"

gh issue create --repo MayberryDT/inntouch-frontend --title "Create documentation for module interfaces and integration points" --body "Document module interfaces and integration points for frontend and backend" --label "documentation,high-priority"
```

### 5. Create Project Boards

GitHub CLI has limited support for creating and configuring project boards. For the best experience, create the project boards using the GitHub web interface as described in the main setup instructions.

However, you can create a basic project board with:

```bash
# Create organization-level project (requires organization permissions)
gh api graphql -f query='
mutation {
  createProjectV2(input: {ownerId: "MayberryDT", title: "InnTouch Frontend Development"}) {
    projectV2 {
      id
      url
    }
  }
}'

gh api graphql -f query='
mutation {
  createProjectV2(input: {ownerId: "MayberryDT", title: "InnTouch Backend Development"}) {
    projectV2 {
      id
      url
    }
  }
}'
```

Note: The project board configuration (adding columns, automation) will need to be done through the GitHub web interface after creation.

### 6. Add Issues to Project Boards

After creating the project boards, you can add issues to them using the GitHub web interface or with GraphQL API calls (which require the project ID and issue ID). 

## Setup Progress

As of March 5, 2025, the following setup tasks have been completed:

### Completed Tasks

1. **Labels Created**: All necessary labels have been created for both repositories.
   - Frontend repository: feature, frontend, backend, auth, digital-key, high-priority, etc.
   - Backend repository: feature, frontend, backend, auth, digital-key, high-priority, etc.

2. **Milestones Created**: Milestones have been set up for both repositories.
   - Phase 1: Authentication & App Skeleton (Due: March 12, 2025)
   - Phase 2: Digital Key Feature (Due: March 19, 2025)

3. **Issues Created**: Initial issues have been created for both repositories.
   - Frontend repository:
     - Initialize React.js frontend project
     - Implement user authentication UI
     - Implement digital key UI components
   - Backend repository:
     - Initialize Express.js backend project
     - Implement user authentication API
     - Implement digital key API

4. **Markdown-Based Project Boards**: Instead of using GitHub Projects, we've created markdown-based project boards.
   - Frontend board: `docs/project_boards/frontend_board.md`
   - Backend board: `docs/project_boards/backend_board.md`
   - README with usage instructions: `docs/project_boards/README.md`

### Alternative Approach: Markdown-Based Project Boards

We've decided to use markdown-based project boards instead of GitHub Projects for the following reasons:

1. **Version Control**: Changes to the project boards are tracked in git history
2. **Offline Access**: Boards can be viewed and updated without internet access
3. **Simplicity**: No need for additional permissions or complex setup
4. **Portability**: Easy to move between repositories or export
5. **Integration with Documentation**: Boards live alongside other project documentation

The markdown-based project boards include the following columns:
- **To Do**: Tasks that are planned but not yet started
- **In Progress**: Tasks that are currently being worked on
- **Review**: Tasks that are completed and awaiting review
- **Blocked**: Tasks that are blocked by dependencies or other issues
- **Done**: Tasks that are completed

### Pending Tasks

1. **Issue Templates**: Issue templates need to be added to both repositories.

2. **Push Project Boards to GitHub**: The markdown-based project boards need to be pushed to GitHub.

### Next Steps

1. Add issue templates to both repositories.
2. Push the project boards to GitHub.
3. Begin implementing the tasks listed in the project boards. 