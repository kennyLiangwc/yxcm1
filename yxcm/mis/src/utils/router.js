/**
 * Created by folgerfan on 2015/10/13.
 */
var Router = (function () {
    var win = window;
    /*
     * 设置路由
     */
    var getHash = function (url) {
        url = url || win.location.href;
        var match = url.match(/#(.*)$/);
        return match ? match[1] : '';
    };

    var routeHandleCache = [];

    function iterateRegistry(handles) {
        var hash = getHash();
        for (var i = 0, len = handles.length; i < len; i++) {
            var handleFunc = handles[i];
            if (handleFunc) {
                var result = handleFunc(hash);
                if (result === true) {
                    return;
                }
            }
        }
    }

    return {
        getHash: getHash,
        //本来想着参数的key部分是pageKey，然后根据key取对应页面。这样的话太霸道了，不方便其他的处理
        //这里的注册将处理函数push进数组，hash发生改变是依次调用数组里的每个处理函数，处理函数自己决定如何处理，感觉这是最通用的
        registry: function (handles) {
            if ((typeof handles) == 'function') {
                handles = [handles];
            }
            routeHandleCache = routeHandleCache.concat(handles);
            if (this.started) {
                iterateRegistry(handles);
            }
            //console.log('注册处理函数', routeHandleCache)
        },
        navigate: function (hash) {
            hash = hash || '';
            var url = hash.indexOf('#') == 1 ? hash : '#' + hash;
            location.href = url;
        },
        toView: function (path) {
            if (path.indexOf('view/') == -1) {
                path = 'view/' + path;
            }
            Router.navigate(path)
        },
        openView: function (path) {
            console.log(location);
            if (path.indexOf('view/') == -1) {
                path = 'view/' + path;
            }
            var href = location.protocol+'//'+location.host+location.pathname+location.search+'#'+path;
            window.open(href)
        },
        /**
         * 页面一开始没有hash，这个时候page或许也都没注册,所以需要一个启动函数，在page注册后处理hash为''的情况
         */
        start: function () {
            var __initRegistry = false;
            win.addEventListener('popstate', function () {
                this.started = true;
                iterateRegistry(routeHandleCache);
                __initRegistry = true;
            }.bind(this));

            //修复部分浏览器默认  首次进入页面会执行次popstate,某些不会的差异情况修复
            setTimeout(() => {
                if (!__initRegistry) {
                    iterateRegistry(routeHandleCache);
                }
            }, 200);
            this.navigate(getHash());
        }
    };
})();
module.exports = Router;

