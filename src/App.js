import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,

} from "react-router-dom";
import LoginPage from "./LoginPage";
import Toggler from "./Toggler";
import Checkbox from './Checkbox';
import IncreaseWater from "./IncreaseWater";

function App() {
  return (
    <Router>
      <nav>
        <NavLink to="/toggleButton">Toggle Button</NavLink>
        <NavLink to="/Login" style={{ marginLeft: "10px" }}>
          Login Page
        </NavLink>
        <NavLink to="/Checkbox" style={{marginLeft:'10px'}}>Checkbox</NavLink>
        <NavLink to='/Addwater' style={{marginLeft:'10px'}}>Add water</NavLink>
      </nav>
        
      <Switch>
        <Route path="/toggleButton">
          <Toggler />
        </Route>
        <Route path="/Login">
          <LoginPage />
        </Route>
        <Route path='/Checkbox'>
          <Checkbox/>
        </Route>
        <Route path='/Addwater'>
          <IncreaseWater/>
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
