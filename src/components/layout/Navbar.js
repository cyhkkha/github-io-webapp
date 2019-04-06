import React from 'react';
import Menu from 'antd/lib/menu';
import Input from 'antd/lib/input';
import './Navbar.css';

export default class Navbar extends React.Component {
    state = {
        page: 'guitar',
    }

    handleClick = (e) => {
        this.setState({
            page: e.key,
        });
        console.log('menu change to ', e.key);
    };

    handleSearch = (value) => {
        console.log('search for ', value);
    }

    render() {
        const { page } = this.state;
        return (
            <header className="nav flex-between">
                <div className="ds-ib">
                    <a href="./#">
                        <h1 className="nav-title ds-ib">Feinimouse</h1>
                    </a>
                    <Input.Search
                        placeholder="搜索"
                        onSearch={this.handleSearch}
                        className="nav-search"
                    />
                </div>
                <nav className="ds-ib">
                    <Menu
                        onClick={this.handleClick}
                        mode="horizontal"
                        selectedKeys={[page]}
                    >
                        <Menu.Item key="guitar">吉他工具</Menu.Item>
                        <Menu.Item key="blog">博客</Menu.Item>
                        <Menu.Item key="coin">feinicoin</Menu.Item>
                    </Menu>
                </nav>
            </header>
        );
    }
}
