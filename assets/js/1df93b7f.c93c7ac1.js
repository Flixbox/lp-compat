"use strict";(self.webpackChunklp_compat=self.webpackChunklp_compat||[]).push([[237],{6917:(e,t,a)=>{a.r(t),a.d(t,{default:()=>Ce});var l=a(7294),n=a(6010),o=a(9960),r=a(2263),i=a(1962),c=a(7462);const s="features_DHSf";var p=a(4623),d=a(4159),m=a(1927),u=a(9762),f=a(120),h=a(9630),g=a(9072),b=a(5084),E=a(3678),y=a(8763),Z=a(6866),w=a(3265),v=a(1448),x=a(562),k=a(2097),P=a(9837),I=a(1359),A=a(918),C=a(4731),S=a(7814),L=a(3024),D=a(9417),N=a(6486),T=a(9758);const G=function(e){return void 0===e&&(e=(0,u.Z)()),{iap:{label:"IAP patch works!",color:e.palette.success.main},"partial-iap":{label:"IAP partially compatible",color:e.palette.warning.main},"unclear-iap":{label:"IAP need verification - Try it out and post in Discord!",color:e.palette.warning.main},"no-iap":{label:"IAP incompatible",color:e.palette.error.main},subscription:{label:"Subscription redeemable!",color:e.palette.success.main},"no-subscription":{label:"Subscription cannot be redeemed",color:e.palette.warning.main},repurchase:{label:"Some IAPs need to be redeemed after every restart",color:e.palette.warning.main},"account-login":{label:"Account login works!",color:e.palette.info.main},"facebook-login":{label:"Facebook login works!",color:e.palette.info.main},"facebook-login-broken":{label:"Facebook login broken",color:e.palette.warning.main},"facebook-login-no-app-installed":{label:"Facebook app must not be installed to login",color:e.palette.warning.main},transfer:{label:"App data can be transferred to another account",color:e.palette.info.main},"transfer-steam":{label:"App data can be transferred to Steam",color:e.palette.info.main},"transfer-ios":{label:"App data can be transferred to iOS",color:e.palette.info.main},multiplayer:{label:"Full Multiplayer; IAP compatible",color:e.palette.primary.main},"partial-multiplayer":{label:"App has some multiplayer features; IAP compatible",color:e.palette.primary.main},"no-multiplayer":{label:"Singleplayer only",color:e.palette.warning.main},"no-multiplayer-iap":{label:"Multiplayer IAP broken",color:e.palette.warning.main},"slightly-broken":{label:"Slightly broken, but playable",color:e.palette.warning.main},"too-many-iap-break":{label:"Buying too many IAP will break the app!",color:e.palette.warning.main},"disable-data-on-lp-popup":{label:"Disable data connection when the LP purchase popup shows to get IAP",color:e.palette.info.main},"restore-purchase":{label:"IAP can be redeemed by restoring purchase and restarting the app",color:e.palette.info.main},"iap-before-load":{label:"Purchase IAP before the app is fully loaded. Play anonymously.",color:e.palette.info.main},"subscription-restore-purchase":{label:"Subscription can be redeemed by restoring purchase",color:e.palette.info.main},"dont-bother":{label:"Don't bother. This game is either grindy or uninteresting.",color:e.palette.warning.main},"region-locked":{label:"If region locked, use Google Account from another region",color:e.palette.warning.main},"patch-before-first-launch":{label:"Patch this game before launching it for the first time!",color:e.palette.warning.main},"special-patch-full-offline":{label:"Select patch option: Make fully offline",color:e.palette.info.main},"special-patch-signature":{label:"Select patch option: Signature verification killer",color:e.palette.info.main},"special-patch-lvl":{label:"Select patch option: Support patch for LVL and Inapp emulation",color:e.palette.info.main},"may-require-root":{label:"This app may require a root-level patch to work.",color:e.palette.info.main},"root-iap":{label:"IAP patch works with rooted device",color:e.palette.info.main},"root-patch":{label:"Root patch available",color:e.palette.info.main},"root-patch-iap":{label:"Patch app with root to make IAP work!",color:e.palette.info.main},"no-root-patch-iap":{label:"Root patch doesn't make IAP available",color:e.palette.info.main},"apk-platinmods":{label:"Patched APK download at PlatinMods",color:e.palette.info.main},"apk-apkpure":{label:"Download APK from APKPure, then patch",color:e.palette.info.main}}},M=function(e,t){void 0===t&&(t=(0,u.Z)());const a=G(t)[e.toLowerCase()]||{};if(e.indexOf("::")>-1){var l;const n=e.split("::");a.color=(null==(l=t.palette[n[0]])?void 0:l.main)||t.palette.info.main,a.label=n[1]}return a};var R=a(2949),F=a(9473);const O=F.I0,_=F.v9;var U=a(9498),z=a(9669);const j=a.n(z)().create({baseURL:"https://luck.up.railway.app/",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Max-Age":600},withCredentials:!0}),H={appsListUpdated:Date.now(),appsListPage:0,discordUser:void 0,discordGuilds:[],dialogs:{EDIT_APP:{open:!1}}},q=(0,U.PH)("clear"),$=(0,U.hg)("/discord/get",(async e=>{let{code:t}=e;return(await j.get(`discord/get/${t}`)).data})),Y=(0,U.oM)({name:"system",initialState:H,reducers:{setAppsListUpdated(e,t){e.appsListUpdated=t.payload},setAppsListPage(e,t){e.appsListPage=t.payload},openDialog(e,t){e.dialogs[t.payload.dialog]={open:!0,...t.payload.data}},closeDialog(e,t){e.dialogs[t.payload.dialog]={open:!1}}},extraReducers:e=>{e.addCase(q,((e,t)=>H)),e.addCase($.fulfilled,((e,t)=>{e.discordUser=t.payload.user,e.discordGuilds=t.payload.guilds}))}}),{setAppsListUpdated:W,setAppsListPage:B,openDialog:K,closeDialog:V}=Y.actions,J=Y.reducer,Q=(0,U.hg)("apps/all",(async()=>(await j.get("/apps/all")).data)),X=(0,U.hg)("apps/get",(async e=>{let{appId:t}=e;return(await j.get(`apps/get/${t}`)).data})),ee=(0,U.hg)("apps/page",(async(e,t)=>{let{page:a}=e;const l=(await j.get(`apps/page/${a}/50`)).data;return t.dispatch(B(a+1)),l})),te=(0,U.hg)("apps/count",(async()=>(await j.get("apps/count")).data)),ae=(0,U.hg)("apps/add",(async e=>{let{app:t}=e;return(await j.post("apps/add/",t)).data})),le=(0,U.hg)("apps/edit",(async e=>{let{app:t}=e;return(await j.post("apps/edit/",t)).data})),ne=[],oe=(0,U.oM)({name:"apps",initialState:ne,reducers:{},extraReducers:e=>{e.addCase(q,((e,t)=>ne)),e.addCase(Q.fulfilled,((e,t)=>t.payload)),e.addCase(X.fulfilled,((e,t)=>{const a=e.findIndex((e=>t.payload.appId===e.appId));a<0&&e.push(t.payload),e[a]=t.payload})),e.addCase(ae.fulfilled,((e,t)=>{console.log("addapp result",t.payload);const a=e.findIndex((e=>t.payload.value.appId===e.appId));a<0&&e.push(t.payload.value),e[a]=t.payload.value})),e.addCase(le.fulfilled,((e,t)=>{console.log("editApp result",t.payload);const a=e.findIndex((e=>t.payload.value.appId===e.appId));a<0&&e.push(t.payload.value),e[a]=t.payload.value})),e.addCase(ee.fulfilled,((e,t)=>(t.payload.forEach((e=>"632c280dabd31def75d1ac54"===e._id&&console.log("Found app!"))),[...e,...t.payload])))}}).reducer;var re=a(2595);const ie={namespace:"flixbox",states:["apps","system.appsListPage","system.appsListUpdated","system.dialogs"]},ce=(0,U.xC)({reducer:{apps:oe,system:J},middleware:e=>e().concat((0,re.a1)(ie)),preloadedState:(0,re.zD)(ie)});var se=a(412),pe=a(7971),de=a(1470),me=a(5050),ue=a(784),fe=a(9604),he=a(3997),ge=a(8377);const be=e=>{let{editState:t,field:a,handleChange:n}=e;return l.createElement(pe.Z,{label:a,value:t[a],onChange:e=>n(a,e.target.value)})},Ee=e=>{let{open:t,appId:a=""}=e;const n=O(),o=_((e=>e.apps.find((e=>e.appId===a))))||{appId:a};console.log("initialAppData",o);const[r,i]=(0,l.useState)({...o}),[s,p]=(0,l.useState)(!1),d=(0,k.Z)(),m=G(d);console.log("editState",r);const u=(e,t)=>{i({...r,[e]:t})},f=()=>{i({}),n(V({dialog:"EDIT_APP"}))};(0,l.useEffect)((()=>{t&&i({...o})}),[t]);return l.createElement(de.Z,{fullScreen:!0,open:t,onClose:f},t&&0!==Object.keys(r).length&&l.createElement(l.Fragment,null,l.createElement(me.Z,{sx:{position:"relative"}},l.createElement(ue.Z,null,l.createElement(x.Z,{edge:"start",color:"inherit",onClick:f,"aria-label":"close"},l.createElement(S.G,{icon:D.NBC})),l.createElement(h.Z,{sx:{ml:2,flex:1},variant:"h6",component:"div"},"Add or edit app"),l.createElement(b.Z,{autoFocus:!0,color:"inherit",onClick:async()=>{let e=await n(ae({app:r}));"fulfilled"===e.meta.requestStatus?f():(e=await n(le({app:r})),"fulfilled"===e.meta.requestStatus?f():p(!0))}},"save"))),l.createElement(ge.Z,{m:1}),s&&l.createElement(fe.Z,{severity:"error",onClose:()=>{p(!1)}},"That didn't work. Make sure you prefix any custom features with ::",l.createElement("br",null),"Does the app ",r.appId," exist on the Play Store?"),l.createElement(ge.Z,{m:1}),l.createElement(be,{field:"appId",editState:r,handleChange:u}),l.createElement(ge.Z,{m:1}),l.createElement(h.Z,null,a),l.createElement(ge.Z,{m:1}),l.createElement(be,{field:"title",editState:r,handleChange:u}),l.createElement(ge.Z,{m:1}),l.createElement(h.Z,null,"You can select various pre-defined features from the list or add your own. ",l.createElement("br",null)," Please try to always at least choose one of iap, unclear-iap or no-iap so that users can filter the list. ",l.createElement("br",null),"You can add custom features by prefixing them with :: ",l.createElement("br",null),"Examples: ",l.createElement("br",null),"::Works with version 1.2.3 from APKPure ",l.createElement("br",null),"warning::Does not work with Android 12"),l.createElement(ge.Z,{m:1}),l.createElement(he.Z,{multiple:!0,id:"tags-filled",options:Object.keys(m).map((e=>e)),freeSolo:!0,value:r.features,onChange:(e,t)=>{console.log("onChange",t),u("features",t)},renderTags:(e,t)=>e.map(((e,a)=>l.createElement(v.Z,(0,c.Z)({variant:"outlined",label:e},t({index:a}))))),renderInput:e=>l.createElement(pe.Z,(0,c.Z)({},e,{variant:"filled",label:"Features",placeholder:"Features"})),renderOption:(e,t)=>l.createElement(ge.Z,(0,c.Z)({component:"li",flexDirection:"column"},e),l.createElement(h.Z,null,m[t].label),l.createElement(h.Z,{variant:"caption"},t))})))},ye=()=>{const{dialogs:e}=_((e=>e.system));return l.createElement(l.Fragment,null,l.createElement(Ee,null==e?void 0:e.EDIT_APP))},Ze=[{icon:l.createElement(f.Z,{flex:"1"},l.createElement(f.Z,{className:"fa-layers fa-fw"},l.createElement(h.Z,{className:"fa-layers-text fa-inverse",color:"#607d8b",fontWeight:900,fontSize:30},"ROOT"),l.createElement(S.G,{icon:D.gPx,color:"#e51c23",size:"lg",opacity:.9}))),description:l.createElement(h.Z,null,'No root access is required for these patches, except for apps in the "Root" category.')},{icon:l.createElement(f.Z,{flex:"1"},l.createElement(f.Z,{className:"fa-layers fa-fw",mr:4},l.createElement(S.G,{icon:D.HCh,color:"#607d8b"}),l.createElement(S.G,{icon:D.gPx,color:"#e51c23",size:"lg",opacity:.9})),l.createElement(f.Z,{className:"fa-layers fa-fw",ml:4},l.createElement(S.G,{icon:D.vJI,color:"#607d8b"}),l.createElement(S.G,{icon:D.Vkm,color:"#e51c23",size:"xs",opacity:.9,transform:"down-4 right-8"}))),description:l.createElement(h.Z,null,"Apps are patched using"," ",l.createElement(o.Z,{href:"/docs/intro"},"the default IAP and Adblock patches"),".")},{icon:l.createElement(S.G,{icon:D.jMV,color:"#607d8b"}),description:l.createElement(h.Z,null,"Many apps work with LP, even if they're not on the list.",l.createElement("br",null),"Please try them yourself and report back!")},{icon:l.createElement(S.G,{icon:L.omb,color:"#607d8b"}),description:l.createElement(h.Z,null,"Found something? Create an"," ",l.createElement(o.Z,{href:"https://github.com/Flixbox/lp-compat/issues"},"issue")," or post on the ",l.createElement(o.Z,{href:"https://discord.gg/RS5ddYf7mw"},"Discord"),"!")},{icon:l.createElement(S.G,{icon:D.kWN,color:"#607d8b"}),description:l.createElement(h.Z,null,"Check out the"," ",l.createElement(o.Z,{href:"/docs/honorable-mentions"},"honorable mentions")," too!")}];function we(e){let{icon:t,description:a}=e;return l.createElement("div",{className:(0,n.Z)("col col--4")},l.createElement(f.Z,{className:"text--center",height:"70px",mt:3},t),l.createElement("div",{className:"text--center padding-horiz--md"},a))}const ve=()=>{const e=O(),[t,a]=(0,T.Yw)("","appsTitleFilter"),[n,o]=(0,T.Yw)("installs-asc","apps-sorting"),[r,i]=(0,l.useState)(!1),[p,d]=(0,l.useState)(0),m=_((e=>e.apps)),{appsListUpdated:u,appsListPage:k,discordUser:P}=_((e=>e.system));let I;if(se.Z.canUseDOM&&(I=new URLSearchParams(window.location.search).get("code")),P){document.getElementById("discord-login").innerHTML=P.username}(0,l.useEffect)((()=>{e(te()).then((e=>{d(e.payload)})),e($({code:I}))}),[]);const A=[{id:"compatible",title:"Compatible apps",onlyRenderIf:e=>e.features.indexOf("iap")>-1},{id:"unclear-iap",title:"Uncategorized",onlyRenderIf:e=>-1===e.features.indexOf("iap")&&-1===e.features.indexOf("no-iap")},{id:"incompatible",title:"Incompatible apps",onlyRenderIf:e=>e.features.indexOf("no-iap")>-1}],[C,L]=(0,T.Yw)(A.map((e=>e.id)),"onlyShowTheseVisibilitySettings");n||o("installs-asc");const G={"name-asc":{title:"Sort by name",getSortedApps:()=>[...m].sort(((e,t)=>e.title.localeCompare(t.title)))},"installs-asc":{title:"Sort by downloads",getSortedApps:()=>[...m].sort(((e,t)=>t.minInstalls-e.minInstalls))},"date-modified":{title:"Sort by last modified",getSortedApps:()=>[...m].sort(((e,t)=>t.dateModified-e.dateModified))}},M=G[n].getSortedApps(),R=50*k>=p||m.length>=p;return(0,l.useEffect)((()=>{r||(R?r&&i(!1):(!r&&i(!0),console.log("appsListPage",k),e(ee({page:k})).then((()=>{i(!1)}))))}),[m,r,p]),l.createElement("section",{className:s},l.createElement("div",{className:"container"},l.createElement("div",{className:"row fa-3x"},Ze.map(((e,t)=>l.createElement(we,(0,c.Z)({key:t},e))))),l.createElement(f.Z,{m:8}),l.createElement(f.Z,{className:"row",display:"flex",flexDirection:"column"},l.createElement(g.ZP,{container:!0},(null==P?void 0:P.username)&&l.createElement(b.Z,{onClick:()=>{e(K({dialog:"EDIT_APP",data:{}}))}},l.createElement(S.G,{icon:D.XSk})," New app"),l.createElement(h.Z,{variant:"h3"},"Filter apps"),l.createElement(f.Z,{flexGrow:1}),l.createElement(E.Z,{value:n,onChange:e=>o(e.target.value)},Object.entries(G).map((e=>l.createElement(y.Z,{value:e[0],key:e[0]},e[1].title))))),l.createElement(Z.Z,{placeholder:"Filter app title or ID",value:t,onChange:e=>a(e.currentTarget.value.toLowerCase())}),A.map((e=>{let{id:t,title:a}=e;return l.createElement(w.ZP,{key:t},l.createElement(v.Z,{label:a,onClick:()=>L((0,N.xor)(C,[t])),icon:l.createElement(S.G,{icon:-1!==C.indexOf(t)?D.Mdf:D.Aq,color:"#e51c23",size:"lg",opacity:.9})}))}))),l.createElement("div",{id:"apps"}),l.createElement(h.Z,null,`Loaded ${m.length} out of ${p} apps!`,r&&" Loading more...",l.createElement("br",null),!r&&R&&l.createElement(x.Z,{onClick:()=>(e(q()),void(0,re.ZH)())},l.createElement(S.G,{icon:D.QDM})),`Last refreshed: ${new Date(u).toLocaleString()}`),M.map((e=>{if(-1===e.title.toLowerCase().indexOf(t)&&-1===e.appId.toLowerCase().indexOf(t))return;let a=!1;return C.forEach((t=>{A.find((e=>e.id===t)).onlyRenderIf(e)&&(a=!0)})),a?l.createElement(xe,{app:e,key:e.appId}):void 0}))))},xe=e=>{let{app:t}=e;const a=(0,k.Z)(),{appId:n,features:o,dateModified:r,title:i,icon:c,installs:s,scoreText:m,url:u,genre:b,screenshots:E,free:y,priceText:Z}=t,{discordUser:w}=_((e=>e.system)),v=O();(0,F.oR)();return l.createElement(g.ZP,{item:!0,xs:12,m:1},l.createElement(d.Z,{defaultHeight:800,stayRendered:!0},l.createElement(P.Z,{style:{maxWidth:"100%"}},l.createElement("a",{href:u},l.createElement(I.Z,{sx:{padding:"8px"}},l.createElement(p.Z,{hideScrollbar:!1,style:{height:"200px"}},E.map((e=>l.createElement("img",{src:e,alt:"App screenshot",loading:"lazy",key:e})))),o&&o.map((e=>l.createElement(A.Z,{component:f.Z,elevation:0,padding:.5,sx:{backgroundColor:M(e,a).color},key:e,mt:.5},l.createElement(h.Z,{color:a.palette.getContrastText(M(e,a).color)},M(e,a).label)))),l.createElement(f.Z,{display:"flex",mt:1},l.createElement(C.Z,{src:c,variant:"square",sx:{marginRight:1}}),l.createElement(f.Z,{display:"flex",flexDirection:"column"},l.createElement(h.Z,null,i),l.createElement(h.Z,{variant:"subtitle2"},n))),l.createElement(f.Z,{display:"flex",justifyContent:"space-between"},l.createElement(h.Z,{variant:"subtitle2"},"\u2b50",m),l.createElement(h.Z,{variant:"subtitle2"},"\ud83d\udce9 ",s)),l.createElement(f.Z,{display:"flex",justifyContent:"space-between",flexWrap:"wrap"},l.createElement(h.Z,{variant:"subtitle2"},b),r&&l.createElement(h.Z,{variant:"subtitle2",whiteSpace:"nowrap"},"Entry last modified:"," ",new Date(r).toLocaleString())),!y&&l.createElement(h.Z,{variant:"subtitle2"},Z))),(null==w?void 0:w.username)&&l.createElement(x.Z,{onClick:()=>{v(K({dialog:"EDIT_APP",data:{appId:n}}))}},l.createElement(S.G,{icon:D.IwR})))))},ke=()=>{const{colorMode:e}=(0,R.I)();return l.createElement(l.Fragment,null,l.createElement(F.zt,{store:ce},l.createElement(m.Z,{theme:(0,u.Z)({palette:{mode:e}})},l.createElement(ve,null),l.createElement(ye,null))))},Pe="heroBanner_jHI5",Ie="buttons_Pntg";a(8440);function Ae(){const{siteConfig:e}=(0,r.Z)();return l.createElement("header",{className:(0,n.Z)("hero hero--primary",Pe)},l.createElement("div",{className:"container"},l.createElement(S.G,{icon:D.eSc,size:"4x"}),l.createElement("h1",{className:"hero__title"},e.title),l.createElement("p",{className:"hero__subtitle"},e.tagline),l.createElement(f.Z,{className:Ie,flex:"1",flexDirection:"column"},l.createElement(o.Z,{className:"button button--secondary button--lg",to:"/docs/lp-info"},"Important info about LP \ud83d\udca1"),l.createElement(f.Z,{m:1}),l.createElement(o.Z,{className:"button button--secondary button--lg",to:"/docs/intro"},"How to install & patch an app \ud83d\udcd6"),l.createElement(f.Z,{m:1}),l.createElement(o.Z,{className:"button button--secondary button--lg",to:"#apps"},"To the list \ud83d\ude80"))))}function Ce(){const{siteConfig:e}=(0,r.Z)();return l.createElement(i.Z,{title:`${e.title}`,description:"A full overview of Lucky Patcher Compatibility with various apps."},l.createElement(Ae,null),l.createElement("main",null,l.createElement(ke,null)))}a(3636).vc.autoAddCss=!1}}]);