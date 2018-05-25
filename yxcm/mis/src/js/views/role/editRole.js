import React, { Component } from "react";
import { Link } from "react-router-dom"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom"
import { Card, Form, Input, Button, message, Popconfirm, Checkbox, Row } from "antd"
import http from "../../../utils/http"
import util from "../../../utils/util"
import menu from "../../common/menu"
import { connect } from "react-redux"

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const editRole = util.data("editRole");

//修改角色form
const EditRoleForm = Form.create()(class RoleForm extends Component {
    handleUpdate = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err) {
                this.props.updateRole(values)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { description, name } = editRole;
        return(
            <Form
            layout="inline"
            >
                <FormItem
                label="角色名称"
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '角色名不能为空'}],
                    initialValue: name})(
                        <Input />  
                    )}
                </FormItem>
                <FormItem
                label="描述"
                >
                    {getFieldDecorator('description', {initialValue: description})(
                        <Input />  
                    )}
                </FormItem>
                <FormItem>
                    <Popconfirm title="确定要删除吗?" onConfirm={this.handleUpdate} okText="确定" cancelText="取消">
                        <a className="blue">修改</a>
                    </Popconfirm>
                </FormItem>
            </Form>
        )
    }
})

//角色菜单列表
class EditRole extends Component {
    constructor(props) {
        super(props);
        let id = this.props.computedMatch.params.id;
        if(!id) {
            message.error("参数错误");
            window.history.back();
            return <div />
        }
        this.state = {
            id: id,
            checkedList: [],
            checkAll: false,
            selectedMap: {}
        }
    }
    componentWillMount() {
        this.queryRoleMenus()
    }
    updateRole(values) {        //修改角色基本信息
        const query = `
            mutation UpdateRole($id:ID!,$input:RoleInput){
                updateRole(id:$id,input:$input){
                    ret
                    msg
                }
            }
        `;
        http.post(query,{
            id: this.state.id,
            input: {
                name: values.name,
                description: values.description
            }
        }).then(() => {
            message.success("修改成功");
            Object.assign(editRole,{
                name: values.name,
                description: values.description
            })
            util.data("editRole",editRole)
        })
    }
    queryRoleMenus() {      //查询角色菜单
        const { selectedMap, id } = this.state;
        const query = `
            query queryRoleMenus($id:ID!) {
                queryRoleMenus(id:$id)
            }
        `;
        http.post(query,{
            id: id
        }).then(data => {
            data.queryRoleMenus.map(v => {
                selectedMap[v] = true;
            })
            this.setState({
                selectedMap
            })
        })
    }
    onCheckAllChange = (e) => {     //全选
        this.setState({
            checkAll: e.target.checked
        })
    }
    isSelected (path) {
        return !!this.state.selectedMap[path]
    }
    select = (path) => {
        let { selectedMap } = this.state;
        selectedMap[path] = !selectedMap[path];
        this.setState({
            selectedMap
        })
    }
    batSelect = (item,e) => {
        let selectedMap = {}, checked = e.target.checked;
        item.children.map((c,i) => {
            c.contain.map((v,n) => {
                selectedMap[v.path] = checked
            })
        });
        selectedMap = Object.assign({},this.state.selectedMap,selectedMap);
        this.setState({
            selectedMap
        })
    }
    updateRoleMenu = () => {        //修改角色权限
        const { selectedMap } = this.state, { id } = this.state;
        let tempList = util.parseMapKeyTrueToArray(selectedMap);
        const query = `
            mutation UpdateRoleMenu($id:ID!,$menus:[String]){
                updateRoleMenu(id:$id,menus:$menus){
                    ret
                    msg
                }
            }
        `;
        http.post(query,{
            id: id,
            menus: tempList
        }).then(() => {
            this.queryRoleMenus();
            message.success("修改成功")
        })
    }
    render() {
        const self = this, menuMap = menu.MenuMap;
        const { SetAuth } = this.props;
        return(
            <div>
                <BreadcrumbCustom first={"角色列表"} second="修改角色" firstLink="/app/role/roleList"/>
                <Card>
                    <EditRoleForm updateRole={this.updateRole.bind(this)}/>
                    <div style={{ borderBottom: '1px solid #E9E9E9', margin: "10px 0"}}></div>
                    {
                        Object.keys(menuMap).map(key => {
                            return menuMap[key].map((item,index) => {
                                return <div key={index} style={{margin: "12px"}}>
                                        <Checkbox 
                                        onChange={(e) => self.batSelect(item,e)}
                                        >
                                        {item.text}
                                        <Row>
                                            {
                                                item.children.map((c,i) => {
                                                    return <span key={i}>
                                                        {
                                                            c.contain.map((v,n) => {
                                                                return <Checkbox key={n} value={v.path} checked={self.isSelected(v.path)} onChange={() => self.select(v.path)} style={{margin: "10px"}}>{v.name}</Checkbox >
                                                            })
                                                        }
                                                    </span>
                                                })
                                            }
                                        </Row>
                                        
                                    </Checkbox>
                                </div>
                            })
                        })
                    }
                    { SetAuth.updateRoleMenu ? <Button onClick={this.updateRoleMenu}>修改</Button> : "" }
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        SetAuth: state.SetAuth
    }
}
export default connect(mapStateToProps)(EditRole)