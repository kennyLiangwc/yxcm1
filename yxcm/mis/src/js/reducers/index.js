import { combineReducers } from 'redux';
import AddUserInfo from "./AddUserInfo.js"
import GetRoleList from "./GetRoleList"
import SetAuth from "./SetAuth.js"
import GetMyMenus from "./GetMyMenus"

export default combineReducers({
	AddUserInfo,
	GetRoleList,
	SetAuth,
	GetMyMenus
});