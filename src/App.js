import logo from './logo.svg';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import dashboard from './components/dashboard'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={dashboard}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
