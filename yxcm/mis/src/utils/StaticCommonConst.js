
const RET_CODE = {
    OK: {
        ret: 0,
        msg: 'ok'
    },
    SERVER_ERROR: {
        ret: -1,
        msg: '系统处理异常,请稍候再试'
    },
    DB_ERROR: {
        ret: -2,
        msg: '数据处理异常,请稍候再试'
    },
    NOT_LOGIN: {
        ret: -3,
        msg: '未登录'
    },
    PARAM_WRONG: {
        ret: -4,
        msg: '参数错误'
    },
    TOKEN_ERROR: {
        ret: -5,
        msg: '令牌错误'
    },
    RIGHT_ERROR: {
        ret: -6,
        msg: '没有权限'
    },
    NOT_EXIST: {
        ret: -7,
        msg: '记录不存在'
    }
};
const RetMsgMap = {};
for (let key in RET_CODE) {
    const RetData = RET_CODE[key];
    RetMsgMap[RetData.ret] = RetData.msg
}
module.exports = {
    COOKIE_NAMES: {
        OFFICIAL: {
            JWT_TOKEN_NAME: "_txyy_official_token",
            SESSION_ID: '_txyy_official_session'
        },
        MIS: {
            JWT_TOKEN_NAME: "_txyy_mis_token",
            SESSION_ID: '_txyy_mis_session'
        }
    },
    CSRF_TOKEN_NAME: '_csrf_token',
    RET_CODE,
    RetMsgMap
};