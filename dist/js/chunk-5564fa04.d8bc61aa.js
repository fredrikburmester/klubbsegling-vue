(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5564fa04"],{"5b65":function(t,e,a){"use strict";a("dae8")},c66d:function(t,e,a){"use strict";a.r(e);a("b0c0");var n=a("7a23"),o={class:"wrapper"},c={key:0,class:"p-6 h-full text-left relative min-height-inherit pb-20"},r={class:"card-title text-2xl"},s=Object(n["h"])("h1",{class:"mt-4 font-bold z-0"},"Mina Båtar",-1),i={class:"flex flex-col lg:flex-row"},l={class:"card card-side card-bordered overflow-x-auto"},u={key:0,class:"w-24 h-32 flex justify-center content-center"},b=Object(n["h"])("button",{class:"btn btn-lg border-0 btn-circle loading h-auto"},null,-1),d=[b],g={key:1},h=["src"],m={class:"card-body"},j={class:"stat-title"},f={class:"stat-value text-lg"};function O(t,e,a,b,O,p){var v=Object(n["C"])("router-link"),w=Object(n["C"])("AddBoatForm");return Object(n["v"])(),Object(n["g"])("div",o,[O.loading?Object(n["f"])("",!0):(Object(n["v"])(),Object(n["g"])("div",c,[Object(n["h"])("h2",r,Object(n["E"])(O.me.name),1),Object(n["h"])("p",null,Object(n["E"])(O.me.about||null),1),s,Object(n["h"])("div",i,[(Object(n["v"])(!0),Object(n["g"])(n["a"],null,Object(n["A"])(O.userBoats,(function(t){return Object(n["v"])(),Object(n["g"])("div",{key:t.id,class:"w-full shadow stats mt-4 h-32 lg:mr-4"},[Object(n["k"])(v,{to:"/profile/boat/".concat(t.id)},{default:Object(n["L"])((function(){return[Object(n["h"])("div",l,[O.imageLoading?(Object(n["v"])(),Object(n["g"])("div",u,d)):Object(n["f"])("",!0),p.getBoatImage(t)?(Object(n["v"])(),Object(n["g"])("figure",g,[Object(n["M"])(Object(n["h"])("img",{class:"h-32",src:p.getBoatImage(t),onLoad:e[0]||(e[0]=function(){return p.imageLoaded&&p.imageLoaded.apply(p,arguments)})},null,40,h),[[n["I"],!O.imageLoading]])])):Object(n["f"])("",!0),Object(n["h"])("div",m,[Object(n["h"])("div",j,Object(n["E"])(p.getOwnerName(t)),1),Object(n["h"])("div",f,Object(n["E"])(t.name),1)])])]})),_:2},1032,["to"])])})),128))]),Object(n["k"])(w,{class:"mt-4",userboats:O.userBoats,onNewBoat:p.onNewBoat},null,8,["userboats","onNewBoat"]),Object(n["h"])("button",{id:"logout",class:"btn btn-error absolute bottom-6 px-6",onClick:e[1]||(e[1]=function(){return p.logout&&p.logout.apply(p,arguments)})}," Logga ut ")]))])}a("99af");var p=a("d017"),v=a("826e"),w={class:"flex space-x-4 mb-4 m-0"},B=Object(n["h"])("label",{for:"register-modal",class:"btn btn-primary text-base-content modal-button"}," Lägg till båt ",-1),x=Object(n["h"])("input",{id:"register-modal",type:"checkbox",class:"modal-toggle"},null,-1),y={class:"modal m-0"},k={class:"modal-box m-0"},L=Object(n["h"])("p",null,"Välj båt att lägga till:",-1),N=Object(n["h"])("option",{disabled:"",value:"Välj båt"},"Välj båt",-1),A=["value"],$={class:"modal-action flex justify-start"},I=Object(n["h"])("label",{for:"register-modal",class:"btn"},"Avbryt",-1);function J(t,e,a,o,c,r){return Object(n["v"])(),Object(n["g"])("div",w,[B,x,Object(n["h"])("div",y,[Object(n["h"])("div",k,[L,Object(n["h"])("div",null,[Object(n["M"])(Object(n["h"])("select",{"onUpdate:modelValue":e[0]||(e[0]=function(t){return c.selectedBoat=t}),class:"select select-bordered select w-full max-w-xs mt-4"},[N,(Object(n["v"])(!0),Object(n["g"])(n["a"],null,Object(n["A"])(c.allBoats,(function(t){return Object(n["v"])(),Object(n["g"])("option",{key:t.id,value:t},Object(n["E"])(t.name),9,A)})),128))],512),[[n["G"],c.selectedBoat]])]),Object(n["h"])("div",$,[Object(n["h"])("label",{for:"register-modal",class:"btn btn-primary",onClick:e[1]||(e[1]=function(){return r.addBoat&&r.addBoat.apply(r,arguments)})},"Lägg till"),I])])])])}var S=a("1da1"),E=(a("96cf"),a("d3b7"),a("bc3a")),C=a.n(E),R=a("98a0"),V=(a("c4bb"),function(){var t=Object(S["a"])(regeneratorRuntime.mark((function t(e,a,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,o){var c=JSON.parse(JSON.stringify(e));for(var r in c)if(c[r].id===a.id)return o("Du har redan den här båten."),!1;try{var s=[];0!==e.length&&(s=JSON.parse(JSON.stringify(e))),s.push(a);var i={Authorization:"Bearer ".concat(localStorage.getItem("jwt"))},l={boats:s};C.a.put("".concat(p["a"],"/users/").concat(n.id),l,{headers:i}).then((function(e){t(a)})).catch((function(t){o("Någonting gick snett.")}))}catch(u){o("Någonting gick snett.")}})));case 1:case"end":return t.stop()}}),t)})));return function(e,a,n){return t.apply(this,arguments)}}()),z={name:"AddBoatForm",props:{userboats:{type:Array,required:!0}},emits:["boats"],data:function(){return{userBoats:this.userboats,allBoats:[],selectedBoat:"",me:this.$store.getters.getProfile}},mounted:function(){var t=this;return Object(S["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.a.get("".concat(p["a"],"/boats"),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("jwt"))}});case 3:a=e.sent,t.allBoats=a.data,t.selectedBoat=t.allBoats[0],e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},methods:{addBoat:function(){var t=this;V(this.userBoats,this.selectedBoat,this.me).then((function(e){Object(R["a"])("".concat(e.name," tillagd!"),{type:"success",timeout:3e3,position:"top-right"}),t.$emit("newBoat",e)})).catch((function(t){Object(R["a"])(t,{type:"danger",timeout:3e3,position:"top-right"})}))}}},F=a("d959"),M=a.n(F);const P=M()(z,[["render",J]]);var U=P,q={components:{AddBoatForm:U},data:function(){return{me:this.$store.getters.getProfile,loading:!0,userBoats:[],imageLoading:!0}},mounted:function(){var t=this;Object(v["a"])(this.me).then((function(e){t.userBoats=e,t.loading=!1}))},methods:{logout:function(){var t=this;this.$store.dispatch(p["c"]).then((function(){null!=t.$route.params.nextUrl?t.$router.push(t.$route.params.nextUrl):t.$router.push("/")}))},onNewBoat:function(t){this.userBoats.push(t)},getOwnerName:function(t){return t.owner?t.owner.name:"No owner"},getBoatImage:function(t){return t.image?"".concat(p["a"]).concat(t.image.url):(this.imageLoading=!1,null)},imageLoaded:function(){this.imageLoading=!1}}};a("5b65");const D=M()(q,[["render",O]]);e["default"]=D},dae8:function(t,e,a){}}]);
//# sourceMappingURL=chunk-5564fa04.d8bc61aa.js.map