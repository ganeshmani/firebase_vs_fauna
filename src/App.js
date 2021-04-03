import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import ProjectDetail from './ProjectDetails'
import Home from './Home'

function App() {
  return (
   <Router>
      <Switch>
          <Route path="/project/:id">
            <ProjectDetail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
   </Router>
  );
}

export default App;
