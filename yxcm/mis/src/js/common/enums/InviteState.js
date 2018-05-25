import EnumBase from './EnumBase.js'
var map = {
    "-1": {
        label: '已删除',
        show: true
    },
    "0": {
        label: '初始化',
        show: true
    },
    "1": {
        label: '已绑定',
        show: true
    }
};
export default new EnumBase(map)