import React from 'react';
import { Layout, Menu} from 'antd';
import { connect } from 'react-redux';
import { adminRoutes } from '../../routes';
import { withRouter } from 'react-router-dom';
import "./fram.css"


const { Header, Content, Sider } = Layout;
const routes = adminRoutes.filter(route => route.isShow)

function Index(props) {



  return (
    <Layout>
      <Header className="header" style={{
        backgroundColor: '#FEFEFE'
      }}>
        <div className="logo">
           对账系统
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={[window.location.hash.split('#')[1]]}
            style={{ height: '100%', borderRight: 0,fontSize:"18px",fontWeight:"bold" }}
          >
            {
              routes.map(route => {
                return (
                  <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.titile}</Menu.Item>
                )
              })
            }
          </Menu>
        </Sider>
        <Layout style={{ padding: '16px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 10,
              margin: 0,
              height:'100%',
              backgroundColor: '#fff',
              overflow:'auto'

            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(withRouter(Index));