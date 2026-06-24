Write-Host "Starting Minikube Deployment Process..." -ForegroundColor Cyan

# 1. Start Minikube if it's not running
Write-Host "Checking Minikube status..." -ForegroundColor Yellow
$minikubeStatus = minikube status --format "{{.Host}}"
if ($minikubeStatus -ne "Running") {
    Write-Host "Starting Minikube..." -ForegroundColor Yellow
    minikube start
} else {
    Write-Host "Minikube is already running." -ForegroundColor Green
}

# 1.5 Create Required Secrets
Write-Host "Creating Kubernetes secrets..." -ForegroundColor Yellow
# Create MySQL Secret
kubectl create secret generic mysql-secret --from-literal=mysql-root-password=root --dry-run=client -o yaml | kubectl apply -f -
# Create JWT Secret (Generate a random 32 character string for local dev)
$jwtSecret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
kubectl create secret generic backend-secret --from-literal=jwt-secret=$jwtSecret --dry-run=client -o yaml | kubectl apply -f -

# 2. Apply Kubernetes Manifests
Write-Host "Applying Kubernetes manifests..." -ForegroundColor Yellow
kubectl apply -f k8s/
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to apply Kubernetes manifests. Exiting." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Waiting for deployments to be ready (this may take a few minutes)..." -ForegroundColor Yellow
kubectl wait --for=condition=available --timeout=300s deployment/mysql
kubectl wait --for=condition=available --timeout=300s deployment/backend
kubectl wait --for=condition=available --timeout=300s deployment/frontend

# 3. Start Minikube tunnel for the LoadBalancer
Write-Host "Starting Minikube Tunnel to expose the Frontend LoadBalancer..." -ForegroundColor Yellow
Write-Host "Note: This will open a new PowerShell window and may prompt for Administrator privileges." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit -Command minikube tunnel" -Verb RunAs

# 4. Get the service URL
Start-Sleep -Seconds 5
$frontendUrl = minikube service frontend --url
Write-Host "`nDeployment Successful!" -ForegroundColor Green
Write-Host "You can access the Loan Management System Frontend at: $frontendUrl" -ForegroundColor Green
Write-Host "Backend API is accessible via NodePort (usually http://$((minikube ip)):30080)" -ForegroundColor Cyan
