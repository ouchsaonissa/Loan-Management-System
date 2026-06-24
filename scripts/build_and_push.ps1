param (
    [Parameter(Mandatory=$true)]
    [string]$DockerUsername
)

Write-Host "Building and pushing Docker images for user: $DockerUsername" -ForegroundColor Green

# 1. Login to Docker Hub
Write-Host "Logging into Docker Hub..." -ForegroundColor Yellow
docker login -u $DockerUsername
if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker login failed. Exiting." -ForegroundColor Red
    exit $LASTEXITCODE
}

# 2. Build and push backend
Write-Host "Building Backend Image..." -ForegroundColor Yellow
docker build -t $DockerUsername/loan-management-backend:latest ./backend
if ($LASTEXITCODE -eq 0) {
    Write-Host "Pushing Backend Image..." -ForegroundColor Yellow
    docker push $DockerUsername/loan-management-backend:latest
} else {
    Write-Host "Backend build failed." -ForegroundColor Red
    exit $LASTEXITCODE
}

# 3. Build and push frontend
Write-Host "Building Frontend Image..." -ForegroundColor Yellow
docker build -t $DockerUsername/loan-management-frontend:latest ./frontend
if ($LASTEXITCODE -eq 0) {
    Write-Host "Pushing Frontend Image..." -ForegroundColor Yellow
    docker push $DockerUsername/loan-management-frontend:latest
} else {
    Write-Host "Frontend build failed." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "All images built and pushed successfully!" -ForegroundColor Green
Write-Host "You can now update your k8s/backend.yaml and k8s/frontend.yaml to replace <YOUR_DOCKERHUB_USERNAME> with '$DockerUsername'." -ForegroundColor Cyan
Write-Host "Then run: kubectl apply -f k8s/" -ForegroundColor Cyan
