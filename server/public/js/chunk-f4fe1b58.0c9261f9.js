(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f4fe1b58"],{"06e5":function(t,e,n){t.exports=n.p+"img/untitled5.1b30f74c.png"},"0d0a":function(t,e,n){t.exports=n.p+"img/untitled2.db8d594e.png"},"0e92":function(t,e,n){t.exports=n.p+"img/typing-bubble.ebd1e743.gif"},2313:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[[o("offline",{on:{"detected-condition":t.handleConnectivityChange}})],t.query[0].status?o("div",{class:[t.theme("dark-theme-bckgrnd","light-theme-bckgrnd"),"container-fluid"]},[o("div",{staticClass:"row"},[t._m(0),o("div",{class:[t.theme("dark-theme-chat-bckgrnd","light-theme-chat-bckgrnd"),"chat-container col-lg-4 col-md-12 col-sm-12"]},[t._l(t.children,(function(e,r){return[o(e,{key:e.name,tag:"component",attrs:{replyBot:t.children,query:t.botQueries[r],component:t.botQueries[r]?t.botQueries[t.goToTier[r]-1].components[t.goToComp[r]-1]:null},on:{selectedOption:function(e){return t.btnGoToNext(e)},forInput:function(e){t.forInputValues=e},hasConvoEnded:function(e){t.hasConvoEnded=e}}}),t.response[r]?o("div",{staticClass:"row reply-user"},[o("div",{staticClass:"card-container"},[o("div",{class:[t.theme("dark-theme-chat-bubble-user","light-theme-chat-bubble-user"),"card"]},[o("p",[t._v(t._s(t.response[r].optionValue?t.response[r].optionValue:t.response[r].textValue))])])]),o("img",{attrs:{src:n("341f"),alt:""}})]):t._e(),o("br"),o("br"),o("br")]})),t.showBotIsTyping?o("div",{staticClass:"row reply-bot"},[o("img",{attrs:{src:n("06e5"),alt:""}}),t._m(1)]):t._e()],2)]),t.showConvoEndedMsg?o("div",{staticClass:"convo-ended-msg col-lg-4 col-md-12 col-sm-12 offset-lg-4"},[o("p",{staticClass:"text-center"},[t._v("Conversation Ended")])]):t._e(),o("div",{staticClass:"inputs col-lg-4 col-md-12 col-sm-12 offset-lg-4"},[o("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var n=e.handleSubmit;return["{}"===JSON.stringify(t.forInputValues)||t.showConvoEndedMsg?t._e():o("form",{staticClass:"row",on:{submit:function(e){return e.preventDefault(),n(t.inputGoToNext)}}},[o("div",{staticClass:"col-10",staticStyle:{padding:"0px"}},[o("ValidationProvider",{attrs:{rules:"Number"===t.forInputValues.option._inputMeta._dataType?"integer":"Email"===t.forInputValues.option._inputMeta._dataType?"email":"",mode:"lazy"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.errors;return[o("span",{staticClass:"error-msg"},[t._v(t._s(n[0]))]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.textValue,expression:"textValue"}],class:[t.theme("dark-theme-input","light-theme-input"),"form-control col-12 rounded-0"],attrs:{type:"text",id:"validationDefaultUsername",required:""},domProps:{value:t.textValue},on:{input:function(e){e.target.composing||(t.textValue=e.target.value)}}})]}}],null,!0)})],1),o("div",{staticClass:"col-2",staticStyle:{padding:"0px"}},[o("button",{staticClass:"btn btn-primary",attrs:{type:"submit",id:"inputGroupPrepend2"}},[t._v("Send")])])])]}}],null,!1,2498536737)})],1)]):t._e(),t.query[0].status?t._e():o("div",{staticClass:"status-err"},[t._m(2)])],2)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-lg-4 d-none d-lg-block"},[n("a",{staticClass:"navbar-brand",attrs:{href:"#"}},[t._v("botapp.com")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"card-container"},[o("img",{staticStyle:{"border-radius":"0px 15px 15px 15px"},attrs:{src:n("0e92"),alt:""}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("div",{staticClass:"chat-container col-lg-4 col-md-12 col-sm-12 offset-lg-4"},[n("br"),n("p",{staticClass:"status-err-msg"},[t._v("This bot has been either been disabled by owner or has expired and been shut down")])])])}],s=(n("4160"),n("159b"),n("5530")),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.component?n("div",[n("div",{staticClass:"row reply-bot"},[n("img",{attrs:{src:["none"===t.queryData[0].avatar?t.getAvatarImg("untitled2.png"):t.getAvatarImg(t.queryData[0].avatar)],alt:""}}),n("div",{staticClass:"card-container"},[n("div",{class:[t.theme("dark-theme-chat-bubble-bot","light-theme-chat-bubble-bot"),"card"]},[n("p",[t._v(t._s(t.component.query))])]),t._l(t.component.options,(function(e,o){return[e._inputMeta?t._e():n("a",{class:["dark"===t.queryData[0].theme?"dark-theme-chat-btns":"light-theme-chat-btns","btn"],on:{click:function(n){return t.emitOptionSelected(t.query.tier,t.component._meta,e,e.text)}}},[t._v(t._s(e.text))])]}))],2)]),n("br")]):t._e()},a=[],u=(n("96cf"),n("1da1")),c={props:{replyBot:Array,query:Object,component:Object},data:function(){return{optionValue:null,index:1,botQueries:[],response:[],goToComp:1,queryData:null}},computed:{queryDatas:function(){return this.$store.getters.botQuery}},watch:{component:{immediate:!0,deep:!0,handler:function(t){try{if(t.options[0]||this.$emit("hasConvoEnded",!0),null!=t.options[0]._inputMeta){var e={tierNumber:this.query.tier,meta:this.component._meta,option:this.component.options[0],selectedValue:this.component.options[0].text};this.$emit("forInput",e),e={}}}catch(n){console.log("Der is som error")}}},queryDatas:{handler:function(t){t&&(this.queryData=t)}}},methods:{emitForInput:function(t,e,n,o){this.$emit("forInput",{tierNumber:t,meta:e,option:n,selectedValue:o})},emitOptionSelected:function(t,e,n,o){this.$emit("selectedOption",{tierNumber:t,meta:e,option:n,selectedValue:o})},getAvatarImg:function(t){return n("9210")("./"+t)},theme:function(t,e){return"dark"==this.queryData[0].theme?t:e}},created:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("getBotQuery",t.$route.params.id);case 2:case"end":return e.stop()}}),e)})))()}},l=c,p=(n("9c0d"),n("2877")),d=Object(p["a"])(l,i,a,!1,null,"56df5372",null),h=d.exports,m=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[t.response[t.response.length-1]?o("div",{staticClass:"row reply-user"},[o("div",{staticClass:"card-container"},[o("div",{staticClass:"card"},[o("p",[t._v(t._s(t.response[t.response.length-1].optionValue?t.response[t.response.length-1].optionValue:null))])])]),o("img",{attrs:{src:n("0d0a"),alt:""}})]):t._e(),o("br"),o("br"),o("br")])},f=[],g={},b=g,_=Object(p["a"])(b,m,f,!1,null,"7510b1af",null),v=(_.exports,n("05fb")),y=n("7bb1"),x=n("4c93");Object(y["c"])("integer",Object(s["a"])(Object(s["a"])({},x["integer"]),{},{message:"A numeric value is required"})),Object(y["c"])("email",Object(s["a"])(Object(s["a"])({},x["email"]),{},{message:"Ooops! That not a valid email"}));var V={title:"Bot",components:{offline:v["default"]},data:function(){return{children:[h],showBotIsTyping:!1,textValue:null,optionValue:null,index:1,botQueries:[],response:[],goToTier:[1],goToComp:[1],hasConvoEnded:!1,forInputValues:{},showConvoEndedMsg:!1}},computed:{query:function(){return this.$store.getters.botQuery},firstTier:function(){return this.$store.getters.botQuery}},watch:{hasConvoEnded:{handler:function(t){t&&(this.$store.dispatch("addResponse",{queryId:this.$route.params.id,data:this.response}),this.showConvoEndedMsg=!0)}}},methods:{inputGoToNext:function(){var t=this;try{var e=!1;if(this.response[0]&&(this.response.forEach((function(n){n._path._curr.tier==t.forInputValues.tierNumber&&(console.log(n._path._curr.tier,t.forInputValues.tierNumber),e=!0)})),e))return}catch(n){console.log("ERRRRRRRRROR")}if("{}"!==JSON.stringify(this.forInputValues)){if(""==this.textValue||null==this.textValue)return void this.$toast.info("Please fill in ".concat(this.forInputValues.selectedValue),{duration:2e3,position:"top-right"});this.response.push({tier:this.forInputValues.tierNumber,_hasTextInput:this.forInputValues.meta._textInput,_hasOptionInput:this.forInputValues.meta._optionInput,selected_opt:this.forInputValues.option.opt,textValue:this.textValue,optionValue:this.forInputValues.meta._optionInput?this.forInputValues.selectedValue:null,_path:{_curr:{tier:this.forInputValues.tierNumber,comp:1},_sentTo:{tier:this.forInputValues.option._goTo.tier,comp:this.forInputValues.option._goTo.comp}}}),this.showBotIsTyping=!0,setTimeout((function(){t.botQueries.push(t.$store.getters.botQuery[0].query_data[0][0].tiers[t.forInputValues.tierNumber]),t.children.push(h),t.goToTier.push(t.forInputValues.option._goTo.tier),t.goToComp.push(t.forInputValues.option._goTo.comp),t.forInputValues={},t.textValue=null,t.showBotIsTyping=!1}),1e3)}},btnGoToNext:function(t){var e=this;try{var n=!1;if(this.response[0]&&(this.response.forEach((function(e){e._path._curr.tier==t.tierNumber&&(console.log(e._path._curr.tier,t.tierNumber),n=!0)})),n))return}catch(o){}this.response.push({tier:t.tierNumber,_hasTextInput:t.meta._textInput,_hasOptionInput:t.meta._optionInput,selected_opt:t.option.opt,textValue:t.meta._textInput?t.selectedValue:null,optionValue:t.meta._optionInput?t.selectedValue:null,_path:{_curr:{tier:t.tierNumber,comp:1},_sentTo:{tier:t.option._goTo.tier,comp:t.option._goTo.comp}}}),this.showBotIsTyping=!0,setTimeout((function(){e.botQueries.push(e.$store.getters.botQuery[0].query_data[0][0].tiers[t.tierNumber]),e.children.push(h),e.goToTier.push(t.option._goTo.tier),e.goToComp.push(t.option._goTo.comp),e.showBotIsTyping=!1}),1e3)},theme:function(t,e){return"dark"==this.query[0].theme?t:e},handleConnectivityChange:function(t){t&&this.$toast.open("You are back online",{duration:1e4}),t||this.$toast.error("You are offline",{duration:6e4})}},created:function(){var t=this;this.$store.dispatch("getBotQuery",this.$route.params.id).then((function(){t.botQueries.push(t.$store.getters.botQuery[0].query_data[0][0].tiers[0])}))}},I=V,C=(n("c9e9"),Object(p["a"])(I,o,r,!1,null,"aac72328",null));e["default"]=C.exports},2495:function(t,e,n){},"341f":function(t,e,n){t.exports=n.p+"img/chat-profile-icon2.872f56dc.png"},4797:function(t,e,n){t.exports=n.p+"img/untitled7.6d9af905.png"},9210:function(t,e,n){var o={"./untitled.png":"fe8a","./untitled2.png":"0d0a","./untitled3.png":"ef28","./untitled4.png":"f699","./untitled5.png":"06e5","./untitled6.png":"abf2","./untitled7.png":"4797"};function r(t){var e=s(t);return n(e)}function s(t){if(!n.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}r.keys=function(){return Object.keys(o)},r.resolve=s,t.exports=r,r.id="9210"},"9c0d":function(t,e,n){"use strict";var o=n("2495"),r=n.n(o);r.a},abf2:function(t,e,n){t.exports=n.p+"img/untitled6.0820be30.png"},c9e9:function(t,e,n){"use strict";var o=n("ce18"),r=n.n(o);r.a},ce18:function(t,e,n){},ef28:function(t,e,n){t.exports=n.p+"img/untitled3.55be89d2.png"},f699:function(t,e,n){t.exports=n.p+"img/untitled4.a9ea7fa5.png"},fe8a:function(t,e,n){t.exports=n.p+"img/untitled.611f6885.png"}}]);
//# sourceMappingURL=chunk-f4fe1b58.0c9261f9.js.map