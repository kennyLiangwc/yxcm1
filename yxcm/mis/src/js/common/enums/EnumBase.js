/**
 * Created by folgerfan on 2017/3/13.
 */
import util from '../../../utils/util'
function dealMapToOptions(map) {
    var list = [];
    for (var key in map) {
        var item = map[key];
        if (item.show) {
            list.push({
                label: item.label,
                value: key
            })
        }
    }
    return list
}
var EnumBase = function (map) {
    this.map = map;
    this.options = dealMapToOptions(map);
};
EnumBase.prototype.getLabel = function (value) {
    return (this.map[value] || {}).label || '--'
};
EnumBase.prototype.getAttr = function (value, attr) {
    return (this.map[value] || {})[attr] || '--'
};
EnumBase.prototype.getLabelWithBitEqual = function (values) {

    if (!values || values.length == 0) {
        return ''
    }
    var list = this.options;
    var comments = [];
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (util.bitEqual(values, item.value)) {
            comments.push(item.label)
        }
    }
    if (comments.length == 0) {
        comments.push('其他')
    }
    return comments.join(',')
};
EnumBase.prototype.getValueArrayWithBitEqual = function(values) {
    if (!values || values.length == 0) {
        return []
    }
    var list = this.options;
    var comments = [];
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (util.bitEqual(values, item.value)) {
            comments.push(item)
        }
    }
    if (comments.length == 0) {
        const last = this[this.length - 1];
        if(last.label === '其他') {
            comments.push(last)
        }
    }
    return comments;
};
EnumBase.prototype.getOptionsWithEmpty = function (emptyName) {
    if(this.optionsWithEmpty){
        return this.optionsWithEmpty
    }
    var list = this.options.concat([]);
    list.unshift({
        label: emptyName || '请选择',
        value: ''
    });
    this.optionsWithEmpty = list;
    return this.optionsWithEmpty
};
export default EnumBase
