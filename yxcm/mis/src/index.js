import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import rootReducer from "./js/reducers"


import './css/index.css';
import 'antd/dist/antd.css';
import toastr from "./css/toastr.css";

import Page from "./Page";

const middleware = [thunk];
const store = createStore(rootReducer,applyMiddleware(...middleware))

// class Demo2 extends React.Component {
//   render() {
//     return <div>22</div>
//   }
// }

// const isAuth = '/demo';
// const isAuth2 = true;

// const SiderRoute = <Route path="/" component={Sider} />;

// const roleList = <Route path="/roleList" component={RoleList}></Route>

// const AuthRoute = ({ component: COM, ...rest }) => {
//   console.log(window.location, rest);
//   // debugger;
//   if(isAuth === rest.path) {
//     return <Route {...rest} render={(props) => <COM {...props} />} />  
//   }
//   else {
//     window.history.back();
//     return <div />
//     // return <div>not found</div>
//   }
// }

// const routes = <BrowserRouter>
//   <Switch>
//     {SiderRoute}
//     {roleList}
//     <AuthRoute  path="/demo" component={Demo} />
//     <AuthRoute  path="/demo2" component={Demo2} />
//   </Switch>
// </BrowserRouter>

const render = Component => {
//增加react-hot-loader保持状态刷新操作
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
	            <Component store={store} />
	        </Provider>
        </AppContainer>,
        document.getElementById('root')
	)
}
render(Page);

if (module.hot) {
	module.hot.accept('./Page', () => {
        render(Page);
    })
}


registerServiceWorker();
