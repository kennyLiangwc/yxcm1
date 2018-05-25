import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const renderMenuItem =  (
	({id,text,path,contain,isMenu,...props}) => 
	isMenu ?<Menu.Item
			key={path || id}
			{...props}

		>
			<Link to={path}>{text}</Link>
		</Menu.Item> : ""
)

const renderSubMenu = (
	({text,icon,id,children,isMenu,...props}) => 
		<Menu.SubMenu 
			key={id}
			{...props}
			title={
				<span>
                    {icon && <Icon type={icon} />}
                    <span className="nav-text">{text}</span>
                </span>
			}
		>
		
		{ children.map(item =>renderMenuItem(item)) }
		</Menu.SubMenu>
)

export default ({menus,...props}) => <Menu {...props}>
	{
		menus.map(item => renderSubMenu(item))
	}
</Menu>