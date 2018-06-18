import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
    <Menu.Item key="1">
      <Link to="/zeplin-test-task/notes">
        <Icon type="desktop" />
        Notes
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/zeplin-test-task/notes-create">
        <Icon type="file-add" />
        Create Note
      </Link>
    </Menu.Item>
  </Menu>
); 

export default Navigation;