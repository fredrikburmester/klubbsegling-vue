(function(e){function t(t){for(var r,i,o=t[0],s=t[1],l=t[2],d=0,b=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&b.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);u&&u(t);while(b.length)b.shift()();return c.push.apply(c,l||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},c=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],s=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=s;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23");function a(e,t,n,a,c,i){var o=Object(r["z"])("Header"),s=Object(r["z"])("router-view");return Object(r["s"])(),Object(r["e"])("div",null,[Object(r["i"])(o),Object(r["i"])(s)])}n("b0c0");var c={class:"navbar shadow-lg bg-white text-neutral-content"},i=Object(r["i"])("span",{class:"ml-4 text-lg font-bold text-black"},"klubbsegling",-1),o={class:"flex-none hidden px-2 mx-2 sm:flex"},s={class:"flex items-stretch"},l=Object(r["h"])("Hem"),u=Object(r["h"])("Tävlingar"),d=Object(r["h"])("Profil"),b={class:"navbar fixed sm:hidden bg-white text-neutral-content justify-center bottom-0 z-10 w-screen"},p={class:"sm:hidden px-2 mx-2 w-screen justify-center"},m={class:"flex items-stretch justify-around w-screen"};function f(e,t,a,f,j,g){var O=Object(r["z"])("font-awesome-icon"),h=Object(r["z"])("router-link");return Object(r["s"])(),Object(r["e"])("div",null,[Object(r["i"])("div",c,[Object(r["i"])("img",{id:"navbar-logo",class:"rounded-full w-10 h-10 ml-2",src:n("9c7f"),alt:"logo"},null,8,["src"]),i,Object(r["i"])("div",o,[Object(r["i"])("div",s,[Object(r["i"])(h,{id:"home",class:["btn btn-sm rounded-btn mx-2",g.activeButton("Hem")],to:"/"},{default:Object(r["H"])((function(){return[Object(r["i"])(O,{icon:"home",class:"mr-2"}),l]})),_:1},8,["class"]),Object(r["i"])(h,{id:"races",class:["btn btn-sm rounded-btn mx-2",g.activeButton("Seglingar")],to:"/races"},{default:Object(r["H"])((function(){return[Object(r["i"])(O,{icon:"flag",class:"mr-2"}),u]})),_:1},8,["class"]),Object(r["i"])(h,{id:"profile",class:["btn btn-sm rounded-btn mx-2",g.activeButton("Profil")],to:"/profile"},{default:Object(r["H"])((function(){return[Object(r["i"])(O,{icon:"profile",class:"mr-2"}),d]})),_:1},8,["class"])])])]),Object(r["i"])("div",b,[Object(r["i"])("div",p,[Object(r["i"])("div",m,[Object(r["i"])(h,{id:"home",to:"/",class:["btn btn-sm rounded-btn",g.activeButton("Hem")]},{default:Object(r["H"])((function(){return[Object(r["i"])(O,{icon:"home",class:"mx-2"})]})),_:1},8,["class"]),Object(r["i"])(h,{id:"races",to:"/races",class:["btn btn-sm rounded-btn",g.activeButton("Seglingar")]},{default:Object(r["H"])((function(){return[Object(r["i"])(O,{icon:"flag",class:"mx-2"})]})),_:1},8,["class"]),Object(r["i"])(h,{id:"profile",to:"/profile",class:["btn btn-sm rounded-btn",g.activeButton("Profil")]},{default:Object(r["H"])((function(){return[Object(r["i"])(O,{icon:"user",class:"mx-2"})]})),_:1},8,["class"])])])])])}var j={name:"Header2",data:function(){return{active:!0}},computed:{loggedIn:function(){return this.$store.getters.isAuthenticated}},methods:{activeButton:function(e){return this.$route.name==e?"btn-primary text-white":"text-black btn-ghost"},activeButtonDropdown:function(e){return this.$route.name==e?"btn-primary text-white":"text-black btn-ghost"}}},g=n("d959"),O=n.n(g);const h=O()(j,[["render",f]]);var v=h,w={components:{Header:v},computed:{loggedIn:function(){return this.$store.getters.isAuthenticated},isLoginOrRegister:function(){return"Login"!=this.$route.name&&"Registrera"!=this.$route.name}}};const x=O()(w,[["render",a]]);var y=x,k=n("9483");Object(k["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var S=n("6c02"),R={class:"home p-5 bg-white"};function _(e,t,n,a,c,i){return Object(r["s"])(),Object(r["e"])("div",R)}var I=n("1da1"),B=(n("96cf"),{name:"Home",data:function(){return{boats:null,races:null}},mounted:function(){var e=this;return Object(I["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,getRaces();case 2:e.races=t.sent;case 3:case"end":return t.stop()}}),t)})))()},methods:{}});const U=O()(B,[["render",_]]);var A=U,$={key:0},H={class:"p-6"},P={class:"text-left"},E={class:"mt-4"},z={class:"card-title"},C=Object(r["i"])("h1",{class:"my-2 font-bold"},"Mina Båtar",-1),N={class:"overflow-x-auto"},D={class:"table w-full"},L=Object(r["i"])("thead",null,[Object(r["i"])("tr",null,[Object(r["i"])("th",null,"Name")])],-1);function T(e,t,n,a,c,i){var o=Object(r["z"])("router-link");return c.loading?Object(r["f"])("",!0):(Object(r["s"])(),Object(r["e"])("div",$,[Object(r["i"])("div",H,[Object(r["i"])("div",P,[Object(r["i"])("div",E,[Object(r["i"])("h2",z,Object(r["B"])(c.me.username),1),Object(r["i"])("p",null,Object(r["B"])(c.me.about||null),1),C,Object(r["i"])("div",N,[Object(r["i"])("table",D,[L,Object(r["i"])("tbody",null,[(Object(r["s"])(!0),Object(r["e"])(r["a"],null,Object(r["x"])(c.boats,(function(e){return Object(r["s"])(),Object(r["e"])("tr",{key:e.id},[Object(r["i"])("th",null,[Object(r["i"])(o,{to:"/boats/".concat(e.id)},{default:Object(r["H"])((function(){return[Object(r["h"])(Object(r["B"])(e.name),1)]})),_:2},1032,["to"])])])})),128))])])])])]),Object(r["i"])("button",{class:"btn btn-error my-4",onClick:t[1]||(t[1]=function(){return i.logout&&i.logout.apply(i,arguments)})},"Logga ut")])]))}n("99af");var q="AUTH_REQUEST",V="AUTH_SUCCESS",M="AUTH_ERROR",J="AUTH_LOGOUT",F="https://admin.klubbsegling.se",G=n("bc3a"),Q=n.n(G),Y=n("98a0"),K=(n("c4bb"),n("4328"),{data:function(){return{me:null,error:null,loading:!0,boats:[]}},mounted:function(){var e=this;return Object(I["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Q.a.get("".concat(F,"/users/me"),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("jwt"))}});case 3:return n=t.sent,e.me=n.data,console.log(e.me),t.next=8,Q.a.get("".concat(F,"/boats?sailors.username=").concat(e.me.username),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("jwt"))}});case 8:n=t.sent,e.boats=n.data,console.log(e.boats),e.loading=!1,t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](0),e.error=t.t0,console.log(e.error);case 18:case"end":return t.stop()}}),t,null,[[0,14]])})))()},methods:{logout:function(){var e=this;this.$store.dispatch(J).then((function(){null!=e.$route.params.nextUrl?e.$router.push(e.$route.params.nextUrl):e.$router.push("/login")})),this.toast("Hejdå!","default")},toast:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3e3,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"top-right";Object(Y["a"])(e,{type:t,timeout:n,position:r})}}});const W=O()(K,[["render",T]]);var X=W,Z={class:"races px-6"},ee={key:0},te={key:1};function ne(e,t,n,a,c,i){var o=Object(r["z"])("RaceCard");return Object(r["s"])(),Object(r["e"])("div",Z,[c.error||!c.loaded?(Object(r["s"])(),Object(r["e"])("div",ee,Object(r["B"])(c.error),1)):(Object(r["s"])(),Object(r["e"])("div",te,[(Object(r["s"])(!0),Object(r["e"])(r["a"],null,Object(r["x"])(c.races,(function(e){return Object(r["s"])(),Object(r["e"])("div",{key:e.id},[Object(r["i"])(o,{race:e},null,8,["race"])])})),128))]))])}var re={class:"card shadow-2xl lg:card-side bg-white text-black my-4"},ae={class:"card-body"},ce={class:"text-left text-xl font-bold"},ie={class:"text-left"},oe={class:"justify-start card-actions"},se=Object(r["h"])(" Visa mer "),le=Object(r["i"])("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",class:"inline-block w-6 h-6 ml-2 stroke-current"},[Object(r["i"])("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5l7 7-7 7"})],-1);function ue(e,t,n,a,c,i){var o=Object(r["z"])("router-link");return Object(r["s"])(),Object(r["e"])("div",re,[Object(r["i"])("div",ae,[Object(r["i"])("h1",ce,Object(r["B"])(n.race.name),1),Object(r["i"])("p",ie,Object(r["B"])(i.formatDate(n.race.start))+" - "+Object(r["B"])(i.formatDate(n.race.end)),1),Object(r["i"])("div",oe,[Object(r["i"])(o,{class:"btn bg-primary border-0 text-white",to:"/race/".concat(n.race.id)},{default:Object(r["H"])((function(){return[se,le]})),_:1},8,["to"])])])])}var de={props:{race:{type:Object,default:function(){}}},data:function(){return{occ:""}},methods:{formatDate:function(e){return void 0!==e?(e=new Date(e),"".concat(e.getFullYear(),"/").concat(e.getMonth()+1,"/").concat(e.getDate())):"-"},loggedIn:function(){return this.$store.getters.isAuthenticated},getUser:function(){return this.$store.getters.getProfile}}};const be=O()(de,[["render",ue]]);var pe=be,me={name:"Races",components:{RaceCard:pe},data:function(){return{races:[],error:null,loaded:!1}},mounted:function(){var e=this;return Object(I["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Q.a.get("".concat(F,"/races"),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("jwt"))}});case 3:n=t.sent,e.races=n.data,e.loaded=!0,t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),e.error=t.t0;case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()}};const fe=O()(me,[["render",ne]]);var je=fe,ge=(n("a4d3"),n("e01a"),{key:0}),Oe={key:1,class:"flex flex-col overflow-auto mb-20"},he={class:"px-6 pt-5"},ve={class:"card-body"},we={class:"card-title"},xe={class:"my-2"},ye=Object(r["g"])('<div class="shadow stats mx-4 h-auto"><div class="stat"><div class="stat-figure text-secondary"></div><div class="stat-title">Registrerade Båtar</div><div class="stat-value">38st</div></div><div class="stat"><div class="stat-figure text-secondary"></div><div class="stat-title">Sträcka</div><div class="stat-value">4</div><div class="stat-desc">Distans</div></div></div><div class="w-screen justify-start"><ul class="steps steps-vertical w-screen p-6"><li class="step step-primary">Registrering</li><li class="step step-primary">Registering stänger</li><li class="step step-primary">Gruppindelning</li><li class="step">Seglats</li></ul></div>',2),ke={class:"overflow-x-auto my-4 mx-6"},Se=Object(r["i"])("h1",{class:"my-2"},"Deltagare:",-1),Re=Object(r["i"])("thead",null,[Object(r["i"])("tr",null,[Object(r["i"])("th",null,"Name")])],-1),_e={class:"w-screen flex space-x-4 h-20 place-content-center"};function Ie(e,t,n,a,c,i){return Object(r["s"])(),Object(r["e"])("div",null,[c.error||c.loading?(Object(r["s"])(),Object(r["e"])("div",ge,Object(r["B"])(c.error),1)):(Object(r["s"])(),Object(r["e"])("div",Oe,[Object(r["i"])("figure",he,[Object(r["i"])("img",{src:c.img,class:"rounded-xl"},null,8,["src"])]),Object(r["i"])("div",ve,[Object(r["i"])("h2",we,Object(r["B"])(c.name),1),Object(r["i"])("p",xe,Object(r["B"])(c.description),1)]),ye,Object(r["i"])("div",ke,[Se,(Object(r["s"])(),Object(r["e"])("table",{key:c.race.participants,class:"table w-full table-zebra"},[Re,Object(r["i"])("tbody",null,[(Object(r["s"])(!0),Object(r["e"])(r["a"],null,Object(r["x"])(c.race.participants,(function(e){return Object(r["s"])(),Object(r["e"])("tr",{key:e.id},[Object(r["i"])("td",null,Object(r["B"])(e.name),1)])})),128))])]))]),Object(r["i"])("div",_e,[Object(r["i"])("button",{class:"btn btn-primary text-white",onClick:t[1]||(t[1]=function(e){return i.register(c.user,c.race)})}," Registrera "),Object(r["i"])("button",{class:"btn btn-warning",onClick:t[2]||(t[2]=function(e){return i.unregister(c.user,c.race)})}," Avregistrera ")])]))])}var Be=n("2909"),Ue=function(){var e=Object(I["a"])(regeneratorRuntime.mark((function e(t,n){var r,a,c,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=Object(Be["a"])(n.participants),r.push(t),a={Authorization:"Bearer ".concat(localStorage.getItem("jwt"))},c={participants:r},e.next=6,Q.a.put("".concat(F,"/races/").concat(n.id),c,{headers:a});case 6:return i=e.sent,e.abrupt("return",i.data.participants);case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),Ae=(n("4de4"),function(){var e=Object(I["a"])(regeneratorRuntime.mark((function e(t,n){var r,a,c,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=Object(Be["a"])(n.participants),r=r.filter((function(e){return e.username!=t.username})),a={Authorization:"Bearer ".concat(localStorage.getItem("jwt"))},c={participants:r},e.next=6,Q.a.put("".concat(F,"/races/").concat(n.id),c,{headers:a});case 6:return i=e.sent,e.abrupt("return",i.data.participants);case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),$e={name:"Race",components:{},data:function(){return{race:null,name:null,description:null,error:null,loading:!0,API_URL:F,img:"",user:null,id:null}},mounted:function(){var e=this;return Object(I["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Q.a.get("".concat(F,"/races/").concat(e.$route.params.id),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("jwt"))}});case 3:n=t.sent,console.log("Getting race data:",n.data),r=n.data,e.race=r,e.name=r.name?r.name:"Saknar namn",e.description=r.description?r.description:"Saknar beskrivning",e.img=0!=r.images.length?F+r.images[0].url:"",e.id=r.id,e.loading=!1,e.user=JSON.parse(localStorage.getItem("user")),t.next=18;break;case 15:t.prev=15,t.t0=t["catch"](0),e.error=t.t0;case 18:case"end":return t.stop()}}),t,null,[[0,15]])})))()},methods:{register:function(e,t){var n=this;return Object(I["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Ue(e,t);case 2:a=r.sent,console.log(a.length,n.race.participants.length),a.length==n.race.participants.length+1?(n.race.participants=a,n.toast("Du är registrerad!")):n.toast("Någonting gick snett... Är du redan registrerad?","warning");case 5:case"end":return r.stop()}}),r)})))()},unregister:function(e,t){var n=this;return Object(I["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,Ae(e,t);case 2:a=r.sent,a.length==n.race.participants.length-1?(n.race.participants=a,n.toast("Du är avregistrerad!","info")):n.toast("Någonting gick snett...","warning");case 4:case"end":return r.stop()}}),r)})))()},toast:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"slide";Object(Y["a"])(e,{type:t,transition:n})}}};const He=O()($e,[["render",Ie]]);var Pe=He,Ee={class:"about"},ze=Object(r["i"])("h1",null,"This is an profile proteted page",-1);function Ce(e,t){return Object(r["s"])(),Object(r["e"])("div",Ee,[ze])}const Ne={},De=O()(Ne,[["render",Ce]]);var Le=De,Te=Object(r["i"])("h1",{class:"font-bold text-xl"},"Logga in",-1),qe=Object(r["i"])("label",{class:"label"},"Användarnamn",-1),Ve=Object(r["i"])("label",{class:"label"},"Lösenord",-1),Me=Object(r["i"])("hr",null,null,-1),Je=Object(r["i"])("button",{class:"btn btn-primary my-4",type:"submit"},"Login",-1);function Fe(e,t,n,a,c,i){return Object(r["s"])(),Object(r["e"])("div",null,[Object(r["i"])("div",{class:"form-control m-6",onSubmit:t[3]||(t[3]=Object(r["J"])((function(){return i.login&&i.login.apply(i,arguments)}),["prevent"]))},[Te,qe,Object(r["I"])(Object(r["i"])("input",{"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.username=t}),class:"input input-bordered",required:"",type:"text",placeholder:"användarnamn"},null,512),[[r["E"],e.username]]),Ve,Object(r["I"])(Object(r["i"])("input",{"onUpdate:modelValue":t[2]||(t[2]=function(e){return c.password=e}),class:"input input-bordered",required:"",type:"password",placeholder:"lösenord"},null,512),[[r["E"],c.password]]),Me,Je],32)])}var Ge={data:function(){return{email:"",password:""}},methods:{login:function(){var e=this,t=this.username,n=this.password,r={identifier:t,password:n};this.$store.dispatch(q,r).then((function(){e.$emit("loggedIn"),null!=e.$route.params.nextUrl?e.$router.push(e.$route.params.nextUrl):(e.$router.push("/"),e.toast("Välkommen!","default"))}))},toast:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3e3,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"top-right";Object(Y["a"])(e,{type:t,timeout:n,position:r})}}};const Qe=O()(Ge,[["render",Fe]]);var Ye=Qe,Ke=Object(r["i"])("h4",null,"Register",-1),We=Object(r["i"])("label",{for:"name"},"Name",-1),Xe=Object(r["i"])("label",{for:"email"},"E-Mail Address",-1),Ze=Object(r["i"])("label",{for:"password"},"Password",-1),et=Object(r["i"])("label",{for:"password-confirm"},"Confirm Password",-1),tt=Object(r["i"])("label",{for:"password-confirm"},"Is this an administrator account?",-1),nt=Object(r["i"])("option",{value:"1"},"Yes",-1),rt=Object(r["i"])("option",{value:"0"},"No",-1);function at(e,t,n,a,c,i){return Object(r["s"])(),Object(r["e"])("div",null,[Ke,Object(r["i"])("form",null,[We,Object(r["i"])("div",null,[Object(r["I"])(Object(r["i"])("input",{id:"name","onUpdate:modelValue":t[1]||(t[1]=function(e){return c.name=e}),type:"text",required:"",autofocus:""},null,512),[[r["E"],c.name]])]),Xe,Object(r["i"])("div",null,[Object(r["I"])(Object(r["i"])("input",{id:"email","onUpdate:modelValue":t[2]||(t[2]=function(e){return c.email=e}),type:"email",required:""},null,512),[[r["E"],c.email]])]),Ze,Object(r["i"])("div",null,[Object(r["I"])(Object(r["i"])("input",{id:"password","onUpdate:modelValue":t[3]||(t[3]=function(e){return c.password=e}),type:"password",required:""},null,512),[[r["E"],c.password]])]),et,Object(r["i"])("div",null,[Object(r["I"])(Object(r["i"])("input",{id:"password-confirm","onUpdate:modelValue":t[4]||(t[4]=function(e){return c.password_confirmation=e}),type:"password",required:""},null,512),[[r["E"],c.password_confirmation]])]),tt,Object(r["i"])("div",null,[Object(r["I"])(Object(r["i"])("select",{"onUpdate:modelValue":t[5]||(t[5]=function(e){return c.is_admin=e})},[nt,rt],512),[[r["D"],c.is_admin]])]),Object(r["i"])("div",null,[Object(r["i"])("button",{type:"submit",onClick:t[6]||(t[6]=function(){return i.handleSubmit&&i.handleSubmit.apply(i,arguments)})},"Register")])])])}var ct={props:{nextUrl:{type:String,default:"/"}},data:function(){return{name:"",email:"",password:"",password_confirmation:"",is_admin:null}},methods:{handleSubmit:function(e){var t=this;if(e.preventDefault(),!(this.password===this.password_confirmation&&this.password.length>0))return this.password="",this.passwordConfirm="",alert("Passwords do not match");var n="http://localhost:3000/register";this.$http.post(n,{name:this.name,email:this.email,password:this.password,is_admin:this.is_admin}).then((function(e){localStorage.setItem("user",JSON.stringify(e.data.user)),localStorage.setItem("jwt",e.data.token),null!=localStorage.getItem("jwt")&&(t.$emit("loggedIn"),null!=t.$route.params.nextUrl?t.$router.push(t.$route.params.nextUrl):t.$router.push("/"))})).catch((function(e){console.error(e)}))}}};const it=O()(ct,[["render",at]]);var ot=it,st=[{path:"/",name:"Hem",component:A,meta:{requiresAuth:!0}},{path:"/races",name:"Seglingar",component:je},{path:"/race/:id",name:"Segling",component:Pe},{path:"/profile",name:"Profil",component:X,meta:{requiresAuth:!0}},{path:"/login",name:"Login",component:Ye},{path:"/register",name:"Registrera",component:ot},{path:"/admin",name:"Admin",component:Le,meta:{requiresAuth:!0,is_admin:!0}}],lt=Object(S["a"])({history:Object(S["b"])("/"),routes:st});lt.beforeEach((function(e,t,n){if(e.matched.some((function(e){return e.meta.requiresAuth})))if(null==localStorage.getItem("jwt"))n({path:"/login",params:{nextUrl:e.fullPath}});else{var r=JSON.parse(localStorage.getItem("user"));e.matched.some((function(e){return e.meta.is_admin}))?1==r.is_admin?n():n({name:"Home"}):n()}else e.matched.some((function(e){return e.meta.guest}))?null==localStorage.getItem("jwt")?n():n({name:"Home"}):n()}));var ut,dt,bt=lt,pt=n("5502"),mt=n("ade3"),ft=(n("d3b7"),"USER_REQUEST"),jt="USER_SUCCESS",gt="USER_ERROR",Ot={token:localStorage.getItem("jwt")||"",status:"",profile:{},hasLoadedOnce:!1},ht={isAuthenticated:function(e){return!!e.token},authStatus:function(e){return e.status},getProfile:function(e){return e.profile}},vt=(ut={},Object(mt["a"])(ut,q,(function(e,t){var n=e.commit;return new Promise((function(e,r){n(q),Q()({url:"".concat(F,"/auth/local"),data:t,method:"POST"}).then((function(t){localStorage.setItem("user",JSON.stringify(t.data.user)),localStorage.setItem("jwt",t.data.jwt),Q.a.defaults.headers.common["Authorization"]=t.data.token,n(V,t.data),n(jt,t.data.user),e(t)})).catch((function(e){n(M,e),localStorage.removeItem("user-token"),r(e)}))}))})),Object(mt["a"])(ut,J,(function(e){var t=e.commit;return new Promise((function(e){t(J),localStorage.removeItem("user-token"),e()}))})),ut),wt=(dt={},Object(mt["a"])(dt,q,(function(e){e.status="loading"})),Object(mt["a"])(dt,V,(function(e,t){e.status="success",e.token=t.token,e.hasLoadedOnce=!0})),Object(mt["a"])(dt,M,(function(e){e.status="error",e.hasLoadedOnce=!0})),Object(mt["a"])(dt,J,(function(e){e.token=""})),Object(mt["a"])(dt,ft,(function(e){e.status="loading"})),Object(mt["a"])(dt,jt,(function(e,t){e.status="success",e.profile=t})),Object(mt["a"])(dt,gt,(function(e){e.status="error"})),Object(mt["a"])(dt,J,(function(e){e.profile={}})),dt),xt={state:Ot,getters:ht,actions:vt,mutations:wt},yt=Object(pt["a"])({modules:{auth:xt}}),kt=(n("a766"),n("ecee")),St=n("c074"),Rt=n("ad3d");n("ba8c");n("ed18").config(),kt["c"].add(St["a"]),kt["c"].add(St["b"]),kt["c"].add(St["c"]),kt["c"].add(St["d"]),Object(r["d"])(y).use(yt).use(bt).component("font-awesome-icon",Rt["a"]).mount("#app")},"9c7f":function(e,t,n){e.exports=n.p+"img/logo.96c5e080.png"},a766:function(e,t,n){},ba8c:function(e,t,n){}});
//# sourceMappingURL=app.71cf2756.js.map