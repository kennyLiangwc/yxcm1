import React, { Component } from "react"
import http from "../../../utils/http"
import { Table, Row, Card, Form, Input, Button, Modal, Checkbox, message, Popconfirm } from "antd";
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom.jsx";
import Sex from "../../common/enums/Sex.js"
import PlatformType from "../../common/enums/PlatformType"
import util from "../../../utils/util"
import { withRouter } from "react-router-dom"
import ClickShowImg from "../../components/clickShowImg/clickShowImg"

class AnchorList extends Component {
    state = {
        list: []
    }
    componentDidMount() {
		this.queryAnchorList()
	}
    queryAnchorList() {
        const { pageNumber, pageSize } = this.page;
        http.post("api/anchor/",{
            page: pageNumber,
			page_size: pageSize
		}).then(data => {
            this.setState({
                list: data.auctions
            })
            this.page.total = data.total
		})
	}
    page = {
        pageNumber: 1,
        pageSize: 10,
        total: 10
    }
    del = (item) => {
        http.post("back/anchor/update/",{
            auto_id: item.auto_id,
            is_delete: 1
        }).then(() => {
            message.success("删除成功");
            this.queryAnchorList()    
        })
    }
    editAnchor(item) {
        util.data("editAnchor",item);
        this.props.history.push(`/app/anchor/editAnchor/${item.auto_id}`)
    }
	render() {
        const { list } = this.state;
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
                title: "主播名称",
                dataIndex: "name"
            },
            {
                title: "主播昵称",
                dataIndex: "nickname"    
            },
            {
                title: "性别",
                dataIndex: "sex",
                render:(text,record) =>(
                    Sex.getLabel(record.sex)
                )
            },
            {
                title: "粉丝数",
                dataIndex: "fans_num"
            },
            {
                title: "关注数",
                dataIndex: "follow_num"
            },
            {
                title: "赞与收藏数",
                dataIndex: "like_collect_num"
            },
            {
                title: "主播封面图",
                dataIndex: "cover_url",
                render:(text,record) =>(
                    <ClickShowImg src={record.cover_url} />
                )
            },
            {
                title: "平台",
                dataIndex: "platform",
                render:(text,record) =>(
                    PlatformType.getLabel(record.platform)
                )
            },
            {
                title: "级别",
                dataIndex: "level"
            },
            {
                title: "操作",
                dataIndex: "auto_id",
                render:(text,record) =>(
                    <div>
                        <Button type="primary" style={{marginRight: "6px"}} onClick={() => this.editAnchor(record)}>编辑</Button>
                        <Popconfirm title="确定要删除吗?" onConfirm={() => this.del(record)}>
                            <a className="red">删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ]
		return <div>
            <BreadcrumbCustom first="网红列表"/>
            <Card>
                <Table pagination={pagination} dataSource={list} columns={columns} rowKey="id"/>
            </Card>
		</div>
	}
}

export default withRouter(AnchorList)