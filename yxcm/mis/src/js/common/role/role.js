import http from "../../../utils/http"

let role = {
    getRoleList(noUnshift) {
        return new Promise((reslove,reject) => {
            const query = `
                query QueryRoleList($input:RoleInput){
                    queryRoleList(input:$input){
                        name
                        id
                    }
                }
            `;
            http.post(query,{
                input: {}
            },false).then(data => {
                let tempList = data.queryRoleList;
                if(!noUnshift) {
                    tempList.unshift({
                        name: "请选择",
                        id: ""
                    })
                }
                reslove(tempList)
            })
        })
        
    }
};
export default role