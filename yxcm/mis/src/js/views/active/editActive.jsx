import React, { Component } from "react"
import ActiveCom from "./activeCom"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom"
import { Card } from "antd"

export default class AddActive extends Component {
	render() {
		const id = this.props.computedMatch.params.id;
		return <div>
			<BreadcrumbCustom first="活动列表" second="编辑活动" firstLink="/app/active/active" />
			<Card >
				<ActiveCom id={id} />
			</Card>
		</div>
	}
}
