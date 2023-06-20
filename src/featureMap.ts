import { createTheme } from "@mui/material";

export const featureMap = (theme = createTheme()) => ({
  iap: {
    label: "IAP patch works!",
    color: theme.palette.success.main,
  },
    ads: {
    label: "Remove ads patch works",
    color: theme.palette.success.main,
  },
  "partial-iap": {
    label: "IAP partially compatible",
    color: theme.palette.warning.main,
  },
  "unclear-iap": {
    label: "IAP need verification - Try it out and post in Discord!",
    color: theme.palette.warning.main,
  },
  "no-iap": {
    label: "IAP incompatible",
    color: theme.palette.error.main,
  },
  subscription: {
    label: "Subscription redeemable!",
    color: theme.palette.success.main,
  },
  "no-subscription": {
    label: "Subscription cannot be redeemed",
    color: theme.palette.warning.main,
  },
  repurchase: {
    label: "Some IAPs need to be redeemed after every restart",
    color: theme.palette.warning.main,
  },
  "account-login": {
    label: "Account login works!",
    color: theme.palette.info.main,
  },
  "facebook-login": {
    label: "Facebook login works!",
    color: theme.palette.info.main,
  },
  "facebook-login-broken": {
    label: "Facebook login broken",
    color: theme.palette.warning.main,
  },
  "facebook-login-no-app-installed": {
    label: "Facebook app must not be installed to login",
    color: theme.palette.warning.main,
  },
  transfer: {
    label: "App data can be transferred to another account",
    color: theme.palette.info.main,
  },
  "transfer-steam": {
    label: "App data can be transferred to Steam",
    color: theme.palette.info.main,
  },
  "transfer-ios": {
    label: "App data can be transferred to iOS",
    color: theme.palette.info.main,
  },
  multiplayer: {
    label: "Full Multiplayer; IAP compatible",
    color: theme.palette.primary.main,
  },
  "partial-multiplayer": {
    label: "App has some multiplayer features; IAP compatible",
    color: theme.palette.primary.main,
  },
  "no-multiplayer": {
    label: "Singleplayer only",
    color: theme.palette.warning.main,
  },
  "no-multiplayer-iap": {
    label: "Multiplayer IAP broken",
    color: theme.palette.warning.main,
  },
  "slightly-broken": {
    label: "Slightly broken, but playable",
    color: theme.palette.warning.main,
  },
  "too-many-iap-break": {
    label: "Buying too many IAP will break the app!",
    color: theme.palette.warning.main,
  },
  "disable-data-on-lp-popup": {
    label:
      "Disable data connection when the LP purchase popup shows to get IAP",
    color: theme.palette.info.main,
  },
  "restore-purchase": {
    label: "IAP can be redeemed by restoring purchase and restarting the app",
    color: theme.palette.info.main,
  },
  "iap-before-load": {
    label: "Purchase IAP before the app is fully loaded. Play anonymously.",
    color: theme.palette.info.main,
  },
  "subscription-restore-purchase": {
    label: "Subscription can be redeemed by restoring purchase",
    color: theme.palette.info.main,
  },
  "dont-bother": {
    label: "Don't bother. This game is either grindy or uninteresting.",
    color: theme.palette.warning.main,
  },
  "region-locked": {
    label: "If region locked, use Google Account from another region",
    color: theme.palette.warning.main,
  },
  "patch-before-first-launch": {
    label: "Patch this game before launching it for the first time!",
    color: theme.palette.warning.main,
  },
  "special-patch-full-offline": {
    label: "Select patch option: Make fully offline",
    color: theme.palette.info.main,
  },
  "special-patch-signature": {
    label: "Select patch option: Signature verification killer",
    color: theme.palette.info.main,
  },
  "special-patch-lvl": {
    label: "Select patch option: Support patch for LVL and Inapp emulation",
    color: theme.palette.info.main,
  },
  "may-require-root": {
    label: "This app may require a root-level patch to work.",
    color: theme.palette.info.main,
  },
  "root-iap": {
    label: "IAP patch works with rooted device",
    color: theme.palette.info.main,
  },
  "root-patch": {
    label: "Root patch available",
    color: theme.palette.info.main,
  },
  "root-patch-iap": {
    label: "App requires root to make IAP patch work!",
    color: theme.palette.info.main,
  },
  "no-root-patch-iap": {
    label: "Root patch doesn't make IAP available",
    color: theme.palette.info.main,
  },
  "apk-platinmods": {
    label: "Patched APK download available on Mobilism",
    color: theme.palette.info.main,
  },
  "apk-mobilism": {
    label: "Patched APK download available on Mobilism",
    color: theme.palette.info.main,
  },
  "apk-apkpure": {
    label: "Download APK from APKPure, then patch",
    color: theme.palette.info.main,
  },
});

const getFeature = (featureString: string, theme = createTheme()) => {
  const feature = featureMap(theme)[featureString.toLowerCase()] || {};
  if (featureString.indexOf("::") > -1) {
    const parts = featureString.split("::");
    feature.color = theme.palette[parts[0]]?.main || theme.palette.info.main;
    feature.label = parts[1];
  }
  return feature;
};

export default getFeature;
