// Renomme l'app en TopUp et fixe l'identifiant Android (be.kvtech.topup).
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('app.json', 'utf8').replace(/^﻿/, ''));
j.expo.name = 'TopUp';
j.expo.slug = 'topup';
j.expo.version = '0.1.0';
j.expo.android = Object.assign({}, j.expo.android, { package: 'be.kvtech.topup', versionCode: 1 });
fs.writeFileSync('app.json', JSON.stringify(j, null, 2));
