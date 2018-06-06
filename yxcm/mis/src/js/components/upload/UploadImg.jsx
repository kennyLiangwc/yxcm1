import React, { Component } from "react"
import { Upload, Button, Icon, message, Modal } from "antd"
import http from "../../../utils/http"

let token = http.token;

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    token: token,
    fileList: [{
		uid: -1,
      	url: this.props.src || ""
    }],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({fileList}) => {
  		this.setState({ fileList })
  		let url;
  		
  		if(fileList.length > 0 && fileList[0].response) {
  			url = `http://p94d2qxd7.bkt.clouddn.com/${fileList[0].response.key}`;
  		}else {
  			url = ""
  		}
  		this.props.uploadImg(url)
	}
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const t = {
        token: this.state.token
    }
    return (
      <div className="clearfix">
        <Upload
          action="//up-z2.qiniup.com"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          data={t}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}