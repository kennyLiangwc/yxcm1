import http from "../../utils/http"

export const addUserInfo = info => ({
	type: "ADD_USER_INFO",
	info
});



export const setAuth = (menuList,roleList) => ({
	type: "SET_AUTH",
	menuList,
	roleList
})

export function getRoleList() {
	return dispatch => {
		const query = `
			query QueryRoleList($input:RoleInput){
				queryRoleList(input:$input){
					name
					id
				}
			}
		`;
		const p = http.post(query,{
			input: {}
		}).then( data => data.queryRoleList);

		p.then(data => {
			dispatch({
				type: "GET_ROLELIST",
				payload: data
			})
		})
		return p
	}
}

export const myMenus = menus => ({
	type: "GET_MY_MENUS",
	menus
})