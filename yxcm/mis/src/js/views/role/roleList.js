import React, { Component } from "react";
import { Button, Table, Card, message, Modal } from "antd";
import { withRouter } from "react-router-dom";
import util from "../../../utils/util"
import http from "../../../utils/http"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom.jsx"
import { connect } from "react-redux"


class RoleList extends Component {
    state = {
        list: [],
        delRoleVisible: false
    }
    componentDidMount() {
        this.query()
    }
    query(pageNumber = 1,pageSize = 10) {
        const query = `
            query QueryRoleList($input:RoleInput){
                queryRoleList(input:$input){
                    name
                    id
                    description
                    createAt
                    updateAt
                }
            }
        `;
        const input = {};
        http.post(query,{
            input: input
        }).then(data => {
            this.setState({
                list: data.queryRoleList
            })
        })
    }
    page = {
        pageNumber: 1,
        pageSize: 10,
        total: 10
    }
    delRole(id) {
        this.setState({
            id,
            delRoleVisible: true
        })
    }
    toEditRole(item) {
        util.data("editRole",item);
        this.props.history.push(`/app/role/editRole/${item.id}`)
    }
    handleCancel = e => {
        this.setState({
            delRoleVisible: false
        })
    }
    handleOk = e => {
        const query = `mutation DelRole($id:ID!){
            delRole(id:$id){
                ret
            }
        }`;
        http.post(query,{
            id: this.state.id
        }).then(() => {
            message.success("删除成功");
            this.setState({
                delRoleVisible: false
            })
            this.query()
        })
    }
    render() {
        const { SetAuth } = this.props;
        const columns = [
            {
                title: "角色名称",
                dataIndex: "name"
            },
            {
                title: "描述",
                dataIndex: "description"
            },
            {
                title: "创建时间",
                dataIndex: "createAt",
                render: (text,record) => (
                    util.getDataFromTime(record.createAt)
                )
            },
            {
                title: "修改时间",
                dataIndex: "updateAt",
                render: (text,record) => (
                    util.getDataFromTime(record.updateAt)
                )
            },
            {
                title: "操作",
                dataIndex: "id",
                render: (text,record) =>(
                    <div>
                        { SetAuth.updateRole ? <Button type="primary" onClick={() => this.toEditRole(record)} style={{marginRight: "8px"}} >修改</Button> : "" }
                        { SetAuth.delRole ? <Button onClick={() => this.delRole(record.id)} type="danger" >删除</Button> : "" }
                    </div>
                )
            }
        ];
        const pagination = {
            current: this.page.pageNumber,
            pageSize: this.pageSize,
            total: this.page.total,
            showSizechanger: true,
            onShowSizeChange: (pageNumber,pageSize) => {
                this.page.pageNumber = pageNumber;
                this.page.pageSize = pageSize;
                this.query(pageNumber,pageSize)
            },
            onChange: (current) => {
                this.page.pageNumber = current;
                this.query(current)
            }
        }
        const { delRoleVisible, list } = this.state;
        return (
            SetAuth.queryRoleList ? 
                <div>
                <Modal
                        title="删除角色"
                        visible={delRoleVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>确定要删除该角色吗？</p>
                    </Modal>
                    
                    <BreadcrumbCustom first={"角色列表"}/>
                    <Card>
                        <Table columns={columns} dataSource={list} pagination={pagination}></Table>
                    </Card>
                </div>
            : ""
        )
    }
}

const mapStateToProps = state => {
    return {
        SetAuth: state.SetAuth
    }
}
export default connect(mapStateToProps)(withRouter(RoleList))