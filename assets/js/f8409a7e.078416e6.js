"use strict";(self.webpackChunklp_compat=self.webpackChunklp_compat||[]).push([[206],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>h});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},c=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(a),h=o,m=u["".concat(p,".").concat(h)]||u[h]||d[h]||i;return a?n.createElement(m,r(r({ref:t},c),{},{components:a})):n.createElement(m,r({ref:t},c))}));function h(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=a.length,r=new Array(i);r[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,r[1]=l;for(var s=2;s<i;s++)r[s]=a[s];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},120:(e,t,a)=>{a.d(t,{Z:()=>r});var n=a(1354),o=a(7078);const i=(0,a(9762).Z)(),r=(0,n.Z)({defaultTheme:i,defaultClassName:"MuiBox-root",generateClassName:o.Z.generate})},545:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>f,contentTitle:()=>h,default:()=>g,frontMatter:()=>u,metadata:()=>m,toc:()=>y});var n=a(7462),o=(a(7294),a(3905));const i=a.p+"assets/images/create_modified_apk-ce294b3f390b9ebc58a0e3f6ee09ca91.jpg",r=a.p+"assets/images/rebuild_categories_selection-3c13e0e7eaf5c3fccdd053dd85d76690.jpg",l=a.p+"assets/images/ad_patches-7868e231ca5d1d343b88e9378d9a8034.jpg",p=a.p+"assets/images/iap_patches-f5b772900ac0f2d6007b66ecb9627e31.jpg",s=a.p+"assets/images/LP_App_patching_step_5-39aa3b38e1f7d1f83d4ecfdb816a3fcc.jpg",c=a.p+"assets/images/LP_App_patching_step_6-6eaac48deb427b164c5f0ca1e923c7db.jpg";var d=a(120);const u={sidebar_position:2},h="Patching an app",m={unversionedId:"intro",id:"intro",title:"Patching an app",description:"The download link on the official Lucky Patcher website frequently breaks and spams you with pop-ups in the browser. Use an adblocker - uBlock Origin for desktop and AdGuard DNS for Android - if you plan to visit the website.",source:"@site/docs/intro.mdx",sourceDirName:".",slug:"/intro",permalink:"/lp-compat/docs/intro",draft:!1,editUrl:"https://github.com/Flixbox/lp-compat/blob/main/docs/intro.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Lucky Patcher - Important information",permalink:"/lp-compat/docs/lp-info"},next:{title:"Update an existing app",permalink:"/lp-compat/docs/update"}},f={},y=[{value:"Set up Lucky Patcher",id:"set-up-lucky-patcher",level:2},{value:"Create the modified APK file",id:"create-the-modified-apk-file",level:2},{value:"Reinstall the app",id:"reinstall-the-app",level:2},{value:"Cleanup",id:"cleanup",level:2}],k={toc:y};function g(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},k,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"patching-an-app"},"Patching an app"),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"The download link on the official Lucky Patcher website frequently breaks and spams you with pop-ups in the browser. Use an adblocker - ",(0,o.kt)("a",{parentName:"p",href:"https://ublockorigin.com"},"uBlock Origin")," for desktop and ",(0,o.kt)("a",{parentName:"p",href:"https://adguard-dns.io/en/public-dns.html"},"AdGuard DNS")," for Android - if you plan to visit the website."),(0,o.kt)("p",{parentName:"admonition"},"Alternatively, you can find a safe download link ",(0,o.kt)("a",{parentName:"p",href:"https://discord.gg/RS5ddYf7mw"},"in the #resources channel on Discord"),".")),(0,o.kt)("h2",{id:"set-up-lucky-patcher"},"Set up Lucky Patcher"),(0,o.kt)("p",null,"Read the ",(0,o.kt)("a",{parentName:"p",href:"/lp-compat/docs/lp-info"},"important info about LP")," section."),(0,o.kt)("p",null,'Follow the tutorial on the official website. Make sure to give LP the "Draw over other apps" or "Display pop-up windows" permission.'),(0,o.kt)("p",null,"This special permission can be found in the app's settings. The app settings can be found by long pressing the app in your phone's app drawer. The location of this permission depends on your firmware."),(0,o.kt)("p",null,"Examples:"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"App info > scroll down to Advanced > Display over other apps")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"App info > Other permissions")),(0,o.kt)("h2",{id:"create-the-modified-apk-file"},"Create the modified APK file"),(0,o.kt)("p",null,"Follow these screenshots to create your modified APK file. Read any pop-ups you may come across and try to follow their advice, but don't worry too much about them."),(0,o.kt)("p",null,"First, open Lucky Patcher and tap the app you'd like to modify."),(0,o.kt)("p",null,'On this screen, tap the "APK with multi patch" option. We\'d like to apply two patch categories: The ad-free and the IAP patches.'),(0,o.kt)("img",{src:i,style:{height:700}}),(0,o.kt)(d.Z,{m:2,display:"inline",mdxType:"Box"}),(0,o.kt)("img",{src:r,style:{height:700}}),(0,o.kt)("p",null,"Apply some patches."),(0,o.kt)("img",{src:l,style:{height:700}}),(0,o.kt)(d.Z,{m:2,display:"inline",mdxType:"Box"}),(0,o.kt)("img",{src:p,style:{height:700}}),(0,o.kt)("p",null,"If you're facing troubles with some in-app purchases, apply the ",(0,o.kt)("em",{parentName:"p"},"Signature verification killer")," patch as well. It helps sometimes."),(0,o.kt)("p",null,'Finally, install the modified APK file by tapping the "Go to file" button and then the "Uninstall and install" button.'),(0,o.kt)("img",{src:s,style:{height:700}}),(0,o.kt)(d.Z,{m:2,display:"inline",mdxType:"Box"}),(0,o.kt)("img",{src:c,style:{height:700}}),(0,o.kt)("h2",{id:"reinstall-the-app"},"Reinstall the app"),(0,o.kt)("p",null,"When you reinstall (uninstall the original app and install the patched one) you will no longer be able to use Google features like Google Play sign-in in that app anymore. However, some patchable apps like Merge Dragons and City Island 5 feature Facebook sign-in, which will usually work."),(0,o.kt)("p",null,"Since Android will usually prevent us from installing the patched APK as an update, we'll have to reinstall the app."),(0,o.kt)("h2",{id:"cleanup"},"Cleanup"),(0,o.kt)("p",null,"You'll also be able to find the patched APK files in LP under the \"Rebuild & Install\" option in the menu. If you'd like to clean up some storage, remove these APK files manually."),(0,o.kt)("p",null,"You can also clean up all of your patched APK files at once. Go to your stock file manager (it needs elevated access, the stock file manager usually has elevated access), then go to this path:"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"/Android/data/ru.<random letters>.<random letters>/files/LuckyPatcher/Modified")),(0,o.kt)("p",null,"Use ",(0,o.kt)("a",{parentName:"p",href:"https://play.google.com/store/apps/details?id=com.lonelycatgames.Xplore"},"X-Plore")," if you can't find a file manager with access to the path."),(0,o.kt)("p",null,"You can delete everything in this ",(0,o.kt)("inlineCode",{parentName:"p"},"Modified")," folder. It only contains your patched APKs and some metadata."))}g.isMDXComponent=!0}}]);