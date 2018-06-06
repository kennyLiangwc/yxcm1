import React, { Component } from "react"
import util from "../../../utils/util"
import { Form, Input, Button, Upload, Icon, message, Modal } from "antd";
import UploadImg from "../../components/upload/UploadImg"
import http from "../../../utils/http"
import { withRouter } from "react-router-dom"
const FormItem = Form.Item;

let token = http.token;
const { TextArea } = Input;

const ActiveComForm = Form.create()(class ActiveCom extends Component {
	constructor(props) {
		super(props);
		let editActive = {};
		if(this.props.id) editActive = util.data("editActive");
		this.state = {
			name: editActive.name || "",
			video_url: editActive.video_url || "",
			intro: editActive.intro || "",
			fileList: editActive.imgs_url || [],
			token: token,
			previewVisible: false,
			previewImage: ""
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		 this.props.form.validateFields((err,values) => {
            if(!err) {
                const { video_url, fileList } = this.state;
                let imgs_url = [], params, relate_type;
                fileList.map(({response}) => {
                	imgs_url.push(`http://p94d2qxd7.bkt.clouddn.com/${response.key}`)
            	});
                params = Object.assign({},values,{
            		imgs_url,
            		video_url 	
            	});
            	
        		if(this.props.id) {
        			
        		}else {
        			http.post("back/activity/add/",params).then(() => {
            			this.props.history.push("/app/active/active")	
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
	handleChange = info => {
  		 if (info.file.status === 'done') {
      		message.success(`上传成功`);
      		this.setState({
      			video_url: `http://p94d2qxd7.bkt.clouddn.com/${info.file.response.key}`
  			})
    	} else if (info.file.status === 'error') {
      		message.error(`上传失败，请重新上传`);
    	}
	}
	removeVideo = () => {
		this.setState({
			video_url: ""
		})
	}
	handleImgChange = ({ fileList }) => {
		this.setState({ fileList })
	}
	handleCancel = () => this.setState({ previewVisible: false })
	handlePreview = (file) => {
	    this.setState({
	      	previewImage: file.url || file.thumbUrl,
	      	previewVisible: true,
	    })
  	}
    render() {
		const { name, video_url, intro, fileList, previewVisible, previewImage } = this.state;
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 6}
        };
        const formItemLayout2 = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        };
        const t = {
        	token: this.state.token
    	}
	 	const uploadButton = (
      		<div>
        		<Icon type="plus" />
        		<div className="ant-upload-text">Upload</div>
  			</div>
    	)
		return <Form
				onSubmit={this.handleSubmit}
			>
			<FormItem
				label="活动名称"
				{...formItemLayout}
			>
				{getFieldDecorator('name', {
                    rules: [{ required: true, message: '活动名称不能为空'}],
                initialValue: name})(
                    <Input />  
                )}
			</FormItem>
			<FormItem
				label="活动图片"
			>
				<Upload
                    action="//up-z2.qiniup.com"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleImgChange}
                    data={t}
                >
                {fileList.length >= 3 ? null : uploadButton}
                </Upload>
    			<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
      				<img alt="example" style={{ width: '100%' }} src={previewImage} />
    			</Modal>
			</FormItem>
			<FormItem
				label="活动视频"
				{...formItemLayout}
			>
				{getFieldDecorator('video_url', {
                initialValue: video_url})(
                	<div>
                		 <Upload 
                		 	action="//up-z2.qiniup.com"
          					onChange={this.handleChange}
          					onRemove={this.removeVideo}
          					data={t}
                		 >
    						<Button>
      							<Icon type="upload" />Upload
    						</Button>
  						</Upload>
                    	{ video_url ? <video width="320" height="240" src={video_url} controls autoPlay /> : "" }
                	</div>
                )}
			</FormItem>
			<FormItem
				label="活动介绍"
				{...formItemLayout}
			>
				{getFieldDecorator('intro', {
                initialValue: intro})(
                    <TextArea rows={4} /> 
                )}
			</FormItem>
			<FormItem 
				{...formItemLayout2}
			>
	          	<Button type="primary" htmlType="submit">提交</Button>
	        </FormItem>
		</Form>
	}
})
export default withRouter(ActiveComForm)