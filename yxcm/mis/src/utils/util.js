const cookie = {
    set(cookieName, cookieValue, seconds, path){
        let expires = new Date();
        cookieValue = cookieValue ? cookieValue : "";
        if (!!seconds) {
            expires.setTime(expires.getTime() + seconds);
        } else {
            expires.setTime(expires.getTime() + (30 * 60 * 1000));
        }

        let data = encodeURI(cookieName) + "=" + encodeURI(cookieValue)
            + (';expires=' + expires.toGMTString())
            + (path ? ';path=' + path : ';path=/');

        document.cookie = data;
    },
    get(name){
        let cookie_start = document.cookie.indexOf(name + '=');
        let cookie_end = document.cookie.indexOf(";", cookie_start);
        let v = cookie_start == -1 ? '' : decodeURI(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));

        //好像url和cookie中有可能会获取到undefined字符串
        v = v === 'undefined' ? '' : v;
        return v;
    },
    del(name){
        document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT;path=/;";
    }
};
let util = {
    data(key, value) {
        if (value === undefined) {
            // 读取数据
            var data = null;
            try {
                data = decodeURI(localStorage.getItem(key));
                data = JSON.parse(data);
            } catch (err) {
                console.error('取并转化localstorage数据失败', err);
            }
            return data;
        } else if (value === null) {
            // 删除数据
            try {
                localStorage.removeItem(key);
            } catch (err) {
                console.error('删除localstorage数据失败', err);
            }

        } else {
            // 设置数据
            try {
                // console.log(encodeURI)
                localStorage.setItem(key, encodeURI(JSON.stringify(value)));
            } catch (error) {
                console.error('设置localstorage数据失败', error);
            }
        }
    },
    getDataFromTime(time) {
        if(!time) return;
        time = Number(time);
        let data = new Date(time);
        let year = data.getFullYear(),
            month = data.getMonth() + 1,
            date = data.getDate(),
            hour = data.getHours(),
            minute = data.getMinutes(),
            second = data.getSeconds();
        return `${year}-${month > 9 ? month : '0' + month}-${date > 9 ? date : '0' + date} ${hour > 9 ? hour : '0' + hour}:${minute > 9 ? minute : '0' + minute}:${second > 9 ? second : '0' + second}`;
    },
    setCookie(cookieName, cookieValue, seconds, path){
        let expires = new Date();
        cookieValue = cookieValue ? cookieValue : "";
        if (!!seconds) {
            expires.setTime(expires.getTime() + seconds);
        } else {
            expires.setTime(expires.getTime() + (30 * 60 * 1000));
        }

        let data = encodeURI(cookieName) + "=" + encodeURI(cookieValue)
            + (';expires=' + expires.toGMTString())
            + (path ? ';path=' + path : ';path=/');

        document.cookie = data;
    },
    getCookie(name){
        let cookie_start = document.cookie.indexOf(name + '=');
        let cookie_end = document.cookie.indexOf(";", cookie_start);
        let v = cookie_start == -1 ? '' : decodeURI(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));

        //好像url和cookie中有可能会获取到undefined字符串
        v = v === 'undefined' ? '' : v;
        return v;
    },
    delCookie(name){
        document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT;path=/;";
    },
    /**
     * 判断a&b跟b是否等于b,默认b小于a
     * @param a
     * @param b
     */
    bitEqual(a, b){
        function getBitArr(num) {
            num = Number(num).toString(2);
            var arr = [];
            while (true) {
                if (num.length <= 30) {
                    arr.push(num);
                    break;
                }
                arr.push(num.substr(-30, 30));
                num = num.substring(0, num.length - 30);
            }
            return arr;
        }

        var arrA = getBitArr(a);
        var arrB = getBitArr(b);
        for (var i = 0; i < arrA.length, i < arrB.length; i++) {
            var na = parseInt(arrA[i], 2), nb = parseInt(arrB[i], 2);
            if ((na & nb) != nb) {
                return false;
            }
        }
        return true
    },
    /**
     * 图片cdn的地址存在数据库中，不是完整的，需要自己加上尺寸
     * @param src
     * @param size
     * @returns {*}
     */
    dealPicUrl0(src, size) {
        if (src.indexOf('wx.qlogo.cn') != -1) {//兼容微信头像
            if (size != 0) {
                return src + '/' + 64;
            } else {
                return src + '/0';
            }
        }
        if (size != 0) {
            size = size || 364;
        }
        if (src && src.substring(src.length - 2) != '/0') {
            if (src.indexOf('p.qpic.cn') != -1) {
                src = src + '/' + size;
            }
        }
        return src;
    },
    /**
     * 将字典中的key组装成一个数组
     * 比如{1:true,2:false} 转化成[1]
     * @param obj
     */
    parseMapKeyTrueToArray(obj){
        var arr = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key) && obj[key]) {
                arr.push(key);
            }
        }
        return arr
    },
};
export default util;