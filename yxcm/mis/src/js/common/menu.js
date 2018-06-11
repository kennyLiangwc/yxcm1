import { rule } from "postcss";

let MenuMap = {
    role: [
        {
            text: "网红管理",
            icon: "idcard",
            id: "anchor",
            children: [
                {
                    id: "AnchorList",
                    text: "网红列表",
                    path: "/app/anchor/anchorList",
                    isMenu: true,
                    exact: true,
                    contain: [
                        {
                            path: "queryRoleList",
                            name: "查询角色列表"
                        },
                        {
                            path: "delRole",
                            name: "删除角色",
                            permissionName: "delRole"
                        },
                        {
                            path: "updateRole",
                            name: "修改角色"
                        },
                        {
                            path: "queryRoleMenus",
                            name: "查询角色菜单"
                        },
                        {
                            path: "updateRoleMenu",
                            name: "修改角色菜单"
                        }
                    ]
                },
                {
                    id: "addRole",
                    text: "新增网红",
                    path: "/app/anchor/addAnchor",
                    isMenu: true,
                    exact: true,
                    contain: [
                        {
                            name: "新增网红",
                            path: "addRole"
                        }
                    ]
                },
                {
                    id: "updateRole",
                    text: "修改角色",
                    path: "/app/anchor/editAnchor/:id",
                    isMenu: false,
                    exact: true,
                    contain: []
                }
            ]
        },
        {
            text: "活动列表",
            icon: "code",
            id: "active",
            children: [
                {
                    id: "Active",
                    text: "活动列表",
                    path: "/app/active/active",
                    isMenu: true,
                    exact: true,
                    contain: [

                    ]
                },
                {
                    id: "EditActive",
                    text: "编辑活动",
                    path: "/app/active/editActive/:id",
                    isMenu: false,
                    exact: true,
                    contain: [

                    ]
                },
                {
                    id: "AddActive",
                    text: "新增活动",
                    path: "/app/active/addActive",
                    isMenu: true,
                    exact: true,
                    contain: [

                    ]
                }
            ]
        }
    ]
}





function getMenuByRightList(module, rightList) {
    return MenuMap[module]
    const roleList = rightList;
    let menuList = MenuMap[module]; // 此时为数组, role等;
    const tempRightList = roleList.map(function(v) {
        return v;
    }); // 把对象降维到数组
    if (!menuList) {
        console.error('错误模块', module);
        return
    }
    const resultList = []; // 接收新的menu
    menuList.forEach(function (menu1) {
        var menu2Arr = menu1.children.filter(function (menu2) {
            for (var i = 0; i < menu2.contain.length; i++) {
                if (tempRightList.includes(menu2.contain[i].path)) {
                    return true
                }
            }
            return false
        });
        if (menu2Arr.length > 0) {
            resultList.push({
                id: menu1.id,
                text: menu1.text,
                icon:menu1.icon,
                children: menu2Arr
            })
        }
    });
    return resultList
}


let containList = [];
(function(){    //获取MenuMap里的contain,用于权限控制
    Object.keys(MenuMap).map((key) => {
        MenuMap[key].map((item) => {
            item.children.map(c => {
                c.contain.map(v => {
                    containList.push(v)
                })
            })
        })
    })
})();

function getRouteList() {   //获取路由列表
    let routeList = [], menuList = MenuMap.role;
    Object.keys(MenuMap).map(key => {
        MenuMap[key].map(({children}) => {
            children.map(({id,path,exact}) => {
                routeList.push({
                    id,
                    path,
                    exact
                })
            })
        })
    })
    return routeList
}

export default {
    getMenuByRightList: getMenuByRightList,
    getRouteList: getRouteList,
    MenuMap,
    containList
}