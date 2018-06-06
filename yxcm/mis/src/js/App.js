import React, { Component } from 'react';
import logo from './logo.svg';
import { Layout } from 'antd';

import SiderCustom from "./components/frame/SiderCustom"
import Head from "./components/frame/header"
import Routes from "./route"
import css from "../css/App.css"

const { Header, Footer, Sider, Content } = Layout;


class App extends Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Layout >
                <SiderCustom collapsed={this.state.collapsed} />
                <Layout style={{flexDirection: 'column'}}>
                    <Head toggle={this.toggle} collapsed={this.state.collapsed} />
                    <Content style={{margin: "12px"}}>
                    {/* 动态替换conten里的内容 */}
                        <Routes />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        互联网+网红控制台 ©2018 Created by Liang
                    </Footer>
                </Layout>
            
        </Layout>
    );
  }
}

export default App;
