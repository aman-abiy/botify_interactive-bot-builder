(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-031edcf5"],{"07ac":function(t,e,a){var r=a("23e7"),c=a("6f53").values;r({target:"Object",stat:!0},{values:function(t){return c(t)}})},"08af":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{staticClass:"navbar navbar-expand-lg fixed-top"},[a("div",{staticClass:"collapse navbar-collapse container",attrs:{id:"navbarSupportedContent"}},[a("ul",{staticClass:"navbar-nav offset-lg-11"},[a("li",{},[a("span",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[t._v(t._s(t.deleteThis))]),a("a",{staticClass:"btn delete-btn",attrs:{tabindex:"-1","aria-disabled":"true"},on:{click:function(e){return t.deleteBot(t.deleteThis)}}},[t._v("Delete")])])])])])},c=[],s=(a("b64b"),{props:{botsToDelete:Object},computed:{deleteThis:function(){for(var t=[],e=0;e<Object.keys(this.botsToDelete).length;e++)1==this.botsToDelete[Object.keys(this.botsToDelete)[e]]&&t.push(Object.keys(this.botsToDelete)[e]);return t}},methods:{deleteBot:function(t){this.$store.dispatch("deleteQuery",t)}}}),i=s,n=(a("5073"),a("2877")),o=Object(n["a"])(i,r,c,!1,null,"cd2611e6",null);e["a"]=o.exports},2532:function(t,e,a){"use strict";var r=a("23e7"),c=a("5a34"),s=a("1d80"),i=a("ab13");r({target:"String",proto:!0,forced:!i("includes")},{includes:function(t){return!!~String(s(this)).indexOf(c(t),arguments.length>1?arguments[1]:void 0)}})},"2b01":function(t,e,a){"use strict";var r=a("331b"),c=a.n(r);c.a},"331b":function(t,e,a){},"44e7":function(t,e,a){var r=a("861d"),c=a("c6b6"),s=a("b622"),i=s("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==c(t))}},5073:function(t,e,a){"use strict";var r=a("c5eb"),c=a.n(r);c.a},"5a34":function(t,e,a){var r=a("44e7");t.exports=function(t){if(r(t))throw TypeError("The method doesn't accept regular expressions");return t}},"6f53":function(t,e,a){var r=a("83ab"),c=a("df75"),s=a("fc6a"),i=a("d1e7").f,n=function(t){return function(e){var a,n=s(e),o=c(n),l=o.length,d=0,u=[];while(l>d)a=o[d++],r&&!i.call(n,a)||u.push(t?[a,n[a]]:n[a]);return u}};t.exports={entries:n(!0),values:n(!1)}},ab13:function(t,e,a){var r=a("b622"),c=r("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(a){try{return e[c]=!1,"/./"[t](e)}catch(r){}}return!1}},b64b:function(t,e,a){var r=a("23e7"),c=a("7b0b"),s=a("df75"),i=a("d039"),n=i((function(){s(1)}));r({target:"Object",stat:!0,forced:n},{keys:function(t){return s(c(t))}})},c5eb:function(t,e,a){},c6c1:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[Object.values(this.checkboxArray).includes(!0)?a("navbarDelete",{attrs:{botsToDelete:t.checkboxArray}}):a("navbar"),a("br"),a("br"),a("br"),a("br"),a("div",{staticClass:"container"},t._l(t.allBots.data,(function(e){return a("div",{key:t.allBots.data._id},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-12 col-md-12 col-sm-12"},[a("div",{staticClass:"card text-center"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-1"},[a("div",{staticClass:"form-check form-check-inline"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.checkboxArray[e._id],expression:"checkboxArray[bot._id]"}],staticClass:"form-check-input",attrs:{id:e._id,type:"checkbox",id:"inlineCheckbox1"},domProps:{checked:Array.isArray(t.checkboxArray[e._id])?t._i(t.checkboxArray[e._id],null)>-1:t.checkboxArray[e._id]},on:{change:function(a){var r=t.checkboxArray[e._id],c=a.target,s=!!c.checked;if(Array.isArray(r)){var i=null,n=t._i(r,i);c.checked?n<0&&t.$set(t.checkboxArray,e._id,r.concat([i])):n>-1&&t.$set(t.checkboxArray,e._id,r.slice(0,n).concat(r.slice(n+1)))}else t.$set(t.checkboxArray,e._id,s)}}})])]),a("div",{staticClass:"col-lg-4"},[t._v(" "+t._s(e.title.charAt(0).toUpperCase()+e.title.slice(1))+" ")]),a("div",{staticClass:"col-lg-2"},[t._v(" Status ")]),a("div",{staticClass:"col-lg-2"},[t._v(" "+t._s(e.combined.length)+" Chats ")]),a("div",{staticClass:"col-lg-2"},[a("router-link",{attrs:{to:{name:"BotDetail",params:{botId:e._id}}}},[t._v("more")])],1)])])])])])})),0)],1)},c=[],s=(a("caad"),a("07ac"),a("2532"),a("08af")),i=a("9d8d"),n=a("076e"),o={title:"My Bots",data:function(){return{checkboxArray:this.fillCheckboxArray()}},components:{navbar:i["a"],navbarDelete:s["a"],footer:n["a"]},computed:{allBots:function(){return this.$store.getters.allQueries}},methods:{fillCheckboxArray:function(){var t=this.$store.getters.allQueries.data,e={};for(var a in t)e[t[a]._id]=!1;return e}},created:function(){this.$store.dispatch("getAllQueries"),this.fillCheckboxArray(),console.log("res",Object.values(this.checkboxArray).includes(!0))}},l=o,d=(a("2b01"),a("2877")),u=Object(d["a"])(l,r,c,!1,null,"5ac2498e",null);e["default"]=u.exports},caad:function(t,e,a){"use strict";var r=a("23e7"),c=a("4d64").includes,s=a("44d2"),i=a("ae40"),n=i("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:!n},{includes:function(t){return c(this,t,arguments.length>1?arguments[1]:void 0)}}),s("includes")}}]);
//# sourceMappingURL=chunk-031edcf5.af0d4574.js.map