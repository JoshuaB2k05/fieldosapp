@echo off
echo ==============================================
echo   Pushing updates to GitHub and Netlify...
echo ==============================================

git add .
git commit -m "Auto-Deployment Update"
git push origin main

echo.
echo ==============================================
echo   Done! Your live sites are updating now.
echo ==============================================
pause
