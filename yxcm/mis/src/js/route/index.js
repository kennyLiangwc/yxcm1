import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Bundle from "../components/Bundle"
import menu from "../common/menu"


let routes = menu.getRouteList();		//获取路由列表




// const AuthRoute = ({component: COM, ...rest}) => {
// 	if(arr.includes(rest.path)) {
// 		return <Route {...rest} render={(props) => <COM {...props} />} />
// 	}else {
// 		alert("没有权限");
// 		window.history.back();
// 		return <div />
// 	}
// }


// 每次根据url异步加载对应的组件
const BundleRoute = ({...rest}) => {
	let path = rest.path;
	path = path.split("/:")[0].slice(5);
	return <Route {...rest} render={({ID}) => <Bundle {...rest} load={(ID) => import(`../views/${path}`) }>
		{(ID) => <ID {...rest} />}
	</Bundle>}/>
}



export default class Router extends Component {
	render() {
		return (<Switch>
			{
				routes.map(({...rest},i) => {
					return <BundleRoute key={i} {...rest}/>
				})
			}
			<Route render={() => <Redirect to="/404" />} />
		</Switch>)
	}
}


















// export default class Router extends Component {
// 	render() {
// 		return (<Switch>
// 			{/* <BundleRoute exact path="/app/role/roleList" ID="RoleList"></BundleRoute> */}
// 			{/* <AuthRoute exact path="/app/role/roleList" component={RoleList1} />
// 			<AuthRoute exact path="/app/role/addRole" component={AddRole} /> */}
// 			{/* <BundleRoute exact path="/app/role/addRole" ID="AddRole"></BundleRoute>
// 			<BundleRoute exact path="/app/role/editRole" ID="EditRole"></BundleRoute>
// 			<BundleRoute exact path="/app/role/delRole" ID="DelRole"></BundleRoute>
// 			<BundleRoute exact path="/app/role/testRole" ID="TestRole"></BundleRoute> */}
// 			{/* <AuthRoute exact path="/app/role/editRole" component={EditRole}></AuthRoute>
			 
// 			{/* <Route path="/app/test" component={testRoute}></Route> */}

// 			{
// 				routes.map(({...rest},i) => {
// 					// return <Route key={i} {...rest} render={(props) => <COM {...props} />}></Route>
// 					return <BundleRoute key={i} {...rest}/>
// 				})
// 			}
// 			<Route path="/app/test" component={testRoute}></Route>
// 			{/* <Route exact path="/app/chat" component={Chat}></Route> */}
// 			<BundleRoute exact path="/app/chat"/>
// 			<Route render={() => <Redirect to="/404" />} />
// 		</Switch>)
// 	}
// }