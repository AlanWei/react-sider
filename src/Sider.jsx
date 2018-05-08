import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import 'antd/lib/menu/style';
import 'antd/lib/icon/style';
import getFlatMenuKeys from './utils/getFlatMenuKeys';
import getMeunMatchKeys from './utils/getMeunMatchKeys';
import urlToList from './utils/urlToList';

const { SubMenu } = Menu;

const propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  appName: PropTypes.string,
  appLogo: PropTypes.string,
  appBaseUrl: PropTypes.string,
  width: PropTypes.number,
  menuData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.array,
  })),
  pathname: PropTypes.string,
};

const defaultProps = {
  prefixCls: 'react-sider',
  className: '',
  style: {},
  appName: '',
  appLogo: '',
  appBaseUrl: '/',
  width: 256,
  menuData: [],
  pathname: '/',
};

const getOpenKeys = (pathname, flatMenuKeys) => (
  getMeunMatchKeys(flatMenuKeys, urlToList(pathname))
);

class Sider extends Component {
  constructor(props) {
    super(props);
    this.flatMenuKeys = getFlatMenuKeys(this.props.menuData);
  }

  state = {
    openKeys: getOpenKeys(this.props.pathname, this.flatMenuKeys),
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.pathname !== prevProps.pathname) {
      this.setState({
        openKeys: getOpenKeys(this.props.pathname, this.flatMenuKeys),
      });
    }
  }

  handleOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
  };

  renderMenu = data => (
    map(data, (item) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path} href={item.path}>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    })
  )

  renderSiderHeader = () => (
    <Link to={this.props.appBaseUrl} href={this.props.appBaseUrl}>
      <div className={`${this.props.prefixCls}-header`}>
        <img
          className={`${this.props.prefixCls}-logo`}
          src={this.props.appLogo}
          alt="logo"
        />
        <div className={`${this.props.prefixCls}-appName`}>
          {this.props.appName}
        </div>
      </div>
    </Link>
  )

  renderSiderBody = () => (
    <Menu
      style={{ padding: '16px 0', width: '100%' }}
      mode="inline"
      theme="dark"
      openKeys={this.state.openKeys}
      selectedKeys={this.state.openKeys}
      onOpenChange={this.handleOpenChange}
    >
      {this.renderMenu(this.props.menuData)}
    </Menu>
  )

  render() {
    const {
      prefixCls,
      className,
      style,
      width,
    } = this.props;
    const classes = `${prefixCls} ${className}`;
    const styles = {
      ...style,
      width,
    };

    return (
      <div className={classes} style={styles}>
        {this.renderSiderHeader()}
        <div className={`${prefixCls}-body`}>
          {this.renderSiderBody()}
        </div>
      </div>
    );
  }
}

Sider.propTypes = propTypes;
Sider.defaultProps = defaultProps;
export default Sider;
