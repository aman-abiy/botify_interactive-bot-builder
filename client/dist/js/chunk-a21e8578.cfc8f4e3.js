(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a21e8578"],{1479:function(t,e,a){},"184e":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("br"),a("br"),a("br"),a("br"),a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-4 col-md-10 col-sm-12 offset-lg-4"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h5",{staticClass:"text-center"},[t._v("botapp.com")]),a("p",{staticClass:"text-center text-primary login-text"},[t._v("Forgot Password")]),a("p",{staticClass:"text-center text-danger"},[t._v(t._s(t.forgotPasswordMessage))]),a("br"),a("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var s=e.handleSubmit;return[a("form",{on:{submit:function(e){return e.preventDefault(),s(t.sendEmail)}}},[a("div",{staticClass:"form-group"},[a("ValidationProvider",{attrs:{rules:"email|required",mode:"lazy"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"exampleInputEmail1"}},[t._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",id:"Email","aria-describedby":"emailHelp"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),a("small",{staticClass:"form-text text-muted",attrs:{id:"emailHelp"}},[t._v(t._s(s[0]))])]}}],null,!0)})],1),a("button",{staticClass:"btn btn-primary col-12",attrs:{type:"submit"}},[t._v("Send Email")])])]}}])}),a("br"),a("br"),a("br"),a("p",{staticClass:"text-center copyright"},[t._v(t._s((new Date).getFullYear())+" botapp.com")])],1)])])])])},r=[],i=(a("4160"),a("b64b"),a("159b"),a("5530")),o=a("7bb1"),n=a("4c93"),l={title:"Forgot Password",data:function(){return{email:null}},computed:{forgotPasswordMessage:function(){return this.$store.getters.forgotPasswordMessage}},methods:{sendEmail:function(){this.$store.dispatch("requestPasswordResetLink",this.email)}}};Object.keys(n).forEach((function(t){Object(o["c"])(t,n[t])})),Object(o["c"])("min",{validate:function(t,e){return t.length>=e.length},message:"Password must be 8 or more characters",params:["length"]}),Object(o["c"])("required",Object(i["a"])(Object(i["a"])({},n["required"]),{},{message:"This field is required"})),Object(o["c"])("password",{params:["target"],validate:function(t,e){var a=e.target;return t===a},message:"Passwords do not match"});var c=l,d=(a("36b1"),a("2877")),u=Object(d["a"])(c,s,r,!1,null,"09fd6844",null);e["default"]=u.exports},"36b1":function(t,e,a){"use strict";var s=a("1479"),r=a.n(s);r.a}}]);
//# sourceMappingURL=chunk-a21e8578.cfc8f4e3.js.map