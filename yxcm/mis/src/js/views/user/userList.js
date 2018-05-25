import React, { Component } from "react"
import http from "../../../utils/http"
import { Table, Row, Card, Form, Input, Button, Modal, Checkbox, message } from "antd";
import { connect } from "react-redux"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom.jsx";
import role from "../../common/role/role"
import util from "../../../utils/util"

const FormItem = Form.Item;
const UserForm = Form.create()(class SearchForm extends Component {
    handleSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err,value) => {
            if(!err) {
                this.props.query(value)
            }
        })
    }
    reSet = e => {
        this.props.form.resetFields()
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
        }
        const { getFieldDecorator } = this.props.form;
        return <Form
                layout="inline"
                onSubmit={this.handleSearch.bind(this)}
                >
                <FormItem
                    {...formItemLayout}
                    label =  "昵称"
                >
                    {getFieldDecorator("name")(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label =  "unionId"
                >
                    {getFieldDecorator("unionId")(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label =  "uid"
                >
                    {getFieldDecorator("uid")(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    // {...formItemLayout}
                >
                    <Button type="primary" htmlType="submit">搜索</Button>
                    <Button onClick={this.reSet} style={{marginLeft: "6px"}}>重置</Button>
                </FormItem>
        </Form>
    }
})

//用户角色组件
class UserRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMap: {}
        }
    }
    componentDidMount() {
        const { selectedMap } = this.state, { userRoleList } = this.props;
        userRoleList.map(v => {
            selectedMap[v.roleId] = true;
        });
        this.setState({
            selectedMap
        });
    }
   
    isSelected (id) {
        return !!this.state.selectedMap[id]
    }
    select = (id) => {
        let { selectedMap } = this.state;
        selectedMap[id] = !selectedMap[id];
        this.setState({
            selectedMap
        });
        let tempList = util.parseMapKeyTrueToArray(this.state.selectedMap);
        this.props.setRoleList(tempList);
    }
    render() {
        const { roleList } = this.props;
        return(
            <div>
                {
                    roleList.map((v,index) => {
                        return <Checkbox key={index} value={v.id} onChange={() => this.select(v.id)} checked={this.isSelected(v.id)}>{v.name}</Checkbox>
                    })
                }
            </div>
        )
    }
} 

//用户列表
class UserList extends Component {
    state = {
        list: [],
        userRoleVisible: false,
        userRoleList: []
    }
    page = {
        pageNumber: 1,
        pageSize: 10,
        count: 0
    }
    componentDidMount() {
        this.pageQuery();
    }
    pageQuery() {   //查询用户列表
        const { pageNumber, pageSize } = this.page;
        const input = {};
        const { name, unionId, uid } = this.params;
        if( name ) input.nickname = name.trim();
        if( unionId ) input.unionId = unionId.trim();
        if( uid ) input.uid = Number(uid);
        const query = `
            query QueryUserList($input:QueryUserInput,$page:PageInput){
                queryUserList(input:$input,page:$page){
                    count
                    list{
                        uid
                        unionId
                        nickname
                        portrait
                    }
                }
            }
        `;
        http.post(query,{
            input: input,
            page: {
                pageSize: pageSize,
                pageNumber: pageNumber
            }
        }).then(data => {
            this.page.total = data.queryUserList.total;
            this.setState({
                list: data.queryUserList.list
            })
        })
    }
    params = {}
    query(params) {
        this.params = params;
        this.pageQuery()
    }
    toViewUserRole = (id) => { 
        this.queryUserRole(id)
    }
    queryUserRole(id) {     //查询用户角色
        const query = `
            query queryUserRoles($id:ID!) {
                queryUserRoles(id:$id){
                    roleId
                }
            }
        `;
        http.post(query,{
            id: id
        }).then(data => {
            this.setState({
                userRoleList: data.queryUserRoles,
                id,
                userRoleVisible: true
            })
        })
    }
    setRoleList (list) {
        this.setState({
            setRoleList: list
        })
    }
    handleOk = (roles) => {
        const { id, setRoleList } = this.state;
        if(setRoleList) {
            const query = `
                mutation UpdateUserRole($id:ID!,$roles:[ID]){
                    updateUserRole(id:$id,roles:$roles){
                        ret
                        msg
                    }
                }
            `;
            http.post(query,{
                id: id,
                roles: setRoleList
            }).then(() => {
                message.success("修改成功")
            })
        }
        this.setState({
            userRoleVisible: false
        });
    }
    handleCancel = (e) => {
        e.preventDefault();
        this.setState({
            userRoleVisible: false
        })
    }
    render() {
        const { list, userRoleVisible, id, userRoleList } = this.state, { SetAuth, roleList } = this.props;
        const pagination = {
            total: this.page.total,
            current: this.page.pageNumber,
            pageSize: this.page.pageSize,
            showSizeChanger: true,
            onShowSizeChange: (pageNumber, pageSize) => {
                this.page.pageSize = pageSize;
                this.page.pageNumber = pageNumber;
                this.pageQuery()
            },
            onChange: (pageNumber) => {
                this.page.pageNumber = pageNumber;
                this.pageQuery()
            }
        }
        const columns = [
            {
                title: "头像",
                dataIndex: "portrait",
                render: (text,record) => (
                    <img src={record.portrait} style={{width: "30px"}}/>
                )
            },
            {
                title: "uid",
                dataIndex: "uid"
            },{
                title: "昵称",
                dataIndex: "nickname"
            },{
                title: "unionId",
                dataIndex: "unionId"
            },{
                title: "操作",
                dataIndex: "",
                render: (text,record) => (
                    SetAuth.updateUserRole ? <Button onClick={() => this.toViewUserRole(record.uid)}>查看角色</Button> : ""
                )
            }
        ]
        return(
            <div className="gutter-example">
                {
                    SetAuth.queryUserList ? <Row gutter={16}>
                        <BreadcrumbCustom first={"用户列表"}/>
                        <UserForm query={this.query.bind(this)}/>
                        <Card bordered={false}>
                        <Table dataSource={list} columns={columns} pagination={pagination} rowKey="name" ></Table>
                        </Card>
                    </Row> : ""
                }
                <Modal
                    title="查看用户角色"
                    visible={userRoleVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose="true"
                >
                    <UserRole id={id} roleList={roleList} userRoleList={userRoleList} setRoleList={this.setRoleList.bind(this)}/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        SetAuth: state.SetAuth,
        roleList: state.GetRoleList.roleList
    }
}
export default connect(mapStateToProps)(UserList)