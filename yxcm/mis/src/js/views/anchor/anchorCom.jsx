import React, { Component } from "react"
import util from "../../../utils/util"
import { Row, Form, Input, Button, message, Select, Col } from "antd";
import UploadImg from "../../components/upload/UploadImg"
import http from "../../../utils/http"
import { withRouter } from "react-router-dom"
const FormItem = Form.Item;
const Option = Select.Option;



const AnchorComForm = Form.create()(class AnchorCom extends Component {
	constructor(props) {
		super(props);
		let editAnchor = {};
		if(this.props.id) editAnchor = util.data("editAnchor");
		this.state = {
			cover_url: editAnchor.cover_url || "",
			name: editAnchor.name || "",
			nickname: editAnchor.nickname || "",
			sex: editAnchor.sex || 0,
			fans_num: editAnchor.fans_num || "",
			follow_num: editAnchor.follow_num || "",
			like_collect_num: editAnchor.like_collect_num || "",
			platform: editAnchor.platform || "",
			level: editAnchor.level || "",
			tags: editAnchor.tags || "",
			intro: editAnchor.intro || ""
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		 this.props.form.validateFields((err,values) => {
            if(!err) {
                let params = Object.assign({},{
            		cover_url: this.state.cover_url
        		},values)
        		if(this.props.id) {
        			http.post("back/anchor/update/",Object.assign(params,{
        				auto_id: this.props.id
    				})).then(() => {
        				message.success("修改成功");
        				this.props.history.push("/app/anchor/anchorList")
    				})
        		}else {
        			http.post("back/anchor/add/",params).then(() => {
        				message.success("增加成功")
        				this.props.history.push("/app/anchor/anchorList")
    				})
        		}
            }
        })
	}
	uploadImg(data) {
		this.setState({
			cover_url: data
		})
	}
    render() {
		const { name, nickname, sex, fans_num, follow_num, like_collect_num, platform, level, cover_url, tags, intro } = this.state;
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 6}
        };
        const formItemLayout1 = {
            labelCol: {span: 4},
            wrapperCol: {span: 8}
        };
        const formItemLayout2 = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        };
		return <Form
				onSubmit={this.handleSubmit}
			>
			<Row>
				<Col span={12}>
					<FormItem
						label="主播名称"
						{...formItemLayout1}
					>
						{getFieldDecorator('name', {
	                        rules: [{ required: true, message: '主播名称不能为空'}],
	                    initialValue: name})(
	                        <Input />  
	                    )}
					</FormItem>
				</Col>
				<Col span={12}>
					<FormItem
						label="主播封面"
						{...formItemLayout1}
					>
						{getFieldDecorator('cover_url', {
	                    initialValue: cover_url})(
	                        <UploadImg src={cover_url} uploadImg={this.uploadImg.bind(this)}/>  
	                    )}
					</FormItem>
				</Col>
			</Row>
			<FormItem
				label="主播昵称"
				{...formItemLayout}
			>
				{getFieldDecorator('nickname', {
                initialValue: nickname})(
                    <Input />  
                )}
			</FormItem>
			<FormItem
				label="性别"
				{...formItemLayout}
			>
				{getFieldDecorator('sex', {
                initialValue: String(sex)})(
                    <Select>
                        <Option value="0">女</Option>
                        <Option value="1">男</Option>
                    </Select>
                )}
			</FormItem>
			<FormItem
				label="粉丝数"
				{...formItemLayout}
			>
				{getFieldDecorator('fans_num', {
                initialValue: fans_num})(
                    <Input type="Number" min="0"/>  
                )}
			</FormItem>
			<FormItem
				label="关注数"
				{...formItemLayout}
			>
				{getFieldDecorator('follow_num', {
                initialValue: follow_num})(
                    <Input type="Number" min="0"/>  
                )}
			</FormItem>
			<FormItem
				label="赞与收藏数"
				{...formItemLayout}
			>
				{getFieldDecorator('like_collect_num', {
                initialValue: like_collect_num})(
                    <Input type="Number" min="0"/>  
                )}
			</FormItem>
			<FormItem
				label="平台"
				{...formItemLayout}
			>
				{getFieldDecorator('platform', {
                initialValue: String(platform)})(
                   <Select>
                    	<Option value="">请选择</Option>
                        <Option value="0">淘宝</Option>
                        <Option value="1">微博</Option>
                        <Option value="2">抖音</Option>
                        <Option value="3">小红书</Option>
                    </Select>
                )}
			</FormItem>
			<FormItem
				label="标签"
				{...formItemLayout}
			>
				{getFieldDecorator('tags', {
                initialValue: tags})(
                    <Input />
                )}
			</FormItem>
			<FormItem
				label="简介"
				{...formItemLayout}
			>
				{getFieldDecorator('intro', {
                initialValue: intro})(
                    <Input placeholder="请填写网红地址" />
                )}
			</FormItem>
			<FormItem {...formItemLayout2}>
	          	<Button type="primary" htmlType="submit">提交</Button>
	        </FormItem>
		</Form>
	}
})
export default withRouter(AnchorComForm)