import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import SiderMenu from './SiderMenu';

const { Sider } = Layout;

class SiderCustom extends Component {
    state = {
        collapsed: false,
        openKey: '',
        selectedKey: '',
        firstHide: true
    }
    componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.toggleCollapsed(nextProps.collapsed);
        this.setMenuOpen(nextProps);
    }
    setMenuOpen = props => {
        let { pathname } = props.location;
        let openKey = pathname.split("/")[2];
        this.setState({
            openKey: openKey,
            selectedKey: pathname
        });
    };
    handleClick(e) {
        this.setState({
            selectedKey: e.key,
            openKey: e.keyPath[1]
        })
    };
    toggleCollapsed = (collapsed) => {
        this.setState({
            collapsed,
            firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    }
    render() {
        const { collapsed, menu} = this.props, { selectedKey, firstHide, openKey } = this.state;
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={collapsed}
                style={{ overflowY: 'auto' }}
            >
                <div className="logo" />
                <SiderMenu
                    menus={menu}
                    theme="dark"
                    mode="inline"
                    onClick={this.handleClick.bind(this)}
                    selectedKeys={[selectedKey]}
                    openKeys={firstHide ? null : [openKey]}
                    onOpenChange={this.openMenu}
                    style={{minHeight: "960px"}}
                />
            </Sider>
        )
    }
}



export default withRouter(SiderCustom)