import React, { Component } from "react"
import BreadCrumb from "../../components/breadcrumb/BreadcrumbCustom"
import { Card, Table, Button, Popconfirm } from "antd"
import { withRouter } from "react-router-dom"
import util from "../../../utils/util"
import http from "../../../utils/http"
import ClickShowImg from "../../components/clickShowImg/clickShowImg"
class Active extends Component {
	state = {
		list: []
	}
	 componentDidMount() {
		this.queryActive()
	}
    queryActive() {
        const { pageNumber, pageSize } = this.page;
        http.post("api/activity/",{
            page: pageNumber,
			page_size: pageSize
		}).then(data => {
            this.setState({
                list: data.activitys
            })
            this.page.total = data.total
		})
	}
    page = {
        pageNumber: 1,
        pageSize: 10,
        total: 10
    }
    editAcitve = item => {
    	util.data("editActive",item);
    	this.props.history.push(`/app/active/editActive/${item.auto_id}`)
    }
    del = item => {
    	
    }
	render() {
		const { list } = this.state;
        const pagination = {
            total: this.page.total,
            current: this.page.pageNumber,
            pageSize: this.page.pageSize,
            //showSizeChanger: true,
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
                title: "活动名称",
                dataIndex: "name"
            },
            {
            	title: "活动介绍",
            	dataIndex: "intro",
                render:(text,record) => (
                    <div style={{maxWidth: "500px", whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{record.intro}</div>
                )
            },
            {
        		title: "活动图片",
        		dataIndex: "imgs_url",
        		render:(text,{imgs}) => (
        			{
        				//imgs.map((item,index) => (
        					//imgs.map((item,index) => (
        						//<ClickShowImg src={item} key={index} />
							//))
    					//)
        			}
    			)
        	},
            {
            	title: "操作",
            	dataIndex: "id",
            	render:(text,record) => (
        			<div>
        				<Button onClick={() => this.editAcitve(record)}>编辑</Button>
        				<Popconfirm title="确定要删除吗?" onConfirm={() => this.del(record)}>
                            <a className="red">删除</a>
                        </Popconfirm>
        			</div>
    			)
            }
        ]
		return <div>
			<BreadCrumb first="活动列表"/>
			<Card>
				<Table pagination={pagination} dataSource={list} columns={columns} rowKey="id"/>
			</Card>
		</div>
	}
}

export default withRouter(Active)