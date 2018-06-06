import React, { Component } from "react"
import BreadcrumbCustom from "../../components/breadcrumb/BreadcrumbCustom.jsx";
import util from "../../../utils/util"
import {  Card,  Modal, message, Popconfirm } from "antd";
import UploadImg from "../../components/upload/UploadImg"
import AnchorCom from "./anchorCom.jsx"

export default class EditAnchor extends Component {
	render() {
		const id = this.props.computedMatch.params.id;
		return <div>
			<BreadcrumbCustom first="网红列表" second="编辑网红" firstLink="/app/anchor/anchorList"/>
			<Card>
				<AnchorCom id={id}/>
			</Card>
		</div>
	}
}