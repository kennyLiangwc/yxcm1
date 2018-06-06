import React, { Component } from "react";
import util from "../../../utils/util"

export default class ClickShowImg extends Component {
	render() {
		let { src, style = {width: 50}, isImg = true, className="" } = this.props;
		style = Object.assign(style,{
			cursor: "pointer"
		})
        if (!isImg) {
            return <a href={src} target="blank">查看图片</a>
        }
		return <img src={src} style={style} className={className} onClick={this.onClick(src)}/>
	}
	onClick(src) {
		return function () {
            window.open(src)
        }
	}
}