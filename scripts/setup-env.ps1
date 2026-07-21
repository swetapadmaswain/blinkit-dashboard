# Environment Setup Script for Windows

Write-Host "Setting up environment variables..." -ForegroundColor Green

# Copy root .env.example
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "Created .env file from .env.example" -ForegroundColor Yellow
    Write-Host "Please edit .env with your configuration" -ForegroundColor Yellow
} else {
    Write-Host ".env file already exists" -ForegroundColor Cyan
}

# Copy backend .env.example
if (-not (Test-Path backend\.env)) {
    Copy-Item backend\.env.example backend\.env
    Write-Host "Created backend/.env file" -ForegroundColor Yellow
} else {
    Write-Host "backend/.env file already exists" -ForegroundColor Cyan
}

# Copy frontend .env.local.example
if (-not (Test-Path frontend\.env.local)) {
    Copy-Item frontend\.env.example frontend\.env.local
    Write-Host "Created frontend/.env.local file" -ForegroundColor Yellow
} else {
    Write-Host "frontend/.env.local file already exists" -ForegroundColor Cyan
}

Write-Host "Environment setup complete!" -ForegroundColor Green
