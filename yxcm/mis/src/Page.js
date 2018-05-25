import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import NotFound from './js/components/pages/NotFound';
import Login from './js/components/pages/Login';
import App from './js/App';
import React from "react";
import BindInvite from "./js/components/pages/bindInvite"
const Test = () => (
	<div>bbbbbb</div>
)

export default () => (
	<HashRouter>
		<Switch>
			<Route exact path="/" render={() => <Redirect to="/app/user/userList" />}></Route>
			<Route path="/app" component={App}></Route>
			<Route path="/login" component={Login}></Route>
			<Route path="/404" component={NotFound}></Route>
			<Route path="/bindInvite" component={BindInvite}></Route>
			<Route component={NotFound} />} />
		</Switch>
	</HashRouter>
)