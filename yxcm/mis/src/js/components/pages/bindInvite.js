import React, { Component } from "react";
import { Form, Input, Icon, Button, message } from "antd"
import http from "../../../utils/http"

const FormItem = Form.Item;

const BindInvite = Form.create()(class BindInviteForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const self = this;
        this.props.form.validateFields((err,values) => {
            if(!err) {
                const query = `
                    mutation bindInviteToken($token:ID!){
                        bindInviteToken(token:$token){
                            ret
                            msg
                        }
                    }
                `;
                http.post(query,{
                    token: values.code
                }).then(() => {
                    message.success("绑定成功，请重新扫码登录");
                    this.props.history.push("/app/user/userList")
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form
                layout="inline"
                onSubmit={this.handleSubmit}
                className="login-form"
                style={{width: "800px",marginLeft: "40%",marginTop: "15%"}}
            >
                <FormItem
                    label="邀请码"
                >
                {getFieldDecorator('code', {
                    rules: [{ required: true, message: '邀请码不能为空哦~' }],
                })(
                    <Input prefix={<Icon type="smile" style={{ color: '#005fffa8' }} />} placeholder="请填写邀请码" />
                )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">提交</Button>
                </FormItem>
            </Form>
        )
    }
})


export default BindInvite