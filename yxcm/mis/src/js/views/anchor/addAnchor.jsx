import React, { Component } from "react"
import { Form, Input, Select, Card } from "antd"
import BreadCrumb from "../../components/breadcrumb/BreadcrumbCustom"
import AnchorCom from "./anchorCom.jsx"

export default class AddAnchor extends Component {
	render() {
		return <div>
			<BreadCrumb first="新增网红"/>
			<Card>
				<AnchorCom />
			</Card>
		</div>
	}
}