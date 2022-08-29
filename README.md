# LP Compatibility Overview

Main page: https://flixbox.github.io/lp-compat/

## Initial setup

- Install Node.js
- Run `npm install --force` (One dependency is a bit broken in its dependency tree, don't worry about it)
- Run `npm run start`

## Adding a new game

1. Add it to the file `static/compat-data/apps.json`
2. Run `npm run scrape` to download play store data
3. Run `npm run start` to check if it's being shown
