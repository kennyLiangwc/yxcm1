import React, { Component } from "react";
import { Col, Icon, Layout } from "antd"
const { Header } = Layout;

class HeaderCustom extends Component {
    render() {
        const { userInfo } = this.props;
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
                    <span style={{fontSize: "20px"}}>印象传媒运营平台</span>
                </Col>
            </Header>
        )
    }
};


export default HeaderCustom