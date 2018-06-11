import React, { Component } from 'react';
import { Layout, message } from 'antd';
import SiderCustom from "./components/frame/SiderCustom"
import HeaderCustom from "./components/frame/HeaderCustom"
import Routes from "./route"
import css from "../css/App.css"
import menu from "./common/menu"
import http from "../utils/http"

const { Footer, Content } = Layout;


class App extends Component {
    state = {
        collapsed: false,
        menu: []
    }
    componentWillMount() {
        this.setState({
            menu: menu.getMenuByRightList("role",[])        //动态生成菜单
        })
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { menu, collapsed } = this.state;
        return (
            <Layout >
                <SiderCustom collapsed={collapsed} menu={menu}/>
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={collapsed} />
                    <Content style={{margin: "12px"}}>
                    {/* 动态替换conten里的内容 */}
                        <Routes />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        印象传媒管理平台 ©2018 Created by Liang
                    </Footer>
                </Layout>
            
        </Layout>
    );
  }
}

export default App
