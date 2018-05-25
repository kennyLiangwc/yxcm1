import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import menu from '../../common/menu';
import SiderMenu from './SiderMenu';
import http from "../../../utils/http"
import { setAuth } from "../../actions"
import { connect } from "react-redux"

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
	menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    getRightList() {

    }
	render() {
        const rightList = this.props.rightList;
		return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{ overflowY: 'auto' }}
            >
                <div className="logo" />
                <SiderMenu
                    menus={menu.getMenuByRightList("role",rightList)}
                    theme="dark"
                    mode="inline"
                    onClick={this.handleClick.bind(this)}
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.firstHide ? null : [this.state.openKey]}
                    onOpenChange={this.openMenu}
                    style={{minHeight: "960px"}}
                />
            
            </Sider>
		)
	}
}


const mapStateToProps = state => {
    return {
        rightList: state.GetMyMenus
    }
}
export default connect(mapStateToProps)(withRouter(SiderCustom))