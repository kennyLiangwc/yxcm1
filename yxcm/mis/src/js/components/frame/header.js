import React, { Component } from "react";
import { Col, Icon, Layout } from "antd"
import { withRouter } from "react-router-dom"
const { Header } = Layout;
class Header1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            nickImg: ""
        }
    }
    queryUserInfo() {

    }
    componentWillMount() {
        this.queryUserInfo();
    }
    render() {
        return(
            <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" >
                <Col span={1}>
                    <Icon
                        className="trigger custom-trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.toggle}
                    />
                </Col>
                
                <Col span={4}>
                    <span style={{fontSize: "20px"}}>管理平台</span>
                </Col>
                <Col span={4} offset={14}>
                    <span>欢迎回来：</span>
                    <span>{this.state.nickname}</span>
                    <span><img alt="" src={this.state.nickImg} style={{width: "40px", borderRadius: "40px", marginLeft: "6px"}}/></span>
                </Col>
            </Header>
        )
    }
};

export default withRouter(Header1)