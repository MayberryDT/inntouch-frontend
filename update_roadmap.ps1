# PowerShell script to update roadmap files in both repositories

# Backend repository
cd InnTouch-Backend
if (-not (Test-Path -Path "docs")) {
    New-Item -ItemType Directory -Path "docs"
}
git add docs/development_roadmap.md
git commit -m "Add development roadmap reflecting current progress"
git push origin master

# Frontend repository
cd ..
cd InnTouch-Frontend
if (-not (Test-Path -Path "docs")) {
    New-Item -ItemType Directory -Path "docs"
}
git add docs/development_roadmap.md
git commit -m "Add development roadmap reflecting current progress"
git push origin master

# Return to root directory
cd .. 