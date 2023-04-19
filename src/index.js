import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { mainRoutes } from './routes';
import { Provider } from 'react-redux';
import store from './store';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>

        {/**
         * 以admin开头的路由都用APP组件来渲染页面
         */}
        <Route path="/admin" render={routeProps => <ConfigProvider locale={locale}>
          <App {...routeProps} />
        </ConfigProvider>}></Route>
        {/**
 * 循环配置路由
 */}
        {mainRoutes.map(route => {
          return <Route key={route.path} {...route} />;
        })}
        <Redirect to="/admin" from="/"></Redirect>
        <Redirect to="/404"></Redirect>
      </Switch>

    </Router>
  </Provider>
  ,
  document.getElementById('root')
);


reportWebVitals();



