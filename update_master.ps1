# PowerShell script to update the master branch
Write-Host "Checking git status..."
git status

Write-Host "`nChecking current branch..."
git branch

Write-Host "`nMaking sure we're on master branch..."
git checkout master

Write-Host "`nPulling latest changes from remote..."
git pull origin master

Write-Host "`nAdding src/index.js file..."
git add src/index.js

Write-Host "`nCommitting changes..."
git commit -m "Add missing index.js file for React entry point"

Write-Host "`nPushing changes to remote master branch..."
git push origin master

Write-Host "`nVerifying the push..."
git log --oneline -n 3

Write-Host "`nDone! Please check Netlify for a new deployment." 