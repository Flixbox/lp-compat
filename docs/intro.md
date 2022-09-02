---
sidebar_position: 1
---

# Patching an app

## Set up Lucky Patcher

Follow the tutorial on the official website. Make sure to give LP the "Draw over other apps" permission in the app's settings.

Read the [important info about LP](/docs/lp-info.md) section.

## Create the modified APK file

Follow these screenshots to create your modified APK file. Read any pop-ups you may come across and try to follow their advice, but don't worry too much about them.

First, open Lucky Patcher and tap the app you'd like to modify.

On this screen, tap the "APK with multi patch" option. We'd like to apply two patch categories: The ad-free and the IAP patches.

![](/img/create_modified_apk.jpg)

![](/img/rebuild_categories_selection.jpg)

Apply some patches.

![](/img/ad_patches.jpg)

![](/img/iap_patches.jpg)

## Reinstall the app

If you reinstall (uninstall the original app and install the patched one) you will no longer be able to use Google features like Google Play sign-in in that app anymore. However, some patchable apps like Merge Dragons and City Island 5 feature Facebook sign-in, which will usually work.

Since Android will usually prevent us from installing the patched APK as an update, we'll have to reinstall the app.

## Cleanup

You'll also be able to find the patched APK files in LP under the "Rebuild & Install" option in the menu. If you'd like to clean up some storage, remove these APK files manually.

You can also clean up all of your patched APK files at once. Go to your stock file manager (it needs elevated access, the stock file manager usually has elevated access), then go to this path:

`/Android/data/ru.<random letters>.<random letters>/files/LuckyPatcher/Modified`

You can delete everything in this `Modified` folder. It only contains your patched APKs and some metadata.