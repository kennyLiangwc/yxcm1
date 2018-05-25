import React, { Component } from "react"
import { Upload, Button, Icon, message, Modal } from "antd"
import http from "../../../utils/http"

let token = http.token;



export default class Avatar extends Component {
    state = {
        loading: false,
        previewVisible: false,
        previewImage: "",
        token: token,
        imageUrl: ""
    }
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    remove = e => {
        this.setState({
            imageUrl: "",
            loading: false
        })
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.setState({
                imageUrl: `http://p94d2qxd7.bkt.clouddn.com/${info.file.response.hash}`
            })
        }
    }
    handleCancel = () => this.setState({ previewVisible: false })
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const t = {
            token: this.state.token
        }
        const { previewVisible, imageUrl } = this.state;
        return (
            <div>
                <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    action="//atest.yk.qq.com/file/upload_image"
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.remove}
                    // data={t}
                >
                    {imageUrl ? "" : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} style={{width: "200px"}}>
                     <img alt="example" style={{ width: '100%' }} src={imageUrl} />
                </Modal>
            </div>
        );
    }
}
