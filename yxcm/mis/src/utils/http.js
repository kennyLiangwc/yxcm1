import util from "./util"
import ui from "./ui"
import CryptoJS from "crypto-js"
import { accessKey, secretKey } from "./UploadKey"



let loading = document.getElementById("loading");
function showLoading(needLoading) {
    if(needLoading) loading.style.display = "";
    else loading.style.display = "none";
}


let http = {};

showLoading(false);
http.post = function (action, params = {}, needLoading = true, showError = true) {
    return new Promise(function (resolve, reject) {
        showLoading(needLoading);
        let xhr = new XMLHttpRequest();
        xhr.timeout = 30000;
        xhr.open('POST', ` https://qydata.club/yxserver/${action}`);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let json = JSON.parse(xhr.responseText);
                if (json.result != 0) {
                    reject(json)
                } else {
                    json.data = json.data || {};
                    resolve(json.data);
                }
            } else {
                // 处理其他情况
                console.error(arguments);
                showError && ui.toast('error', '操作失败');
                reject()
            }
            showLoading(false);
        };
        xhr.onerror = function () {
            // 处理错误
            console.error('http error', arguments);
            showError && ui.toast('error', '操作失败');
            reject();
            showLoading(false);
        };
        xhr.ontimeout = function (e) {
            showError && ui.toast('error', '请求超时');
            showLoading(false);
            reject();
            console.log('timeout', e)
        };
        let sendData = JSON.stringify(params);
        xhr.send(sendData);
    });
};

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