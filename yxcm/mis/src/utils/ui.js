import $ from "jquery"
import toastr from "../lib/toastr"

Object.assign(toastr.options, {
    timeOut: 5000,
    showMethod: 'slideDown',
    hideMethod: 'slideUp',
    positionClass: "toast-top-center"
});


let showLogin = false;
const isPro = window.location.href.indexOf('bikan.qq.com') > -1;
let redirectUri = encodeURIComponent("/mis/");
function showWxLogin() {
    showLogin = true;
    $('body').append(`<div style="position: fixed;top:0;left:0;right:0;bottom:0;background: #fff;z-index: 100;">
<div id="login_container" style="width:200px;height:200px;position: fixed;top:30%;left:50%;transform:translate(-50%,-50%)"></div>
</div> `);
    let obj = new window.WxLogin({
        self_redirect: false,
        id: "login_container",
        appid:  isPro ? "wx9d6a77eeec935a19" : "wx25132a15f53f8c83",
        scope: "snsapi_login",
        redirect_uri: isPro ? "http://bikan.qq.com/login/_tYYs_open_mis_wx_L" : `http://atest.yk.qq.com/login/_tYYs_open_mis_wx_L?redirect=${redirectUri}`,
        state: ""
    });
}
let ui = {
    showWxLogin,
    toast(type, msg){
        toastr[type](msg);
    }
}
export default ui;