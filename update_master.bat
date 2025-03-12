@echo off
echo Checking git status...
git status

echo.
echo Checking current branch...
git branch

echo.
echo Making sure we're on master branch...
git checkout master

echo.
echo Creating a new branch for our changes...
git checkout -b fix-missing-index-js-file

echo.
echo Adding src/index.js file...
git add src/index.js

echo.
echo Committing changes...
git commit -m "Add missing index.js file for React entry point"

echo.
echo Pushing new branch to remote...
git push -u origin fix-missing-index-js-file

echo.
echo Done! Please go to GitHub and create a pull request to merge fix-missing-index-js-file into master.
echo Then check Netlify for a new deployment after the PR is merged. 