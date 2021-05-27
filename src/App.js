import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Home from './components/Home/Home';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Cookie from "js-cookie";
import Appointments from './components/Appointments/Appointments';

function App() {

  // let routes;

  // const token =  Cookie.get("token") ? Cookie.get("token") : null;
  // if(token){
  //   routes = (
  //     <Switch>
  //       <Route exact path="/" component={Home} />
  //       <Route path="*" component={() => "404 page not found"} />

  //     </Switch>
  //   );
  // } else {
  //   <Switch>
  //     <Route exact path="/login" component={Login} />
  //     <Route exact path="/signup" component={Signup} />
  //     <Route path="*" component={() => "You are noth Authenicated, Please login/Sigup"} />
  //   </Switch>
  // }


  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/appointments" component={Appointments} />
      <Route path="*" component={() => "404 page not found"} />
    </Switch>
  );
}

export default App;
