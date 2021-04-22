import "./App.css";
import Home from "./components/home";
import SignIn from "./components/signIn";
import Register from "./components/register"
import CreateContent from "./components/createContent"
import ButtonAppbar from "./components/appBar"

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ButtonAppbar />
      <Switch>
      <Route exact path="/">
          <Home />
          <CreateContent />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
