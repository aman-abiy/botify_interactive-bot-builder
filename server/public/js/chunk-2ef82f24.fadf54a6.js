(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ef82f24"],{8503:function(t,s,a){"use strict";a.r(s);var r=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[a("br"),a("br"),a("br"),a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-4 col-md-10 col-sm-12 offset-lg-4"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h5",{staticClass:"text-center"},[t._v("botapp.com")]),a("p",{staticClass:"text-center text-primary login-text"},[t._v("Reset Password")]),a("p",{staticClass:"text-center text-danger"},[t._v(t._s(t.authErrorMessage))]),a("br"),a("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(s){var r=s.handleSubmit;return[a("form",{on:{submit:function(s){return s.preventDefault(),r(t.resetPassword)}}},[a("div",{staticClass:"form-group"},[a("ValidationProvider",{attrs:{name:"password",rules:"required|min:8"},scopedSlots:t._u([{key:"default",fn:function(s){var r=s.errors;return[a("label",{attrs:{for:"exampleInputPassword1"}},[t._v("New Password")]),a("div",{staticClass:"input-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],ref:"passwordInput",staticClass:"form-control",attrs:{type:"password",name:"password",id:"password","data-toggle":"password"},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}}),a("div",{staticClass:"input-group-append",on:{click:function(s){return t.showPassword()}}},[a("span",{staticClass:"input-group-text"},[a("i",{staticClass:"fa fa-eye"})])])]),a("small",{staticClass:"form-text text-muted",attrs:{id:"emailHelp"}},[t._v(t._s(r[0]))])]}}],null,!0)})],1),a("div",{staticClass:"form-group"},[a("ValidationProvider",{attrs:{rules:"required|password:@password"},scopedSlots:t._u([{key:"default",fn:function(s){var r=s.errors;return[a("label",{attrs:{for:"Password-Confirmation"}},[t._v("Confirm Password")]),a("div",{staticClass:"input-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.confirmation,expression:"confirmation"}],ref:"passwordInputConfirmation",staticClass:"form-control",attrs:{type:"password",name:"password",id:"password","data-toggle":"password"},domProps:{value:t.confirmation},on:{input:function(s){s.target.composing||(t.confirmation=s.target.value)}}}),a("div",{staticClass:"input-group-append",on:{click:function(s){return t.showConfirmationPassword()}}},[a("span",{staticClass:"input-group-text"},[a("i",{staticClass:"fa fa-eye"})])])]),a("small",{staticClass:"form-text text-muted",attrs:{id:"emailHelp"}},[t._v(t._s(r[0]))])]}}],null,!0)})],1),a("button",{staticClass:"btn btn-primary col-12",attrs:{type:"submit"}},[t._v("Reset")])])]}}])}),a("br"),a("br"),a("br"),a("p",{staticClass:"text-center copyright"},[t._v(t._s((new Date).getFullYear())+" botapp.com")])],1)])])])])},e=[],o=(a("4160"),a("b64b"),a("159b"),a("5530")),n=a("7bb1"),i=a("4c93"),d={title:"Reset Password",data:function(){return{password:null,confirmation:null}},computed:{authErrorMessage:function(){return this.$store.getters.authErrorMessage}},methods:{showPassword:function(){var t=this.$refs.passwordInput;"password"===t.type?t.type="text":t.type="password"},showConfirmationPassword:function(){var t=this.$refs.passwordInputConfirmation;"password"===t.type?t.type="text":t.type="password"},resetPassword:function(){var t={password:this.password,token:this.$route.params.token};this.$store.dispatch("resetPassword",t)}}};Object.keys(i).forEach((function(t){Object(n["c"])(t,i[t])})),Object(n["c"])("min",{validate:function(t,s){return t.length>=s.length},message:"Password must be 8 or more characters",params:["length"]}),Object(n["c"])("required",Object(o["a"])(Object(o["a"])({},i["required"]),{},{message:"This field is required"})),Object(n["c"])("password",{params:["target"],validate:function(t,s){var a=s.target;return t===a},message:"Passwords do not match"});var c=d,p=(a("8669"),a("2877")),u=Object(p["a"])(c,r,e,!1,null,"81eac144",null);s["default"]=u.exports},8669:function(t,s,a){"use strict";var r=a("e61f"),e=a.n(r);e.a},e61f:function(t,s,a){}}]);
//# sourceMappingURL=chunk-2ef82f24.fadf54a6.js.map