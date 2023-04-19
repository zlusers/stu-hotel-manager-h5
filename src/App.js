
import './App.css';
// import 'antd/dist/antd.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import { adminRoutes } from './routes'
import Frame from './components/Frame/Index';
import './App.css'
function App() {
  return (
    <Frame className="App">
      <Switch>
        {
          adminRoutes.map(route => {
            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                render={routeProps => {
                  return <route.component{...routeProps} />;
                }}
              />
            );
          })
        }
        {/* <Redirect to={adminRoutes[0].path} from="/admin"></Redirect> */}
        <Redirect to="/404"></Redirect>
      </Switch>
    </Frame> 
  );
}

export default App;
