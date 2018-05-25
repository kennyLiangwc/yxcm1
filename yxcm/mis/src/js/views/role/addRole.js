import React, { Component } from "react";
import http from "../../../utils/http"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom"
import { Card, Form, Input, Button, message } from "antd"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
const FormItem = Form.Item;

const AddRoleForm = Form.create()(class addForm extends Component {
    handleSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err,value) => {
            if(!err) {
                const query = `
                    mutation AddRole($input:RoleInput){
                        addRole(input:$input){
                            ret
                            msg
                        }
                    }
                `;
                http.post(query,{
                    input: {
                        name: value.name || "",
                        description: value.description || ""
                    }
                }).then(() => {
                    message.success("添加成功");
                    this.props.history.push("/app/role/roleList")
                })
            }
        })
    }
    reSet = e => {
        this.props.form.resetFields()
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { SetAuth } = this.props;
        return <div>
            <BreadcrumbCustom first={"新增角色"}/>
                <Card>
                    <Form
                        layout="inline"
                        onSubmit={this.handleSearch.bind(this)}
                    >
                        <FormItem
                            label="角色名称"
                        >
                            {getFieldDecorator("name",{
                                rules: [{ required: true, message: '角色名不能为空哦~'}]})(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            label="描述"
                        >
                            {getFieldDecorator("description")(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                        >
                            { SetAuth.addRole ? <Button type="primary" htmlType="submit">新增</Button> : "" }
                            <Button onClick={this.reSet} style={{marginLeft: "6px"}}>重置</Button>
                        </FormItem>
                    </Form>
                </Card>
        </div> 
            
    }
})

const mapStateToProps = state => {
    return {
        SetAuth: state.SetAuth
    }
}
export default connect(mapStateToProps)(withRouter(AddRoleForm))