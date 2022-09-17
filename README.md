# LP Compatibility Overview

A website that displays which apps can be patched with Lucky Patcher.

Main page: https://flixbox.github.io/lp-compat/

## Initial setup

- Install Node.js
- Run `npm install --force` (One dependency is a bit broken in its dependency tree, don't worry about it)
- Run `npm run start`

## Adding a new game

- Add it to the file `static/compat-data/apps.json`
- Add any custom features with the following syntax: `<color>::<feature text>`. Example: `warning::IAP patch only works on version 4.2; download APK on APKPure`
- Make sure you don't add any `,` characters to the feature list, otherwise the Discord regex gets confused
- Run `npm run start` to check if it's being shown
