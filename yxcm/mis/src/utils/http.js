import util from "./util"
import StaticCommonConst from "./StaticCommonConst"
import CSRFToken from "./CSRFToken"
import { GraphQLClient } from "graphql-request"
import ui from "./ui"
import CryptoJS from "crypto-js"
import { accessKey, secretKey } from "./UploadKey"

const sessionId = util.getCookie(StaticCommonConst.COOKIE_NAMES.MIS.SESSION_ID);
const gtk = CSRFToken(sessionId);
const JwtToken = util.getCookie(StaticCommonConst.COOKIE_NAMES.MIS.JWT_TOKEN_NAME);

let loading = document.getElementById("loading");
function showLoading(needLoading) {
    if(needLoading) loading.style.display = "";
    else loading.style.display = "none";
}

const client = new GraphQLClient('/api/mis', {
    headers: {
        Authorization: JwtToken,
        gtk
    }
});

let http = {};

showLoading(false);
http.post = function(action,params,needLoading = true) {
    showLoading(needLoading);
    return new Promise((reslove,reject) => {
        client.request(action,params).then(data => {
                reslove(data);
                showLoading(false)
        }).catch(error => {
            let _errors = JSON.parse(JSON.stringify(error));
            const { errors } = _errors.response;
            showLoading(false);
            if(errors && errors.length > 0) {
                try {
                    let message = JSON.parse(errors[0].message);
                    console.log("RetMsgMap",StaticCommonConst.RetMsgMap)
                    if(message.ret == -3) {      //未登录
                        // ui.toast("error","请重新登录");
                        window.location.replace("#/login")
                    }else{    
                        ui.toast("error",message.msg);
                    }
                } catch (error) {
                    console.log("error1",error);
                    ui.toast("error",error.message);
                }
            }
        })
    })
}

/**
 * 生成uptoken
 *
*/
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
function safe64(base64) {
    base64 = base64.replace(/\+/g, "-");
    base64 = base64.replace(/\//g, "_");
    return base64;
}

const putPolicy = {
    "scope": "yxcm",
    "deadline": 1605064271
}
//将上传策略序列化成为JSON：
const put_policy = JSON.stringify(putPolicy)

const encoded = btoa(utf16to8(put_policy));

let hash = CryptoJS.HmacSHA1(encoded, secretKey);

let encoded_signed = hash.toString(CryptoJS.enc.Base64);

let upload_token = accessKey + ":" + safe64(encoded_signed) + ":" + encoded;
http.token = upload_token;

export default http