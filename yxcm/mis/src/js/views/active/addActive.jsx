import React, { Component } from "react"
import ActiveCom from "./activeCom"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom"
import { Card } from "antd"

export default class AddActive extends Component {
	render() {
		return <div>
			<BreadcrumbCustom first="新增活动" />
			<Card >
				<ActiveCom />
			</Card>
		</div>
	}
}
