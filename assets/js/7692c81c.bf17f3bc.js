"use strict";(self.webpackChunklp_compat=self.webpackChunklp_compat||[]).push([[610],{3905:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>b});var o=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,o,r=function(e,t){if(null==e)return{};var a,o,r={},n=Object.keys(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=o.createContext({}),c=function(e){var t=o.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},s=function(e){var t=c(e.components);return o.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var a=e.components,r=e.mdxType,n=e.originalType,p=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),m=c(a),b=r,d=m["".concat(p,".").concat(b)]||m[b]||u[b]||n;return a?o.createElement(d,l(l({ref:t},s),{},{components:a})):o.createElement(d,l({ref:t},s))}));function b(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var n=a.length,l=new Array(n);l[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var c=2;c<n;c++)l[c]=a[c];return o.createElement.apply(null,l)}return o.createElement.apply(null,a)}m.displayName="MDXCreateElement"},7172:(e,t,a)=>{a.d(t,{F:()=>r,Z:()=>n});var o=a(9762);const r=function(e){return void 0===e&&(e=(0,o.Z)()),{iap:{label:"IAP patch works!",color:e.palette.success.main},ads:{label:"Remove ads patch works",color:e.palette.success.main},"partial-iap":{label:"IAP partially compatible",color:e.palette.warning.main},"unclear-iap":{label:"IAP need verification - Try it out and post in Discord!",color:e.palette.warning.main},"no-iap":{label:"IAP incompatible",color:e.palette.error.main},"custom-patch":{label:"Custom patch required",color:e.palette.success.main},subscription:{label:"Subscription redeemable!",color:e.palette.success.main},"no-subscription":{label:"Subscription cannot be redeemed",color:e.palette.warning.main},repurchase:{label:"Some IAPs need to be redeemed after every restart",color:e.palette.warning.main},"account-login":{label:"Account login works!",color:e.palette.info.main},"facebook-login":{label:"Facebook login works!",color:e.palette.info.main},"facebook-login-broken":{label:"Facebook login broken",color:e.palette.warning.main},"facebook-login-no-app-installed":{label:"Facebook app must not be installed to login",color:e.palette.warning.main},transfer:{label:"App data can be transferred to another account",color:e.palette.info.main},"transfer-steam":{label:"App data can be transferred to Steam",color:e.palette.info.main},"transfer-ios":{label:"App data can be transferred to iOS",color:e.palette.info.main},multiplayer:{label:"Full Multiplayer; IAP compatible",color:e.palette.primary.main},"partial-multiplayer":{label:"App has some multiplayer features; IAP compatible",color:e.palette.primary.main},"no-multiplayer":{label:"Singleplayer only",color:e.palette.warning.main},"no-multiplayer-iap":{label:"Multiplayer IAP broken",color:e.palette.warning.main},"slightly-broken":{label:"Slightly broken, but playable",color:e.palette.warning.main},"too-many-iap-break":{label:"Buying too many IAP will break the app!",color:e.palette.warning.main},"disable-data-on-lp-popup":{label:"Disable data connection when the LP purchase popup shows to get IAP",color:e.palette.info.main},"restore-purchase":{label:"IAP can be redeemed by restoring purchase and restarting the app",color:e.palette.info.main},"iap-before-load":{label:"Purchase IAP before the app is fully loaded. Play anonymously.",color:e.palette.info.main},"subscription-restore-purchase":{label:"Subscription can be redeemed by restoring purchase",color:e.palette.info.main},"dont-bother":{label:"Don't bother. This game is either grindy or uninteresting.",color:e.palette.warning.main},"region-locked":{label:"If region locked, use Google Account from another region",color:e.palette.warning.main},"patch-before-first-launch":{label:"Patch this game before launching it for the first time!",color:e.palette.warning.main},"special-patch-full-offline":{label:"Select patch option: Make fully offline",color:e.palette.info.main},"special-patch-signature":{label:"Select patch option: Signature verification killer",color:e.palette.info.main},"special-patch-lvl":{label:"Select patch option: Support patch for LVL and Inapp emulation",color:e.palette.info.main},"may-require-root":{label:"This app may require a root-level patch to work.",color:e.palette.info.main},"root-iap":{label:"IAP patch works with rooted device",color:e.palette.info.main},"root-patch":{label:"Root patch available",color:e.palette.info.main},"root-patch-iap":{label:"App requires root to make IAP patch work!",color:e.palette.info.main},"no-root-patch-iap":{label:"Root patch doesn't make IAP available",color:e.palette.info.main},"apk-platinmods":{label:"Patched APK download available on Platinmods",color:e.palette.info.main},"apk-mobilism":{label:"Patched APK download available on Mobilism",color:e.palette.info.main},"apk-iosgods":{label:"Patched APK download available on iOSGods",color:e.palette.info.main},"apk-apkpure":{label:"Download APK from APKPure, then patch",color:e.palette.info.main}}},n=function(e,t){void 0===t&&(t=(0,o.Z)());const a=r(t)[e.toLowerCase()]||{};if(e.indexOf("::")>-1){var n;const o=e.split("::");a.color=(null==(n=t.palette[o[0]])?void 0:n.main)||t.palette.info.main,a.label=o[1]}return a}},5788:(e,t,a)=>{a.r(t),a.d(t,{Features:()=>m,assets:()=>s,contentTitle:()=>p,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>u});var o=a(7462),r=a(7294),n=a(3905),l=a(7172);const i={},p=void 0,c={unversionedId:"Discordbot/Features",id:"Discordbot/Features",title:"Features",description:"Examples:",source:"@site/docs/Discordbot/Features.mdx",sourceDirName:"Discordbot",slug:"/Discordbot/Features",permalink:"/lp-compat/docs/Discordbot/Features",draft:!1,editUrl:"https://github.com/Flixbox/lp-compat/blob/main/docs/Discordbot/Features.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Update an existing app",permalink:"/lp-compat/docs/update"},next:{title:"Favourites",permalink:"/lp-compat/docs/favourites"}},s={},u=[],m=()=>{const e=(0,l.F)();return(0,n.kt)(r.Fragment,null,Object.keys(e).map((t=>(0,n.kt)("p",null,(0,n.kt)("b",null,t),": ",e[t].label))))},b={toc:u,Features:m};function d(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,o.Z)({},b,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Examples:"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"/addapp games.onebutton.golfbattle no-iap")),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"/addapp com.gramgames.mergedragons iap|::Works with version 1.2.3 from APKPure")),(0,n.kt)("p",null,"Try to add add either ",(0,n.kt)("inlineCode",{parentName:"p"},"iap")," or ",(0,n.kt)("inlineCode",{parentName:"p"},"no-iap")," to the start of your features list."),(0,n.kt)("hr",null),(0,n.kt)(m,{mdxType:"Features"}),(0,n.kt)("hr",null),(0,n.kt)("p",null,"You can also create custom features using this syntax:"),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"::Download version 1.2.3 on APKPure; then patch")),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"warning::Don't click the fake ads - Please use AdGuard")),(0,n.kt)("p",null,(0,n.kt)("inlineCode",{parentName:"p"},"success::IAP work with some minor restrictions")))}d.isMDXComponent=!0}}]);