# LP Compatibility Overview

[
![](https://img.shields.io/codeclimate/maintainability/Flixbox/lp-compat?style=flat&logo=code%20climate)
![](https://img.shields.io/codeclimate/issues/Flixbox/lp-compat?style=flat&logo=code%20climate)
![](https://img.shields.io/codeclimate/tech-debt/Flixbox/lp-compat?style=flat&logo=code%20climate)
](https://codeclimate.com/github/Flixbox/lp-compat)

[![](https://img.shields.io/static/v1?label=Discuss&message=on%20Reddit&color=FF4500&style=flat&logo=reddit)](https://www.reddit.com/r/luckypatcher/)
[![](https://img.shields.io/static/v1?label=Discuss&message=on%20Discord&color=7289DA&style=flat&logo=discord)](https://discord.gg/RS5ddYf7mw)

A website that displays which apps can be patched with Lucky Patcher.

Main page: https://flixbox.github.io/lp-compat/

[![](https://github.com/Flixbox/lp-compat/actions/workflows/deploy.yml/badge.svg)](https://github.com/Flixbox/lp-compat/actions/workflows/deploy.yml)
[![](https://img.shields.io/uptimerobot/ratio/m792717344-6d627ad71592aa371175f9d6?style=flat&logo=github)](https://stats.uptimerobot.com/kPYMYIk88k)

There's a Discord bot as well. It can be used to add apps to the list without having to go into the code itself.

![](https://img.shields.io/static/v1?label=Discord%20bot%20on&message=Railway&color=blueviolet&style=flat&logo=railway)

## Initial setup

- Install Node.js and yarn
- Run `yarn`
- Run `npm run start`

## Adding a new game

- Add it to the file `static/compat-data/apps.json`
- If it's completely new (i. e. Play Store data hasn't been scraped yet) the page will crash. The CI will scrape for you if you check in, but you can also run `npm run scrape` to check if everything works out.
- Add any custom features with the following syntax: `<color>::<feature text>`. Example: `warning::IAP patch only works on version 4.2; download APK on APKPure`
- Make sure you don't add any `,` characters to the feature list, otherwise the Discord regex gets confused
- Run `npm run start` to check if it's being shown

Or just use the Discord bot.
