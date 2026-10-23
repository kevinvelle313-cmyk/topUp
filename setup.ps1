# Crée le projet Expo TopUp et lance le build Android (APK).
# Clic droit sur ce fichier > « Exécuter avec PowerShell », ou dans PowerShell :  .\setup.ps1
$ErrorActionPreference = "Stop"
$src  = $PSScriptRoot
$dest = Join-Path $src "TopUp"

if (-not (Test-Path $dest)) {
  npx --yes create-expo-app@latest "$dest" --template blank --no-install
}
Copy-Item "$src\App.js","$src\topupHtml.js","$src\eas.json" -Destination $dest -Force
Set-Location $dest
npm install
npx expo install react-native-webview react-native-safe-area-context

$j = Get-Content app.json -Raw | ConvertFrom-Json
$j.expo.name = "TopUp"; $j.expo.slug = "topup"; $j.expo.version = "0.1.0"
$j.expo | Add-Member -Force -NotePropertyName android -NotePropertyValue ([pscustomobject]@{ package = "be.kvtech.topup"; versionCode = 1 })
$j | ConvertTo-Json -Depth 20 | Set-Content app.json -Encoding UTF8

$env:EAS_NO_VCS = "1"   # pas besoin de Git pour le build
npm install -g eas-cli
eas login          # ton e-mail et mot de passe Expo
eas init          # réponds « Y » pour créer le projet sur ton compte
eas build -p android --profile preview   # réponds « Y » pour générer la clé Android
