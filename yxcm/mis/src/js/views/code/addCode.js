import React, { Component } from "react";
import { Form, Input, Button, message, Modal, Select, Card } from "antd"
import http from "../../../utils/http"
import { withRouter } from "react-router-dom"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom"
import { connect } from "react-redux"

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;

class AddCode extends Component {
    handleSubmit = (e) => {     //提交
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const self = this;
                confirm({
                    title: '你确定要创建邀请码吗?',
                    onOk() {
                            const query = `
                                query createInviteTokens($input:CreateInviteInput){
                                    createInviteTokens(input:$input)
                                }
                            `;
                            http.post(query,{
                                input: {
                                    num: values.num,
                                    roleId: values.role
                                }
                            }).then(() => {
                            message.success("创建成功");
                            self.props.history.push("/app/code/codeList")
                        })
                    }
                });
            }
        });
    }
    reSet = e => {
        this.props.form.resetFields()
    }
    render() {
        const { SetAuth } = this.props;
        const { getFieldDecorator} = this.props.form, { roleList } = this.props;
        return(
            <div>
                <BreadcrumbCustom first="新增邀请码"/>
                <Card>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <FormItem
                            label="邀请码个数"
                        >
                            {getFieldDecorator('num', {
                                rules: [{ required: true, message: '请输入正确的数字'}],
                            })(
                                <Input  placeholder="请输入邀请码个数" type="number" min="1"/>
                            )}
                        </FormItem>
                        <FormItem
                            label="角色名称"
                        >
                            {getFieldDecorator('role')(
                                <Select
                                style={{ width: 200 }}
                                placeholder="请选择一个角色"
                                >
                                    {
                                        roleList && roleList.map((v,index) => (
                                            <Option key={index} value={v.id}>{v.name}</Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem>
                            { SetAuth.createInviteTokens ? <Button type="primary" htmlType="submit" style={{marginRight: "6px"}}>创建</Button> : "" }
                            <Button onClick={this.reSet}>重置</Button>
                        </FormItem>    
                    </Form>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        roleList: state.GetRoleList.roleList,
        SetAuth: state.SetAuth
    }
}
const AddCodeForm = Form.create()(AddCode);
export default connect(mapStateToProps)(withRouter(AddCodeForm))