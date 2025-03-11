# InnTouch GitHub Project Setup Script (PowerShell)
# This script sets up project boards and issue tracking for the InnTouch repositories

# Check if GitHub CLI is installed
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "GitHub CLI is not installed. Please install it first from https://cli.github.com/" -ForegroundColor Red
    exit 1
}

# Check if authenticated with GitHub
try {
    gh auth status | Out-Null
}
catch {
    Write-Host "You are not authenticated with GitHub. Please run 'gh auth login' first." -ForegroundColor Red
    exit 1
}

Write-Host "Setting up GitHub project boards and issue tracking for InnTouch..." -ForegroundColor Green

# Create labels for frontend repository
Write-Host "Creating labels for frontend repository..." -ForegroundColor Cyan
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

# Create labels for backend repository
Write-Host "Creating labels for backend repository..." -ForegroundColor Cyan
gh label create bug --color FF0000 --repo MayberryDT/inntouch-backend
gh label create feature --color 00FF00 --repo MayberryDT/inntouch-backend
gh label create enhancement --color 0000FF --repo MayberryDT/inntouch-backend
gh label create documentation --color FFFF00 --repo MayberryDT/inntouch-backend
gh label create frontend --color 800080 --repo MayberryDT/inntouch-backend
gh label create backend --color FFA500 --repo MayberryDT/inntouch-backend
gh label create auth --color 00FFFF --repo MayberryDT/inntouch-backend
gh label create chat --color 1E90FF --repo MayberryDT/inntouch-backend
gh label create attractions --color 98FB98 --repo MayberryDT/inntouch-backend
gh label create service --color FFA500 --repo MayberryDT/inntouch-backend
gh label create high-priority --color FF0000 --repo MayberryDT/inntouch-backend
gh label create medium-priority --color FFFF00 --repo MayberryDT/inntouch-backend
gh label create low-priority --color 00FF00 --repo MayberryDT/inntouch-backend
gh label create blocked --color FF0000 --repo MayberryDT/inntouch-backend

# Create issue templates for frontend repository
Write-Host "Creating issue templates for frontend repository..." -ForegroundColor Cyan
# Clone the repository temporarily
$tempDir = [System.IO.Path]::GetTempPath() + [System.Guid]::NewGuid().ToString()
New-Item -ItemType Directory -Path $tempDir | Out-Null
Set-Location $tempDir
gh repo clone MayberryDT/inntouch-frontend
Set-Location inntouch-frontend

# Create issue template directory
New-Item -ItemType Directory -Path .github\ISSUE_TEMPLATE -Force | Out-Null

# Create bug report template
@'
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
'@ | Out-File -FilePath .github\ISSUE_TEMPLATE\bug_report.md -Encoding utf8

# Create feature request template
@'
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
'@ | Out-File -FilePath .github\ISSUE_TEMPLATE\feature_request.md -Encoding utf8

# Commit and push changes
git add .github
git commit -m "Add issue templates"
git push

# Clean up
Set-Location ..\..\
Remove-Item -Recurse -Force $tempDir

# Create issue templates for backend repository
Write-Host "Creating issue templates for backend repository..." -ForegroundColor Cyan
# Clone the repository temporarily
$tempDir = [System.IO.Path]::GetTempPath() + [System.Guid]::NewGuid().ToString()
New-Item -ItemType Directory -Path $tempDir | Out-Null
Set-Location $tempDir
gh repo clone MayberryDT/inntouch-backend
Set-Location inntouch-backend

# Create issue template directory
New-Item -ItemType Directory -Path .github\ISSUE_TEMPLATE -Force | Out-Null

# Create bug report template
@'
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
'@ | Out-File -FilePath .github\ISSUE_TEMPLATE\bug_report.md -Encoding utf8

# Create feature request template
@'
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
'@ | Out-File -FilePath .github\ISSUE_TEMPLATE\feature_request.md -Encoding utf8

# Commit and push changes
git add .github
git commit -m "Add issue templates"
git push

# Clean up
Set-Location ..\..\
Remove-Item -Recurse -Force $tempDir

# Create milestones
Write-Host "Creating milestones..." -ForegroundColor Cyan
# Calculate dates for milestones
$phase1Date = (Get-Date).AddDays(7).ToString("yyyy-MM-ddTHH:mm:ssZ")
$phase2Date = (Get-Date).AddDays(14).ToString("yyyy-MM-ddTHH:mm:ssZ")

# Create milestones for frontend repository
gh api repos/MayberryDT/inntouch-frontend/milestones -f title="Phase 1: Authentication & App Skeleton" -f state=open -f description="Week 1 tasks focused on authentication and app skeleton" -f due_on=$phase1Date

gh api repos/MayberryDT/inntouch-frontend/milestones -f title="Phase 2: Enhanced Features" -f state=open -f description="Week 2 tasks focused on chat system and local attractions" -f due_on=$phase2Date

# Create milestones for backend repository
gh api repos/MayberryDT/inntouch-backend/milestones -f title="Phase 1: Authentication & App Skeleton" -f state=open -f description="Week 1 tasks focused on authentication and app skeleton" -f due_on=$phase1Date

gh api repos/MayberryDT/inntouch-backend/milestones -f title="Phase 2: Enhanced Features" -f state=open -f description="Week 2 tasks focused on chat system and local attractions" -f due_on=$phase2Date

# Get milestone IDs
$frontendPhase1Id = (gh api repos/MayberryDT/inntouch-frontend/milestones --jq '.[0].number')
$backendPhase1Id = (gh api repos/MayberryDT/inntouch-backend/milestones --jq '.[0].number')

# Create issues
Write-Host "Creating issues..." -ForegroundColor Cyan
# Frontend repository issues
gh issue create --repo MayberryDT/inntouch-frontend --title "Initialize React.js frontend project with Material-UI" --body "Set up the initial React.js project with Material-UI integration" --label "feature,frontend,high-priority" --milestone $frontendPhase1Id

gh issue create --repo MayberryDT/inntouch-frontend --title "Configure ESLint and Prettier for code quality" --body "Set up ESLint and Prettier for consistent code formatting and quality" --label "enhancement,frontend,medium-priority" --milestone $frontendPhase1Id

gh issue create --repo MayberryDT/inntouch-frontend --title "Set up basic CI/CD pipeline for Netlify deployment" --body "Configure CI/CD pipeline for automatic deployment to Netlify" --label "enhancement,frontend,medium-priority" --milestone $frontendPhase1Id

# Backend repository issues
gh issue create --repo MayberryDT/inntouch-backend --title "Initialize Node.js/Express.js backend project" --body "Set up the initial Node.js/Express.js project structure" --label "feature,backend,high-priority" --milestone $backendPhase1Id

gh issue create --repo MayberryDT/inntouch-backend --title "Configure ESLint and Prettier for code quality" --body "Set up ESLint and Prettier for consistent code formatting and quality" --label "enhancement,backend,medium-priority" --milestone $backendPhase1Id

gh issue create --repo MayberryDT/inntouch-backend --title "Create Firebase project for authentication" --body "Set up Firebase project and configure authentication" --label "feature,backend,auth,high-priority" --milestone $backendPhase1Id

gh issue create --repo MayberryDT/inntouch-backend --title "Set up MongoDB Atlas cluster" --body "Create and configure MongoDB Atlas cluster for the application" --label "feature,backend,high-priority" --milestone $backendPhase1Id

# Documentation issues (added to frontend repository)
gh issue create --repo MayberryDT/inntouch-frontend --title "Define modular architecture guidelines and component boundaries" --body "Create documentation for modular architecture guidelines and component boundaries" --label "documentation,high-priority" --milestone $frontendPhase1Id

gh issue create --repo MayberryDT/inntouch-frontend --title "Create documentation for module interfaces and integration points" --body "Document module interfaces and integration points for frontend and backend" --label "documentation,high-priority" --milestone $frontendPhase1Id

Write-Host "Creating project boards..." -ForegroundColor Cyan
Write-Host "Note: GitHub CLI has limited support for creating and configuring project boards." -ForegroundColor Yellow
Write-Host "For the best experience, create the project boards using the GitHub web interface as described in the documentation." -ForegroundColor Yellow
Write-Host "You can create basic project boards with the following commands:" -ForegroundColor Yellow

Write-Host @"
gh api graphql -f query='
mutation {
  createProjectV2(input: {ownerId: \"MayberryDT\", title: \"InnTouch Frontend Development\"}) {
    projectV2 {
      id
      url
    }
  }
}'
"@ -ForegroundColor Gray

Write-Host @"
gh api graphql -f query='
mutation {
  createProjectV2(input: {ownerId: \"MayberryDT\", title: \"InnTouch Backend Development\"}) {
    projectV2 {
      id
      url
    }
  }
}'
"@ -ForegroundColor Gray

Write-Host "Setup completed successfully!" -ForegroundColor Green
Write-Host "Please visit the GitHub web interface to create and configure the project boards." -ForegroundColor Green
Write-Host "Frontend repository: https://github.com/MayberryDT/inntouch-frontend" -ForegroundColor Cyan
Write-Host "Backend repository: https://github.com/MayberryDT/inntouch-backend" -ForegroundColor Cyan 