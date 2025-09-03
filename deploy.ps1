param(
    [Parameter(Mandatory=$true)][string]$User,
    [Parameter(Mandatory=$true)][string]$Repo,
    [string]$MainBranch = "main",
    [switch]$Force
)

Write-Host "--- Deploy Sanchez Bricks a GitHub Pages ---" -ForegroundColor Cyan

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git no está instalado o no está en PATH."; exit 1
}

$repoUrl = "https://github.com/$User/$Repo.git"

if (-not (Test-Path -Path (Join-Path (Get-Location) 'index.html'))) {
    Write-Error "Ejecuta este script dentro de la carpeta que contiene index.html"; exit 1
}

$gitFolder = Join-Path (Get-Location) '.git'
if (Test-Path $gitFolder) {
    if ($Force) {
        Write-Host "Eliminando repo git existente (--Force)." -ForegroundColor Yellow
        Remove-Item -Recurse -Force $gitFolder
    } else {
        Write-Host ".git ya existe. Continuando." -ForegroundColor Yellow
    }
}

if (-not (Test-Path $gitFolder)) {
    git init | Out-Null
}

# Config opcional (puedes ajustar)
git config user.name "$User" | Out-Null
# Si quieres un email diferente, cámbialo aquí:
git config user.email "$User@users.noreply.github.com" | Out-Null

git add .
$commitMsg = "Deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
try {
    git commit -m $commitMsg | Out-Null
} catch {
    Write-Host "Nada que commitear (quizá sin cambios)." -ForegroundColor DarkGray
}

git branch -M $MainBranch

# Verificar remoto
$existingRemote = git remote 2>$null | Select-String origin
if (-not $existingRemote) {
    git remote add origin $repoUrl
} else {
    git remote set-url origin $repoUrl
}

Write-Host "Push a $repoUrl..." -ForegroundColor Cyan
git push -u origin $MainBranch

Write-Host "Listo. Ahora ve a Settings > Pages en GitHub y selecciona: Deploy from a branch -> $MainBranch / root." -ForegroundColor Green
Write-Host "URL esperada (cuando termine el build): https://$User.github.io/$Repo/" -ForegroundColor Green
