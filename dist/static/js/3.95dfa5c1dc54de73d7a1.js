webpackJsonp([3],{EINl:function(n,t,e){var i=e("JT3B");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("21798422",i,!0)},JT3B:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n.login-container[data-v-5b375c4b] {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  background-color: #2d3a4b;\n}\n.login-container .login-form[data-v-5b375c4b] {\n    position: absolute;\n    left: 0;\n    right: 0;\n    width: 520px;\n    padding: 35px 35px 15px 35px;\n    margin: 120px auto;\n}\n.login-container .tips[data-v-5b375c4b] {\n    font-size: 14px;\n    color: #fff;\n    margin-bottom: 10px;\n}\n.login-container .tips span[data-v-5b375c4b]:first-of-type {\n      margin-right: 16px;\n}\n.login-container .svg-container[data-v-5b375c4b] {\n    padding: 6px 5px 6px 15px;\n    color: #889aa4;\n    vertical-align: middle;\n    width: 30px;\n    display: inline-block;\n}\n.login-container .svg-container_login[data-v-5b375c4b] {\n      font-size: 20px;\n}\n.login-container .title-container[data-v-5b375c4b] {\n    position: relative;\n}\n.login-container .title-container .title[data-v-5b375c4b] {\n      font-size: 26px;\n      font-weight: 400;\n      color: #eee;\n      margin: 0px auto 40px auto;\n      text-align: center;\n      font-weight: bold;\n}\n.login-container .title-container .set-language[data-v-5b375c4b] {\n      color: #fff;\n      position: absolute;\n      top: 5px;\n      right: 0px;\n}\n.login-container .show-pwd[data-v-5b375c4b] {\n    position: absolute;\n    right: 10px;\n    top: 7px;\n    font-size: 16px;\n    color: #889aa4;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.login-container .thirdparty-button[data-v-5b375c4b] {\n    position: absolute;\n    right: 35px;\n    bottom: 28px;\n}\n",""])},PbBS:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n.social-signup-container[data-v-3b0e1e21] {\n  margin: 20px 0;\n}\n.social-signup-container .sign-btn[data-v-3b0e1e21] {\n    display: inline-block;\n    cursor: pointer;\n}\n.social-signup-container .icon[data-v-3b0e1e21] {\n    color: #fff;\n    font-size: 30px;\n    margin-top: 6px;\n}\n.social-signup-container .wx-svg-container[data-v-3b0e1e21],\n  .social-signup-container .qq-svg-container[data-v-3b0e1e21] {\n    display: inline-block;\n    width: 40px;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    padding-top: 1px;\n    border-radius: 4px;\n    margin-bottom: 20px;\n    margin-right: 5px;\n}\n.social-signup-container .wx-svg-container[data-v-3b0e1e21] {\n    background-color: #8dc349;\n}\n.social-signup-container .qq-svg-container[data-v-3b0e1e21] {\n    background-color: #6BA2D6;\n    margin-left: 50px;\n}\n",""])},QRwO:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n.international-icon[data-v-f2da04d6] {\r\n  font-size: 20px;\r\n  cursor: pointer;\r\n  vertical-align: -5px!important;\n}\r\n",""])},"T+/8":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={render:function(){var n=this.$createElement,t=this._self._c||n;return t("el-dropdown",{staticClass:"international",attrs:{trigger:"click"},on:{command:this.handleSetLanguage}},[t("div",[t("svg-icon",{attrs:{"class-name":"international-icon","icon-class":"language"}})],1),this._v(" "),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",{attrs:{command:"zh",disabled:"zh"===this.language}},[this._v("中文")]),this._v(" "),t("el-dropdown-item",{attrs:{command:"en",disabled:"en"===this.language}},[this._v("English")])],1)],1)},staticRenderFns:[]};function o(n,t,e,i){var o=void 0!==window.screenLeft?window.screenLeft:screen.left,a=void 0!==window.screenTop?window.screenTop:screen.top,s=(window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width)/2-e/2+o,r=(window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height)/2-i/2+a,c=window.open(n,t,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width="+e+", height="+i+", top="+r+", left="+s);window.focus&&c.focus()}var a={name:"social-signin",methods:{wechatHandleClick:function(n){this.$store.commit("SET_AUTH_TYPE",n);o("https://open.weixin.qq.com/connect/qrconnect?appid=xxxxx&redirect_uri="+encodeURIComponent("xxx/redirect?redirect="+window.location.origin+"/authredirect")+"&response_type=code&scope=snsapi_login#wechat_redirect",n,540,540)},tencentHandleClick:function(n){this.$store.commit("SET_AUTH_TYPE",n);o("https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=xxxxx&redirect_uri="+encodeURIComponent("xxx/redirect?redirect="+window.location.origin+"/authredirect"),n,540,540)}}},s={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"social-signup-container"},[e("div",{staticClass:"sign-btn",on:{click:function(t){n.wechatHandleClick("wechat")}}},[e("span",{staticClass:"wx-svg-container"},[e("svg-icon",{staticClass:"icon",attrs:{"icon-class":"wechat"}})],1),n._v(" 微信\n  ")]),n._v(" "),e("div",{staticClass:"sign-btn",on:{click:function(t){n.tencentHandleClick("tencent")}}},[e("span",{staticClass:"qq-svg-container"},[e("svg-icon",{staticClass:"icon",attrs:{"icon-class":"qq"}})],1),n._v(" QQ\n  ")])])},staticRenderFns:[]};var r={components:{LangSelect:e("VU/8")({computed:{language:function(){return this.$store.getters.language}},methods:{handleSetLanguage:function(n){this.$i18n.locale=n,this.$store.dispatch("setLanguage",n),this.$message({message:"switch language success",type:"success"})}}},i,!1,function(n){e("egqb")},"data-v-f2da04d6",null).exports,SocialSign:e("VU/8")(a,s,!1,function(n){e("sEjN")},"data-v-3b0e1e21",null).exports},name:"login",data:function(){return{loginForm:{username:"admin",password:"1111111"},loginRules:{username:[{required:!0,trigger:"blur",validator:function(n,t,e){["admin","editor"].indexOf(t.trim())>=0?e():e(new Error("Please enter the correct user name"))}}],password:[{required:!0,trigger:"blur",validator:function(n,t,e){t.length<6?e(new Error("The password can not be less than 6 digits")):e()}}]},passwordType:"password",loading:!1,showDialog:!1}},methods:{showPwd:function(){"password"===this.passwordType?this.passwordType="":this.passwordType="password"},handleLogin:function(){var n=this;this.$refs.loginForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;n.loading=!0,n.$store.dispatch("LoginByUsername",n.loginForm).then(function(){n.loading=!1,n.$router.push({path:"/"})}).catch(function(){n.loading=!1})})}},created:function(){},destroyed:function(){}},c={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"login-container"},[e("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{autoComplete:"on",model:n.loginForm,rules:n.loginRules,"label-position":"left"}},[e("div",{staticClass:"title-container"},[e("h3",{staticClass:"title"},[n._v(n._s(n.$t("login.title")))]),n._v(" "),e("lang-select",{staticClass:"set-language"})],1),n._v(" "),e("el-form-item",{attrs:{prop:"username"}},[e("span",{staticClass:"svg-container svg-container_login"},[e("svg-icon",{attrs:{"icon-class":"user"}})],1),n._v(" "),e("el-input",{attrs:{name:"username",type:"text",autoComplete:"on",placeholder:"username"},model:{value:n.loginForm.username,callback:function(t){n.$set(n.loginForm,"username",t)},expression:"loginForm.username"}})],1),n._v(" "),e("el-form-item",{attrs:{prop:"password"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"password"}})],1),n._v(" "),e("el-input",{attrs:{name:"password",type:n.passwordType,autoComplete:"on",placeholder:"password"},nativeOn:{keyup:function(t){if(!("button"in t)&&n._k(t.keyCode,"enter",13,t.key))return null;n.handleLogin(t)}},model:{value:n.loginForm.password,callback:function(t){n.$set(n.loginForm,"password",t)},expression:"loginForm.password"}}),n._v(" "),e("span",{staticClass:"show-pwd",on:{click:n.showPwd}},[e("svg-icon",{attrs:{"icon-class":"eye"}})],1)],1),n._v(" "),e("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{type:"primary",loading:n.loading},nativeOn:{click:function(t){t.preventDefault(),n.handleLogin(t)}}},[n._v(n._s(n.$t("login.logIn")))]),n._v(" "),e("div",{staticClass:"tips"},[e("span",[n._v(n._s(n.$t("login.username"))+" : admin")]),n._v(" "),e("span",[n._v(n._s(n.$t("login.password"))+" : "+n._s(n.$t("login.any")))])]),n._v(" "),e("div",{staticClass:"tips"},[e("span",{staticStyle:{"margin-right":"18px"}},[n._v(n._s(n.$t("login.username"))+" : editor")]),n._v(" "),e("span",[n._v(n._s(n.$t("login.password"))+" : "+n._s(n.$t("login.any")))])]),n._v(" "),e("el-button",{staticClass:"thirdparty-button",attrs:{type:"primary"},on:{click:function(t){n.showDialog=!0}}},[n._v(n._s(n.$t("login.thirdparty")))])],1),n._v(" "),e("el-dialog",{attrs:{title:n.$t("login.thirdparty"),visible:n.showDialog,"append-to-body":""},on:{"update:visible":function(t){n.showDialog=t}}},[n._v("\n    "+n._s(n.$t("login.thirdpartyTips"))+"\n    "),e("br"),n._v(" "),e("br"),n._v(" "),e("br"),n._v(" "),e("social-sign")],1)],1)},staticRenderFns:[]};var l=e("VU/8")(r,c,!1,function(n){e("XqlV"),e("EINl")},"data-v-5b375c4b",null);t.default=l.exports},XqlV:function(n,t,e){var i=e("pGgZ");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("0ad10509",i,!0)},egqb:function(n,t,e){var i=e("QRwO");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("0d7f56a9",i,!0)},pGgZ:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"/* reset element-ui css */\n.login-container .el-input {\n  display: inline-block;\n  height: 47px;\n  width: 85%;\n}\n.login-container .el-input input {\n    background: transparent;\n    border: 0px;\n    -webkit-appearance: none;\n    border-radius: 0px;\n    padding: 12px 5px 12px 15px;\n    color: #eee;\n    height: 47px;\n}\n.login-container .el-input input:-webkit-autofill {\n      -webkit-box-shadow: 0 0 0px 1000px #2d3a4b inset !important;\n      -webkit-text-fill-color: #fff !important;\n}\n.login-container .el-form-item {\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  color: #454545;\n}\n",""])},sEjN:function(n,t,e){var i=e("PbBS");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("142dc86d",i,!0)}});